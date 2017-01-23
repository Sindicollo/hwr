import React, { Component } from 'react';
import Chance from 'chance';
import ajax from 'superagent';

const SELECTEDVIEW = {
        COMMITS: 0,
        FORKS: 1,
        PULLS: 2,
}

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = { commits: [],
                       forks: [],
                       pulls: [],
                       selectedView: SELECTEDVIEW.COMMITS
                     };
    }

    selectView(view) {
        const newState = {
            selectedView: view
        };
        console.log("Select: " + view);
        this.setState(newState);
    }

    componentWillMount() {
        ajax.get('https://api.github.com/repos/facebook/react/commits')
            .end((error, response) => {
                if (!error && response) {
                    console.dir(response.body);
                    this.setState({ commits: response.body });
                } else {
                    console.log('There was an error fetching Commits from GitHub', error);
                }
            }
        );

        ajax.get('https://api.github.com/repos/facebook/react/forks')
            .end((error, response) => {
                if (!error && response) {
                    console.dir(response.body);
                    this.setState({ forks: response.body });
                } else {
                    console.log('There was an error fetching Forks from GitHub', error);
                }
            }
        );

        ajax.get('https://api.github.com/repos/facebook/react/pulls')
            .end((error, response) => {
                if (!error && response) {
                    console.dir(response.body);
                    this.setState({ pulls: response.body });
                } else {
                    console.log('There was an error fetching Pulls from GitHub', error);
                }
            }
        );
    }

    renderCommits() {
        return this.state.commits.map((commit, index) => {
            const author = commit.author ? commit.author.login : 'Anonymous';

            return (<p key={index}>
                <strong>{author}</strong>:
                <a href={commit.html_url}>{commit.commit.message}</a>.
            </p>);
        });
    }

    renderForks() {
        return this.state.forks.map((fork, index) => {
            const owner = fork.owner ? fork.owner.login : 'Anonymous';

            return (<p key={index}>
                <strong>{owner}</strong>: forked to
                <a href={fork.html_url}>{fork.html_url}</a> at {fork.created_at}.
            </p>);
        });
    }

    renderPulls() {
        return this.state.pulls.map((pull, index) => {
            const user = pull.user ? pull.user.login : 'Anonymous';

            return (<p key={index}>
                <strong>{user}</strong>:
                <a href={pull.html_url}>{pull.body}</a>.
            </p>);
        });
    }

    render() {
        let content;

        if (this.state.selectedView === SELECTEDVIEW.COMMITS) {
            content = this.renderCommits();
        } else if (this.state.selectedView === SELECTEDVIEW.FORKS) {
            content = this.renderForks();
        } else {
            content = this.renderPulls();
        }
        return (<div>
            <button onClick={this.selectView.bind(this, SELECTEDVIEW.COMMITS)}>Commits</button>
            <button onClick={this.selectView.bind(this, SELECTEDVIEW.FORKS)}>Forks</button>
            <button onClick={this.selectView.bind(this, SELECTEDVIEW.PULLS)}>Pulls</button>
            { content }
        </div>);
    }
}

export default Detail;