import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import Error from './Error';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './Me';
import { MY_FEED_QUERY } from './Feed';

const LOGIN_MUTATION = gql`
    mutation LOGIN_MUTATION($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            email
            name
        }
    }
`;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const login = useMutation(LOGIN_MUTATION, {
        variables: { email, password },
        refetchQueries: [
            { query: CURRENT_USER_QUERY },
            { query: MY_FEED_QUERY }
        ]
    });
    const submitLogin = async e => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login();
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };
    return (
        <Form
            method="post"
            onSubmit={submitLogin}
            disabled={loading}
            aria-busy={loading}
        >
            <fieldset>
                <h2>Sign in</h2>
                <Error error={error} />
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

                <button type="submit">Log In</button>
            </fieldset>
        </Form>
    );
}

export default Login;
