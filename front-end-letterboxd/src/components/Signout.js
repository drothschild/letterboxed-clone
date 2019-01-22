import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY } from './Me';
const SIGN_OUT_MUTATION = gql`
    mutation SIGN_OUT_MUTATION {
        logout {
            message
        }
    }
`;
const Signout = props => (
    <Mutation
        mutation={SIGN_OUT_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
        {logout => <button onClick={logout}>Log Out</button>}
    </Mutation>
);

export default Signout;
