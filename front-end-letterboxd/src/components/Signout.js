import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import { CURRENT_USER_QUERY } from './Me';
import { MY_FEED_QUERY } from './Feed';
const SIGN_OUT_MUTATION = gql`
    mutation SIGN_OUT_MUTATION {
        logout {
            message
        }
    }
`;
function Signout() {
    const signout = useMutation(SIGN_OUT_MUTATION, {
        refetchQueries: [
            { query: CURRENT_USER_QUERY },
            { query: MY_FEED_QUERY }
        ]
    });
    return <button onClick={signout}>Log Out</button>;
}

export default Signout;
