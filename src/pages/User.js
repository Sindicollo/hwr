import React, { Component } from 'react';
import ajax from 'superagent';
import { IndexLink, Link } from 'react-router';

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        };
    }

    componentWillMount() {
        this.fetchFeed();
    }

    fetchFeed() {
        const baseURL = 'https://api.github.com/users';
        ajax.get(`${baseURL}/${this.props.params.user}/events`)
            .end((error, response) => {
                if (!error && response) {
                    this.setState({ events: response.body });
                } else {
                    console.log(`Error fetching user ${this.props.params.user} events`, error);
                }
            },
        );
    }

    renderUserEvents() {
        return this.state.events.map((event, index) => {
            const eventType = event.type;
            const repoName = event.repo.name;
            const creationDate = event.created_at;
            const author = event.actor ? event.actor.login : 'Anonymous';

            return (
              <li key={index}>
                <strong>{author}</strong>,
                <a href={event.repo.url}><strong>{repoName}</strong></a>: {eventType}
                at {creationDate}.
            </li>);
        });
    }

    render() {
        const content = this.renderUserEvents();

        return (<div>
          <p>You are here:
          <IndexLink to="/" activeClassName="active">Home</IndexLink>
          &gt; {this.props.params.user}
          </p>
          <h2>Events for user {this.props.params.user}:</h2>
          <ul>
            { content }
          </ul>
        </div>
        );
    }
}

export default User;
