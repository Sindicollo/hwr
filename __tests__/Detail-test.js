import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

jest.autoMockOff();
const Detail = require('../src/pages/Detail').default;

describe('Detail', () => {
    it('starts with zero commits', () => {
        const rendered = TestUtils.renderIntoDocument(
          <Detail params={{ repo: '' }} />,
        );

        expect(rendered.state.commits.length).toEqual(0);
    });

    it('shows commits by default', () => {
        const rendered = TestUtils.renderIntoDocument(
          <Detail params={{ repo: '' }} />,
        );

        expect(rendered.state.selectedView).toEqual('commits');
    });

    it('shows forks when the button is tapped', () => {
        const rendered = TestUtils.renderIntoDocument(
          <Detail params={{ repo: '' }} />,
        );

        const forksButton = rendered.refs.forks;
        TestUtils.Simulate.click(forksButton);
        expect(rendered.state.selectedView).toEqual('forks');
    });

    it('shows pulls when the button is tapped', () => {
        const rendered = TestUtils.renderIntoDocument(
          <Detail params={{ repo: '' }} />,
        );

        const pullsButton = rendered.refs.pulls;
        TestUtils.Simulate.click(pullsButton);
        expect(rendered.state.selectedView).toEqual('pulls');
    });

    it('fetches forks from a local source', () => {
        const rendered = TestUtils.renderIntoDocument(
          <Detail params={{ repo: '' }} />,
        );

        const testData = require('./forks.json');
        rendered.saveFeed('forks', testData);
        rendered.selectMode('forks');
        const forks = TestUtils.scryRenderedDOMComponentsWithClass(rendered, 'github');

        expect(forks.length).toEqual(30);
    });
});
