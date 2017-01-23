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
        return (<div>
            {
                this.state.commits.map((commit, index) => {
                    const author = commit.author ? commit.author.login : 'Anonymous';

                    return (<p key={index}>
                        <strong>{author}</strong>:
                        <a href={commit.html_url}>{commit.commit.message}</a>.
                    </p>);
                })
            }
        </div>);
    }

    renderForks() {
        return (<div>
            {
                this.state.forks.map((fork, index) => {
                    return (<p key={index}>
                        <strong>owner.login</strong>:
                        <a href={fork.owner.login}>{fork.owner.login}</a>.
                    </p>);
                })
            }
        </div>);
    }

    renderPulls() {
        return (<div>
            {
                this.state.pulls.map((pull, index) => {
                     return (<p key={index}>
                        <strong>url</strong>:
                        <a href={pull.url}>{pull.url}</a>.
                    </p>);
                })
            }
        </div>);
    }

    render() {
        return (<div>
            <button onClick={this.selectView.bind(this, SELECTEDVIEW.COMMITS)}>Commits</button>
            <button onClick={this.selectView.bind(this, SELECTEDVIEW.FORKS)}>Forks</button>
            <button onClick={this.selectView.bind(this, SELECTEDVIEW.PULLS)}>Pulls</button>
            {
                this.state.selectedView === SELECTEDVIEW.COMMITS ? 
                this.renderCommits() :
                (this.state.selectedView === SELECTEDVIEW.FORKS ? 
                 this.renderForks() : 
                 this.renderPulls())
            }
        </div>);
    }
}

export default Detail;