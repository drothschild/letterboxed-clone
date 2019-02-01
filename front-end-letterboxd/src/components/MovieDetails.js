import React from 'react';
import { Link } from '@reach/router';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';

import Error from './Error';
import styled from 'styled-components';
import MovieReviewList from './MovieReviewList';

const MovieDetailsStyles = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 2rem auto;
    box-shadow: ${props => props.theme.bs};
    .details {
        margin: 3rem;
        font-size: 2rem;
    }
`;

const MOVIE_DETAILS_QUERY = gql`
    query MOVIE_DETAILS_QUERY($id: ID!) {
        movie(where: { id: $id }) {
            id
            title
            year
            description
            image
            reviews(orderBy: createdAt_DESC) {
                id
                contents
                rating
                writer {
                    id
                    name
                    image
                }
            }
        }
    }
`;

function MovieDetails({ movieId }) {
    const { data, error } = useQuery(MOVIE_DETAILS_QUERY, {
        variables: { id: movieId }
    });
    if (error) return <Error error={error} />;
    if (!data.movie) return <p>No Movie Found for {movieId}</p>;
    const movie = data.movie;
    return (
        <MovieDetailsStyles>
            <img src={movie.image} alt={movie.title} />
            <div className="details">
                <h2>
                    {movie.title}- {movie.year}
                </h2>
                <p>{movie.description}</p>
                <Link to="review">Review it!</Link>
            </div>
            <MovieReviewList reviews={movie.reviews} />
        </MovieDetailsStyles>
    );
}

export default MovieDetails;

export { MOVIE_DETAILS_QUERY };
