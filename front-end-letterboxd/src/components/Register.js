import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Error from './Error';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './Me';
import { MY_FEED_QUERY } from './Feed';

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

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const register = useMutation(REGISTER_MUTATION, {
        variables: { name, email, password },
        refetchQueries: [
            { query: CURRENT_USER_QUERY },
            { query: MY_FEED_QUERY }
        ]
    });
    return (
        <Form
            method="post"
            onSubmit={async e => {
                e.preventDefault();
                setError(null);
                setLoading(true);
                try {
                    await register();
                    setName('');
                    setEmail('');
                } catch (error) {
                    setError(error);

                }
                setLoading(false);
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
                        value={name}
                        onChange={e => {
                            setName(e.target.value);
                        }}
                    />
                </label>
                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    />
                </label>

                <button type="submit">Register</button>
            </fieldset>
        </Form>
    );
}

export default Register;
