import React from 'react';
import { Query, Mutation } from 'react-apollo';
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

const FollowButton = ({ userId }) => (
    <Query query={CURRENT_USER_QUERY}>
        {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <Error error={error} />;
            if (!data.me) {
                return null;
            }
            const isFollowed =
                data.me.following.filter(user => {
                    return user.id === userId;
                }).length > 0;
            if (isFollowed) {
                return (
                    <Mutation
                        mutation={UNFOLLOW_USER_MUTATION}
                        variables={{ followingId: userId }}
                        refetchQueries={[
                            { query: CURRENT_USER_QUERY },
                            { query: MY_FEED_QUERY }
                        ]}
                    >
                        {(unfollowUser, error, loading) => (
                            <button
                                onClick={async () => {
                                    await unfollowUser();
                                }}
                            >
                                Unfollow User
                            </button>
                        )}
                    </Mutation>
                );
            }
            return (
                <Mutation
                    mutation={FOLLOW_USER_MUTATION}
                    variables={{ followingId: userId }}
                    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
                >
                    {(followUser, error, loading) => (
                        <button
                            onClick={async () => {
                                await followUser();
                            }}
                        >
                            Follow User
                        </button>
                    )}
                </Mutation>
            );
        }}
    </Query>
);
export default FollowButton;
