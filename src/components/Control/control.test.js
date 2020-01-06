import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleUp, faAngleDown, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Component from './index';

const localVue = createLocalVue();
localVue.use(Vuex);

library.add(faAngleUp, faAngleDown, faCaretDown, faCaretUp);
localVue.component('font-awesome-icon', FontAwesomeIcon);

let store = new Vuex.Store({
    modules: {
        controls: {
            state: {
                first: 100,
                second: 1000,
                third: 1000000
            },
            getters: {
                getSummary: jest.fn()
            },
            mutations: {
                setFirst: jest.fn(),
                setSecond: jest.fn(),
                setThird: jest.fn()
            }
        }
    }
});

describe('Control components testing', () => {
    // Wrappers
    let createFirstWrapper = (options) => {
        return mount(Component, {
            propsData: {
                title: 'Первый контрол',
                helperFunction: 'summaryHelper',
                helperFunctionName: 'Сумма',
                type: 'first'
            },
            store,
            localVue,
            ...options
        });
    };
    let createSecondWrapper = (options) => {
        return mount(Component, {
            propsData: {
                title: 'Второй контрол',
                helperFunction: 'constantHelper',
                helperFunctionName: 'Константа',
                type: 'second'
            },
            store,
            localVue,
            options
        });
    };
    let createThirdWrapper = (options) => {
        return mount(Component, {
            propsData: {
                title: 'Третий контрол',
                type: 'third'
            },
            store,
            localVue,
            options
        });
    };
    
    
    // Selectors
    let getMainContainer = (wrapper) => {
        return wrapper.find('.control-container');
    };
    let getSelectorContainer = (wrapper) => {
        return wrapper.find('.selector-container');
    };
    let getInput = (wrapper) => {
        return wrapper.find('.opened-selector');
    };
    let getArrowsContainer = (wrapper) => {
        return wrapper.find('.selector-controls');
    };
    let getUpButton = (wrapper) => {
        return wrapper.find('.up');
    };
    let getDownButton = (wrapper) => {
        return wrapper.find('.down');
    };
    let getHelperButton = (wrapper) => {
        return wrapper.find('.helper-function');
    };
    let getClosedDigit = (wrapper) => {
        return wrapper.find('.closed-digit');
    };
    
    describe('default state testing', () => {
        it('successfully render control with title', () => {
            let wrapper = createSecondWrapper();
            expect(wrapper.html()).toContain('Второй контрол');
        });
        
        it('default value is correct', () => {
            let wrapper = createSecondWrapper();
            expect(wrapper.vm.vuexValue).toBe(1000);
        });
        
        it('divided by thousands', () => {
            let wrapper = createSecondWrapper();
            expect(getClosedDigit(wrapper).text()).toBe('1 000');
        });
        
        it('closed by default', () => {
            let wrapper = createSecondWrapper();
            expect(getClosedDigit(wrapper).isVisible()).toBe(true);
            expect(getArrowsContainer(wrapper).isVisible()).toBe(false);
        });
    
        // input always should exist for being able to use tab to navigate
        it('input is always active', async () => {
            let wrapper = createSecondWrapper();
            
            expect(getInput(wrapper).exists()).toBe(true);
        
            // activate selector
            await getSelectorContainer(wrapper).trigger('click');
            
            expect(getInput(wrapper).exists()).toBe(true);
        });
    
        it('has correct helper function name', async () => {
            let wrapper = createSecondWrapper();
            
            // activate selector
            await wrapper.find('.selector-container').trigger('click');
            
            expect(wrapper.html()).toContain('Константа');
        });
    });
    describe('mouse interactions testing', () => {
        it('opens on mouse click', async () => {
            let wrapper = createFirstWrapper({
                attachToDocument: true
            });
            
            await getSelectorContainer(wrapper).trigger('click');
            expect(getArrowsContainer(wrapper).isVisible()).toBe(true);
            expect(getClosedDigit(wrapper).isVisible()).toBe(false);
            wrapper.destroy();
        });
        
        it('close on click away', async () => {
            let wrapper = createFirstWrapper({
                attachToDocument: true
            });
    
            await getSelectorContainer(wrapper).trigger('click');
            await getMainContainer(wrapper).trigger('click');
    
            expect(getArrowsContainer(wrapper).isVisible()).toBe(false);
            expect(getClosedDigit(wrapper).isVisible()).toBe(true);
            wrapper.destroy();
        })
    })
});