import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from '@reach/router';

import gql from 'graphql-tag';
import styled from 'styled-components';
import Error from './Error';
import Movie from './Movie';

const ALL_MOVIES_QUERY = gql`
    query ALL_MOVIES_QUERY {
        movies(orderBy: title_ASC) {
            id
            title
            year
            image
        }
    }
`;

const Center = styled.div`
    text-align: center;
`;

const MoviesList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 242px);
    grid-gap: 30px;
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
`;
class Movies extends Component {
    render() {
        return (
            <div>
                <Link to="new">Add a movie</Link>
                <Center>
                    <Query query={ALL_MOVIES_QUERY}>
                        {({ data, error, loading }) => {
                            if (loading) return <p>Loading..</p>;
                            if (error) return <Error error={error} />;
                            return (
                                <MoviesList>
                                    {data.movies.map(movie => (
                                        <Movie key={movie.id} movie={movie} />
                                    ))}
                                </MoviesList>
                            );
                        }}
                    </Query>
                </Center>
            </div>
        );
    }
}

export default Movies;

export { ALL_MOVIES_QUERY };
