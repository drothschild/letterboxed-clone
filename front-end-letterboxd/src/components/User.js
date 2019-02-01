import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { AvatarImg } from './styles/ImageStyles';
import Profile from './imgs/profile.jpg';

const UserStyles = styled.div`
    display: flex;
    flex-direction: column;
    &:hover {
        p {
            color: ${props => props.theme.green};
        }
    }
    p {
        color: ${props => props.theme.white};
        font-size: 1.5rem;
    }
`;

function User({ user }) {
    return (
        <UserStyles>
            <Link to={user.id}>
                <AvatarImg src={user.image || Profile} alt={user.name} />
                <p>{user.name}</p>
            </Link>
        </UserStyles>
    );
}

export default User;
