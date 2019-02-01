import React from 'react';
import { useQuery } from 'react-apollo-hooks';
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

function Users() {
    const { data, error } = useQuery(All_USERS_QUERY);
    if (error) return <Error error={error} />;
    return (
        <Center>
            <UsersList>
                {data.users.map(user => (
                    <User key={user.id} user={user} />
                ))}
            </UsersList>
        </Center>
    );
}

export default Users;
