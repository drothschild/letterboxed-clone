import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
    query {
        me {
            id
            email
            name
            following {
                id
                reviews {
                    id
                    rating
                    contents
                    createdAt
                    movie {
                        id
                        title
                        image
                    }
                    writer {
                        id
                        name
                        image
                    }
                }
            }
        }
    }
`;

const Me = props => (
    <Query {...props} query={CURRENT_USER_QUERY}>
        {payload => props.children(payload)}
    </Query>
);

Me.propTypes = {
    children: PropTypes.func.isRequired
};

export default Me;

export { CURRENT_USER_QUERY };
