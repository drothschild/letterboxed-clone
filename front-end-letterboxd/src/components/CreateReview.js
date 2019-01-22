import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
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

export default class CreateReview extends Component {
    state = {
        contents: '',
        rating: ''
    };
    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({
            [name]: val
        });
    };

    render() {
        const { contents, rating } = this.state;
        const { movieId } = this.props;

        return (
            <Auth>
                <Mutation
                    mutation={CREATE_REVIEW_MUTATION}
                    variables={{ movieId: movieId, ...this.state }}
                    refetchQueries={[
                        {
                            query: MOVIE_DETAILS_QUERY,
                            variables: { id: movieId }
                        }
                    ]}
                >
                    {createReview => (
                        <CreateReviewStyles>
                            <h1>I watched...</h1>
                            <Query
                                query={MOVIE_DETAILS_QUERY}
                                variables={{ id: movieId }}
                            >
                                {({ error, loading, data }) => {
                                    if (error) return <Error error={error} />;
                                    if (loading) return <p>Loading...</p>;
                                    const movie = data.movie;
                                    if (!data.movie)
                                        return (
                                            <p>
                                                No Movie Found for{' '}
                                                {this.props.movieId}
                                            </p>
                                        );
                                    return (
                                        <>
                                            <h2>
                                                {movie.title}
                                                <span className="metadata">
                                                    {movie.year}
                                                </span>
                                            </h2>
                                            <img
                                                src={movie.image}
                                                alt={movie.title}
                                            />
                                        </>
                                    );
                                }}
                            </Query>
                            <form
                                onSubmit={async e => {
                                    e.preventDefault();
                                    const res = await createReview();
                                    navigate(
                                        `/reviews/${res.data.createReview.id}`
                                    );
                                }}
                            >
                                <textarea
                                    id="contents"
                                    name="contents"
                                    placeholder="Add a review..."
                                    required
                                    value={contents}
                                    onChange={this.handleChange}
                                />
                                {/* Todo: Change this to star svg */}
                                <label htmlFor="rating">
                                    Rating: 0-4 stars
                                </label>
                                <input
                                    id="rating"
                                    name="rating"
                                    type="number"
                                    value={rating}
                                    onChange={this.handleChange}
                                />
                                <button type="submit">Save</button>
                            </form>
                        </CreateReviewStyles>
                    )}
                </Mutation>
            </Auth>
        );
    }
}
