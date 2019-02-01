import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import MovieStyles from './styles/MovieStyles';

function Movie({ movie }) {
    return (
        <MovieStyles>
            <Link to={movie.id}>
                {movie.image && (
                    <img
                        src="https://picsum.photos/230/345/?random"
                        alt={movie.title}
                    />
                )}
                <p>
                    {movie.title} - {movie.year}
                </p>
            </Link>
        </MovieStyles>
    );
}

Movie.propTypes = {
    movie: PropTypes.object.isRequired
};

export default Movie;
