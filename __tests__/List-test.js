import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

jest.autoMockOff();
const List = require('../src/pages/List').default;

describe('List', () => {
    it('renders three repo links', () => {
        const rendered = TestUtils.renderIntoDocument(<List />);

        const repos = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'li');

        expect(repos.length).toEqual(3);
    });
});
