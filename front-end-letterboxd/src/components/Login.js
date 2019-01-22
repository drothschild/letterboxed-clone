import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './Error';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './Me';

const LOGIN_MUTATION = gql`
    mutation LOGIN_MUTATION($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            email
            name
        }
    }
`;

export default class Login extends Component {
    state = {
        password: '',
        email: ''
    };
    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleSubmit = async (e, submitFunction) => {
        e.preventDefault();
        await submitFunction();
        this.setState({ email: '', password: '' });
    };
    render() {
        return (
            <Mutation
                mutation={LOGIN_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(login, { error, loading }, data) => (
                    <Form
                        method="post"
                        onSubmit={async e => {
                            e.preventDefault();
                            await login();
                            this.setState({
                                email: '',
                                password: ''
                            });
                        }}
                    >
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Sign in</h2>
                            <Error error={error} />
                            <label htmlFor="email">
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    value={this.state.email}
                                    onChange={this.saveToState}
                                />
                            </label>
                            <label htmlFor="password">
                                Password
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    value={this.state.password}
                                    onChange={this.saveToState}
                                />
                            </label>

                            <button type="submit">Log In</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}
