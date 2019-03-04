import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Link } from '@reach/router';
import gql from 'graphql-tag';
import {
    ReviewListStyles,
    ReviewListItemStyles
} from './styles/ReviewListStyles';
import { SmallMovieImg } from './styles/ImageStyles';
import { AvatarImg } from './styles/ImageStyles';
import Profile from './imgs/profile.jpg';
import Error from './Error';
import Auth from './Auth';

const MY_FEED_QUERY = gql`
    query MY_FEED_QUERY {
        myFeed {
            id
            rating
            contents
            movie {
                id
                title
                image
            }
            writer {
                id
                name
                image
            }
        }
    }
`;

function Feed() {
    const { data, error } = useQuery(MY_FEED_QUERY, {pollInterval: 1000});
    if (error) return <Error error={error} />;
    const myFeed = data.myFeed;
    if (!myFeed || myFeed.length === 0)
        return (
            <Auth>
                You need to follow some people or your followers need to write
                some reviews.
            </Auth>
        );
    return (
        <Auth>
            <ReviewListStyles>
                {myFeed.map(review => {
                    return (
                        <ReviewListItemStyles key={review.id}>
                            <div className="image-column">
                                <AvatarImg
                                    src={review.writer.image || Profile}
                                    alt={review.writer.name}
                                />
                                <SmallMovieImg
                                    src={review.movie.image}
                                    alt={review.movie.title}
                                />
                            </div>
                            <div className="contents-column">
                                <h2>
                                    {review.writer.name} on {review.movie.title}
                                </h2>
                                <div className="rating">
                                    {review.rating} stars
                                </div>
                                <div className="contents">
                                    {review.contents.slice(0, 300)}
                                    ...
                                    <Link to={`/reviews/${review.id}`}>
                                        more
                                    </Link>
                                </div>
                            </div>
                        </ReviewListItemStyles>
                    );
                })}
            </ReviewListStyles>
        </Auth>
    );
}

export default Feed;
export { MY_FEED_QUERY };
