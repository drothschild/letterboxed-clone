import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './Me';
import { MY_FEED_QUERY } from './Feed';
import Error from './Error';

const FOLLOW_USER_MUTATION = gql`
    mutation FOLLOW_USER_MUTATION($followingId: ID!) {
        followUser(followingId: $followingId) {
            id
        }
    }
`;
const UNFOLLOW_USER_MUTATION = gql`
    mutation UNFOLLOW_USER_MUTATION($followingId: ID!) {
        unfollowUser(followingId: $followingId) {
            id
        }
    }
`;

function FollowButton({ userId }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { data, error: errorQuery } = useQuery(CURRENT_USER_QUERY);

    if (errorQuery) return <Error error={errorQuery} />;
    if (!data.me) return null;

    const unfollowUser = useMutation(UNFOLLOW_USER_MUTATION, {
        variables: { followingId: userId },
        refetchQueries: [
            { query: CURRENT_USER_QUERY },
            { query: MY_FEED_QUERY }
        ]
    });
    const followUser = useMutation(FOLLOW_USER_MUTATION, {
        variables: { followingId: userId },
        refetchQueries: [
            { query: CURRENT_USER_QUERY },
            { query: MY_FEED_QUERY }
        ]
    });

    const handleSubmitButton = async mutationFunction => {
        setLoading(true);
        try {
            await mutationFunction();
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };

    const isFollowed =
        data.me.following.filter(user => {
            return user.id === userId;
        }).length > 0;

    if (error) return <Error error={error} />;

    if (isFollowed)
        return (
            <button
                onClick={() => {
                    handleSubmitButton(unfollowUser);
                }}
                disabled={loading}
            >
                Unfollow
            </button>
        );

    return (
        <button
            onClick={() => {
                handleSubmitButton(followUser);
            }}
            disabled={loading}
        >
            Follow
        </button>
    );
}

export default FollowButton;
