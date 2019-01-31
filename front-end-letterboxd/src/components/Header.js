import React, { Component } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Me from './Me';
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
        display: inline-block;
        border: 0;
        color: inherit;
        &:hover {
            color: ${props => props.theme.white};
        }
    }
`;

class Header extends Component {
    render() {
        return (
            <Me>
                {({ data, loading, error }) => {
                    if (loading) return <p>Loading</p>;
                    if (error) return <Error error={error} />;
                    const { me } = data;
                    return (
                        <StyledHeader>
                            <Link to="/">
                                <img src={Logo} alt="Letterboxd Clone" />
                            </Link>
                            <StyledLinks>
                                {me && (
                                    <li>
                                        <Link to="/feed">Feed</Link>
                                    </li>
                                )}
                                <li>
                                    <Link to="/movies">Movies</Link>
                                </li>
                                <li>
                                    <Link to="/movies">Movies</Link>
                                </li>
                                <li>
                                    <Link to="/users">People</Link>
                                </li>
                                {me && (
                                    <li>
                                        {' '}
                                        <Signout />
                                    </li>
                                )}
                                {!me && <Link to="/">Login/Register</Link>}
                            </StyledLinks>
                        </StyledHeader>
                    );
                }}
            </Me>
        );
    }
}

export default Header;
