import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import { MOVIE_DETAILS_QUERY } from './MovieDetails';
import Auth from './Auth';
import Error from './Error';

const CREATE_REVIEW_MUTATION = gql`
    mutation CREATE_REVIEW_MUTATION(
        $movieId: ID!
        $contents: String!
        $rating: Int!
    ) {
        createReview(movieId: $movieId, contents: $contents, rating: $rating) {
            id
        }
    }
`;

const CreateReviewStyles = styled.div`
    img {
        :hover {
            border-color: ${props => props.theme.green};
        }
    }
    form {
        width: 700px;
        textarea,
        field {
            background-color: #cde;
            color: #567;
            box-shadow: ${props => props.theme.boxShadow};
            width: 100%;
            :focus {
                background-color: #fff;
                color: #234;
            }
        }
        textarea {
            color: #89a;
            height: 200px;
        }
        label {
            color: #fff;
        }
        button {
            background-color: ${props => props.theme.green};
            box-shadow: ${props => props.theme.boxShadow};
        }
    }
`;

function CreateReview({ movieId }) {
    const [form, setForm] = useState({
        contents: '',
        rating: 0
    });
    const { data, error: errorQuery } = useQuery(MOVIE_DETAILS_QUERY, {
        variables: { id: movieId }
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const createReview = useMutation(CREATE_REVIEW_MUTATION, {
        variables: { ...form, movieId },
        refetchQueries: [
            {
                query: MOVIE_DETAILS_QUERY,
                variables: { id: movieId }
            }
        ]
    });

    const handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        setForm({ ...form, [name]: val });
    };

    const submitForm = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await createReview();
            navigate(`/reviews/${res.data.createReview.id}`);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };
    if (errorQuery)
        return (
            <Auth>
                <Error error={errorQuery} />
            </Auth>
        );
    const movie = data.movie;
    if (!data.movie)
        return (
            <Auth>
                <p>No Movie Found for {movieId}</p>
            </Auth>
        );

    return (
        <Auth>
            <CreateReviewStyles>
                <div>
                    <h2>
                        {movie.title}
                        <span className="metadata">{movie.year}</span>
                    </h2>
                    <img src={movie.image} alt={movie.title} />
                </div>

                <form onSubmit={submitForm}>
                    <Error error={error} />
                    <fieldset disabled={loading} aria-busy={loading}>
                        <textarea
                            id="contents"
                            name="contents"
                            placeholder="Add a review..."
                            required
                            value={form.contents}
                            onChange={handleChange}
                        />
                        {/* Todo: Change this to star svg */}
                        <label htmlFor="rating">Rating: 0-4 stars</label>
                        <input
                            id="rating"
                            name="rating"
                            type="number"
                            value={form.rating}
                            onChange={handleChange}
                        />
                        <button type="submit">Save</button>
                    </fieldset>
                </form>
            </CreateReviewStyles>
        </Auth>
    );
}

export default CreateReview;
