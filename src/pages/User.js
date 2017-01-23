import React, { Component } from 'react';
import ajax from 'superagent';

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        };
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
            }
        );
    }

    componentWillMount() {
        this.fetchFeed();
    }

    renderUserEvents() {
        return this.state.events.map((event, index) => {
            const eventType = event.type;
            const repoName = event.repo.name;
            const creationDate = event.created_at;
            const author = event.actor ? event.actor.login : 'Anonymous';

            return (
            <li key={index}>
                <strong>{author}</strong>, <a href={event.repo.url}><strong>{repoName}</strong></a>: {eventType}
                at {creationDate}.
            </li>);
        });
    }

    render() {
        let content = this.renderUserEvents();

        return (<div>
                <h2>Events for user {this.props.params.user}:</h2>
                <ul>
                { content }
                </ul>
            </div>
        );
    }
}

export default User;