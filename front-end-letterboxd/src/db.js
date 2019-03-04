import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_END_POINT
});

const wsLink = () => {
    const token = localStorage.getItem('token');
    return new WebSocketLink({
        uri: process.env.REACT_APP_WS_END_POINT,

        options: {
            reconnect: true,
            connectionParams: {
                authToken: token ? `Bearer ${token}` : ''
            }
        }
    });
};

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    };
});
const link = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink)
);

const client = new ApolloClient({
    link,
    request: operation => {
        operation.setContext({
            fetchOptions: {
                credentials: 'include'
            }
        });
    },
    cache: new InMemoryCache()
});

export default client;
