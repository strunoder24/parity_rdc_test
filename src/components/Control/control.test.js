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
    describe('default state testing', () => {
        let wrapper = mount(Component, {
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
    
        it('successfully render control with title', () => {
            expect(wrapper.html()).toContain('Второй контрол');
        });
        
        
        it('default value is correct', () => {
            expect(wrapper.vm.vuexValue).toBe(1000);
        });
        
        it('divided by thousands', () => {
            expect(wrapper.find('.closed-digit').text()).toBe('1 000')
        });
        
        it('closed by default', () => {
            expect(wrapper.find('.closed-digit').isVisible()).toBe(true);
            expect(wrapper.find('.selector-controls').isVisible()).toBe(false);
        });
    
        // input always should exist for being able to use tab to navigate
        it('input is always active', async () => {
            expect(wrapper.find('.opened-selector').exists()).toBe(true);
        
            // activate selector
            await wrapper.find('.selector-container').trigger('click');
        
            expect(wrapper.find('.opened-selector').exists()).toBe(true);
        });
    
        it('has correct helper function name', () => {
            expect(wrapper.html()).toContain('Константа');
        });
    });
});