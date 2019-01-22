import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Error from './Error';
import User from './User';

const All_USERS_QUERY = gql`
    query ALL_USRS_QUERY {
        users(orderBy: name_ASC) {
            id
            name
            image
        }
    }
`;

const Center = styled.div`
    text-align: center;
`;

const UsersList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 170px);
    grid-gap: 30px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
`;

const Users = () => (
    <Center>
        <Query query={All_USERS_QUERY}>
            {({ data, error, loading }) => {
                if (loading) return <p>Loading..</p>;
                if (error) return <Error error={error} />;
                return (
                    <UsersList>
                        {data.users.map(user => (
                            <User key={user.id} user={user} />
                        ))}
                    </UsersList>
                );
            }}
        </Query>
    </Center>
);

export default Users;
