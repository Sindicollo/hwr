import React, { Component } from 'react';
import ajax from 'superagent';
import { IndexLink, Link } from 'react-router';

const SELECTEDVIEW = {
    COMMITS: 'commits',
    FORKS: 'forks',
    PULLS: 'pulls',
};

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.selectModeCommits = this.selectMode.bind(this, SELECTEDVIEW.COMMITS);
        this.selectModeForks = this.selectMode.bind(this, SELECTEDVIEW.FORKS);
        this.selectModePulls = this.selectMode.bind(this, SELECTEDVIEW.PULLS);

        this.state = { commits: [],
            forks: [],
            pulls: [],
            selectedView: SELECTEDVIEW.COMMITS,
        };
    }

    componentWillMount() {
        this.fetchFeed('commits');
        this.fetchFeed('forks');
        this.fetchFeed('pulls');
    }

    selectMode(view) {
        this.setState({ selectedView: view });
    }

    saveFeed(type, contents) {
        this.setState({ [type]: contents });
    }

    fetchFeed(type) {
        if (this.props.params.repo === '') {
            // empty repo name, bail out!
            return;
        }
        const baseURL = 'https://api.github.com/repos/facebook';
        ajax.get(`${baseURL}/${this.props.params.repo}/${type}`)
            .end((error, response) => {
                if (!error && response) {
                    this.saveFeed(type, response.body);
                } else {
                    console.log(`Error fetching ${type}`, error);
                }
            },
        );
    }



    renderCommits() {
        return this.state.commits.map((commit, index) => {
            const author = commit.author ? commit.author.login : 'Anonymous';

            return (<p key={index} className="github">
              <Link to={`/user/${author}`}>{author}</Link>:
              <a href={commit.html_url}>{commit.commit.message}</a>.
            </p>);
        });
    }

    renderForks() {
        return this.state.forks.map((fork, index) => {
            const owner = fork.owner ? fork.owner.login : 'Anonymous';

            return (<p key={index} className="github">
              <Link to={`/user/${owner}`}>{owner}</Link>: forked to
              <a href={fork.html_url}>{fork.html_url}</a> at {fork.created_at}.
            </p>);
        });
    }

    renderPulls() {
        return this.state.pulls.map((pull, index) => {
            const user = pull.user ? pull.user.login : 'Anonymous';

            return (<p key={index} className="github">
              <Link to={`/user/${user}`}>{user}</Link>:
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
          <p>You are here: <IndexLink to="/" activeClassName="active">Home</IndexLink> > {this.props.params.repo}</p>
          <button onClick={this.selectModeCommits} ref="commits">
             Show Commits
          </button>

          <button onClick={this.selectModeForks} ref="forks">
             Show Forks
          </button>

          <button onClick={this.selectModePulls} ref="pulls">
             Show Pulls
          </button>
          { content }
        </div>
        );
    }
}

export default Detail;
