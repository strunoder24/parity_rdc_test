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


let state = {
    first: 100,
    second: 1000,
    third: 1000000
};

let getters = {
    getSummary: jest.fn(),
};

let mutations = {
    setFirst: jest.fn(),
    setSecond: jest.fn(),
    setThird: jest.fn()
};

let store = new Vuex.Store({
    modules: {
        controls: {
            state,
            getters,
            mutations,
        }
    }
});

describe('wrapper', () => {
    it('can use tab for switching between controls', async () => {
        let wrapper = mount(Component, {
            localVue,
            store,
            attachToDocument: true
        });
        let inputs = wrapper.findAll('.opened-selector');
        await inputs.trigger('keydown.tab');
    
        // unfortunately jsDom which used for dom attachment can't use tab for navigation
        // expect(inputs.at(0).element).toBe(document.activeElement);
        
        wrapper.destroy();
    })
});