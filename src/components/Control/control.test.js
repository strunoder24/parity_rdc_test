import { mount } from "@vue/test-utils";

import Component from './index'

describe('Control components testing', () => {
    it('can be rendered', () => {
        let control = mount(Component, {
            propsData: {
                title: 'заголовок',
                helperFunction: 'summaryHelper',
                helperFunctionName: 'Сумма',
                type: 'first'
            }
        })
    });
});