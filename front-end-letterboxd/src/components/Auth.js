import React from 'react';
import { Query } from 'react-apollo';
import { CURRENT_USER_QUERY } from './Me';
import Error from './Error';
import styled from 'styled-components';
import Login from './Login';
import Register from './Register';

const Columns = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
`;

const Auth = props => (
    <Query query={CURRENT_USER_QUERY}>
        {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <Error error={error} />;
            if (!data.me) {
                return (
                    <Columns>
                        <Register />
                        <Login />
                    </Columns>
                );
            }
            return props.children;
        }}
    </Query>
);

export default Auth;
