import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

import styled from 'styled-components';
import Error from './Error';
import { AvatarImg } from './styles/ImageStyles';
import Profile from './imgs/profile.jpg';
import UserReviewList from './UserReviewList';
import FollowButton from './FollowButton';

const USER_DETAILS_QUERY = gql`
    query USER_DETAILS_QUERY($id: ID!) {
        user(where: { id: $id }) {
            id
            name
            email
            image
            # TODO: Solve bug: it balks at OrderBy
            reviews {
                id
                contents
                rating
                movie {
                    id
                    image
                    title
                }
            }
            following {
                id
                name
                email
            }
        }
    }
`;

const UserDetailsStyles = styled.div`
    max-width: ${props => props.theme.maxwidth};
`;

function UserDetails({ userId }) {
    const { data, error } = useQuery(USER_DETAILS_QUERY, {
        variables: { id: userId }
    });
    if (error) return <Error error={error} />;
    if (!data.user) return <p>No User Found for {userId}</p>;
    const user = data.user;
    const avatar = user.image || Profile;
    return (
        <UserDetailsStyles>
            <AvatarImg src={avatar} alt={user.name} />
            <h1>{user.name}</h1>
            <FollowButton userId={user.id} />
            <UserReviewList reviews={user.reviews} />
        </UserDetailsStyles>
    );
}

export default UserDetails;
