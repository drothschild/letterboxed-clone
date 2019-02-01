import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
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
function Movies() {
    const [sortBy, setSortBy] = useState('title');
    const [sortDirection, setSortDirection] = useState('asc');
    const { data, error } = useQuery(ALL_MOVIES_QUERY);
    if (error) return <Error error={error} />;
    const propList = Object.keys(data.movies[0]).filter(
        i => i !== '__typename'
    );
    return (
        <div>
            <Link to="new">Add a movie</Link>
            <Center>
                <>
                    <select
                        value={sortBy}
                        onChange={e => {
                            setSortBy(e.target.value);
                        }}
                    >
                        {propList.map(prop => (
                            <option key={prop} value={prop}>
                                {prop}
                            </option>
                        ))}
                    </select>
                    <select
                        value={sortDirection}
                        onChange={e => {
                            setSortDirection(e.target.value);
                        }}
                    >
                        <option value="asc">asc</option>
                        <option value="desc">desc</option>
                    </select>
                    <MoviesList>
                        {data.movies
                            .sort((a, b) => {
                                if (sortDirection === 'asc') {
                                    if (a[sortBy] < b[sortBy]) {
                                        return -1;
                                    }
                                    if (a[sortBy] > b[sortBy]) {
                                        return 1;
                                    }
                                    return 0;
                                }
                                if (b[sortBy] < a[sortBy]) {
                                    return -1;
                                }
                                if (b[sortBy] > a[sortBy]) {
                                    return 1;
                                }
                                return 0;
                            })
                            .map(movie => (
                                <Movie key={movie.id} movie={movie} />
                            ))}
                    </MoviesList>
                </>
            </Center>
        </div>
    );
}

export default Movies;

export { ALL_MOVIES_QUERY };
