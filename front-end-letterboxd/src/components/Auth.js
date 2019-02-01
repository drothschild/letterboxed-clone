import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { CURRENT_USER_QUERY } from './Me';
import Error from './Error';
import styled from 'styled-components';
import Login from './Login';
import Register from './Register';
import Main from './Main';

const Columns = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 20px;
`;

function Auth(props) {
    const {data, error} = useQuery(CURRENT_USER_QUERY)
    if (error) return <Error error={error} />;
    if (!data.me) {
        return (
            <Columns>
                <Register />
                <Login />
            </Columns>
        );
    }
    if (!props.children) {
        return <Main />
    }

    return  props.children;
}

export default Auth;
