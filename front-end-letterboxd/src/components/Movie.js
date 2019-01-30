import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { ApolloConsumer } from 'react-apollo';
import MovieStyles from './styles/MovieStyles';
import { MOVIE_DETAILS_QUERY } from './MovieDetails';

const Movie = ({ movie }) => (
    <MovieStyles>
        <ApolloConsumer>
            {client => (
                <Link to={movie.id}>
                    {movie.image && (
                        <img
                            src="https://picsum.photos/230/345/?random"
                            alt={movie.title}
                            onMouseOver={() => {
                                client.query({
                                    query: MOVIE_DETAILS_QUERY,
                                    variables: { id: movie.id }
                                });
                            }}
                        />
                    )}
                    <p>
                        {movie.title} - {movie.year}
                    </p>
                </Link>
            )}
        </ApolloConsumer>
    </MovieStyles>
);

Movie.propTypes = {
    movie: PropTypes.object.isRequired
};

export default Movie;
