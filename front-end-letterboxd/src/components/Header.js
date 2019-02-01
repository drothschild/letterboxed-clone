import React from 'react';
import { Link } from '@reach/router';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './Me';
import Signout from './Signout';
import Logo from './imgs/logo.png';
import Error from './Error';

const StyledHeader = styled.header`
    display: flex;
    padding: 0 3rem 0 0;
    justify-content: space-between;
    img {
        width: 275px;
        height: 100%;
    }
`;
const StyledLinks = styled.ul`
    display: flex;
    list-style: none;
    justify-content: space-evenly;
    margin: 0;

    a,
    button {
        font-size: 2rem;
        padding: 0 2rem 0 0;
        background: inherit;
        line-height: 40px;
        display: inline-block;
        border: 0;
        color: inherit;
        &:hover {
            color: ${props => props.theme.white};
        }
    }
`;

function Header() {
    const { data, error } = useQuery(CURRENT_USER_QUERY);
    if (error) return <Error error={error} />;
    return (
        <StyledHeader>
            <Link to="/">
                <img src={Logo} alt="Letterboxd Clone" />
            </Link>
            <StyledLinks>
                {data.me && (
                    <li>
                        <Link to="/feed">Feed</Link>
                    </li>
                )}
                <li>
                    <Link to="/movies">Movies</Link>
                </li>
                <li>
                    <Link to="/users">People</Link>
                </li>
                {data.me && (
                    <li>
                        <Signout />
                    </li>
                )}
                {!data.me && <Link to="/auth">Login/Register</Link>}
            </StyledLinks>
        </StyledHeader>
    );
}

export default Header;
