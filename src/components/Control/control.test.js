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

const state = {
    controls: {
        first: 100,
        second: 1000,
        third: 1000000
    }
};

describe('Control components testing', () => {
    
    // Wrappers
    let createFirstWrapper = () => {
        return mount(Component, {
            propsData: {
                title: 'Первый контрол',
                helperFunction: 'summaryHelper',
                helperFunctionName: 'Сумма',
                type: 'first'
            },
            mocks: {
                $store: {
                    state
                }
            },
            localVue
        });
    };
    let createSecondWrapper = () => {
        return mount(Component, {
            propsData: {
                title: 'Второй контрол',
                helperFunction: 'constantHelper',
                helperFunctionName: 'Константа',
                type: 'second'
            },
            mocks: {
                $store: {
                    state
                }
            },
            localVue
        });
    };
    let createThirdWrapper = () => {
        return mount(Component, {
            propsData: {
                title: 'Третий контрол',
                type: 'third'
            },
            mocks: {
                $store: {
                    state
                }
            },
            localVue
        });
    };
    
    
    // Selectors
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
        let wrapper = createSecondWrapper();
    
        it('successfully render control with title', () => {
            expect(wrapper.html()).toContain('Второй контрол');
        });
        
        it('default value is correct', () => {
            expect(wrapper.vm.vuexValue).toBe(1000);
        });
        
        it('divided by thousands', () => {
            expect(getClosedDigit(wrapper).text()).toBe('1 000')
        });
        
        it('closed by default', () => {
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
            
        })
    })
});