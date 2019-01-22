import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { Link } from '@reach/router';
import Error from './Error';
import { MediumMovieImg } from './styles/ImageStyles';

const REVIEW_DETAILS_QUERY = gql`
    query REVIEW_DETAILS_QUERY($id: ID!) {
        review(where: { id: $id }) {
            id
            contents
            rating
            writer {
                id
                name
            }
            movie {
                id
                image
                title
            }
        }
    }
`;

const ReviewDetailsStyles = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 2rem auto;
    box-shadow: ${props => props.theme.bs};
    display: flex;
    align-items: center;
    .image-column {
        width: 300px;
        img {
            padding-top: 20px;
            padding-right: 50px;
        }
    }
    .review-column {
        flex-grow: 1;
        .review-body {
            font-family: Georgia, 'Times New Roman', Times, serif;
            font-size: 1.5rem;
        }
    }
`;

const ReviewDetails = ({ reviewId }) => (
    <Query query={REVIEW_DETAILS_QUERY} variables={{ id: reviewId }}>
        {({ error, loading, data }) => {
            if (error) return <Error error={error} />;
            if (loading) return <p>Loading...</p>;
            if (!data.review)
                return <p>No Movie Found for {this.props.movieId}</p>;
            const review = data.review;
            return (
                <ReviewDetailsStyles>
                    <div className="image-column">
                        <MediumMovieImg
                            src={review.movie.image}
                            alt={review.movie.title}
                        />
                    </div>
                    <div className="review-column">
                        <h2>
                            <Link to={`/movies/${review.movie.id}`}>
                                {review.movie.title}
                            </Link>{' '}
                            - {review.rating} Stars
                        </h2>
                        <h2>
                            By{' '}
                            <Link to={`/users/${review.writer.id}`}>
                                {review.writer.name}
                            </Link>{' '}
                        </h2>
                        <div className="review-body"> {review.contents}</div>
                    </div>
                </ReviewDetailsStyles>
            );
        }}
    </Query>
);

export default ReviewDetails;
