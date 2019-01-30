import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Link } from '@reach/router';

import gql from 'graphql-tag';
import styled from 'styled-components';
import Error from './Error';
import Movie from './Movie';

const ALL_MOVIES_QUERY = gql`
    query ALL_MOVIES_QUERY {
        movies {
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
    state = { sortBy: 'Title', sortDirection: 'asc' };

    render() {
        return (
            <div>
                <Link to="new">Add a movie</Link>
                <Center>
                    <Query query={ALL_MOVIES_QUERY}>
                        {({ data, error, loading }) => {
                            if (loading) return <p>Loading..</p>;
                            if (error) return <Error error={error} />;
                            const propList = Object.keys(data.movies[0]).filter(
                                i => i !== '__typename'
                            );
                            return (
                                <>
                                    <select
                                        value={this.state.sortBy}
                                        onChange={e => {
                                            this.setState({
                                                sortBy: e.target.value
                                            });
                                        }}
                                    >
                                        {propList.map(prop => (
                                            <option key={prop} value={prop}>
                                                {prop}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        value={this.state.sortDirection}
                                        onChange={e => {
                                            this.setState({
                                                sortDirection: e.target.value
                                            });
                                        }}
                                    >
                                        <option value="asc">asc</option>
                                        <option value="desc">desc</option>
                                    </select>
                                    <MoviesList>
                                        {data.movies
                                            .sort((a, b) => {
                                                if (
                                                    this.state.sortDirection ===
                                                    'asc'
                                                ) {
                                                    if (
                                                        a[this.state.sortBy] <
                                                        b[this.state.sortBy]
                                                    ) {
                                                        return -1;
                                                    }
                                                    if (
                                                        a[this.state.sortBy] >
                                                        b[this.state.sortBy]
                                                    ) {
                                                        return 1;
                                                    }
                                                    return 0;
                                                }
                                                if (
                                                    b[this.state.sortBy] <
                                                    a[this.state.sortBy]
                                                ) {
                                                    return -1;
                                                }
                                                if (
                                                    b[this.state.sortBy] >
                                                    a[this.state.sortBy]
                                                ) {
                                                    return 1;
                                                }
                                                return 0;
                                            })
                                            .map(movie => (
                                                <Movie
                                                    key={movie.id}
                                                    movie={movie}
                                                />
                                            ))}
                                    </MoviesList>
                                </>
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
