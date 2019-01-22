import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './Error';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './Me';

const REGISTER_MUTATION = gql`
    mutation REGISTER_MUTATION(
        $email: String!
        $password: String!
        $name: String!
    ) {
        signup(email: $email, password: $password, name: $name) {
            id
            email
            name
        }
    }
`;

class Register extends Component {
    state = {
        password: '',
        email: '',
        name: ''
    };
    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    render() {
        return (
            <Mutation
                mutation={REGISTER_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(register, { error, loading }) => (
                    <Form
                        method="post"
                        onSubmit={async e => {
                            e.preventDefault();
                            await register();
                            this.setState({
                                email: '',
                                password: '',
                                name: ''
                            });
                        }}
                    >
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Register</h2>
                            <Error error={error} />
                            <label htmlFor="name">
                                Name
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="name"
                                    value={this.state.name}
                                    onChange={this.saveToState}
                                />
                            </label>
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

                            <button type="submit">Register</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export default Register;
