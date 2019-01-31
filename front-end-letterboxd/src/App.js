import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

import ApolloClient from 'apollo-boost';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import background from './components/imgs/background.png';
import Router from './Router';
import Header from './components/Header';

const client = new ApolloClient({
    uri: process.env.REACT_APP_END_POINT,
    request: operation => {
        operation.setContext({
            fetchOptions: {
                credentials: 'include'
            }
        });
    }
});

const theme = {
    black: '#14181c',
    green: '#00a11d',
    blue: '#40bcf4',
    grey: '#3A3A3A',
    lightgrey: '#9ab',
    white: '#fff',
    offWhite: '#EDEDED',
    maxWidth: '1200px',
    bs: '0 2px 10px rgba(0, 0, 0, 0.25)',
    bsInset: 'inset 0 -1px 0 #456'
};

const GlobalStyle = createGlobalStyle`
html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    border: 0;
    outline: 0;
    color: ${props => props.theme.lightgrey};
    font-family: Arial, Helvetica, sans-serif;
    background-color: #2c3440;
    background-image: linear-gradient(180deg,#14181c 0,#14181c 100px,#2c3440 101px);
  }
  a {
    text-decoration: none;
    color: inherit;
    &:hover{
      color: ${props => props.theme.green};
    }
  }
`;

const Content = styled.div`
    background: url(${background}) 0 -1px repeat-x;
    background-color: ${props => props.theme.black};
    margin: 0 auto;
    padding: 2rem;
`;
class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <ApolloHooksProvider client={client}>
                    <ThemeProvider theme={theme}>
                        <React.Fragment>
                            <GlobalStyle />
                            <Header />
                            <Content>
                                <Router />
                            </Content>
                        </React.Fragment>
                    </ThemeProvider>
                </ApolloHooksProvider>
            </ApolloProvider>
        );
    }
}
export default App;
