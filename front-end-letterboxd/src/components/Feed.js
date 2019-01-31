import React from 'react';
import { Query } from 'react-apollo';
import { Link } from '@reach/router';
import { CURRENT_USER_QUERY } from './Me';
import {
    ReviewListStyles,
    ReviewListItemStyles
} from './styles/ReviewListStyles';
import { SmallMovieImg } from './styles/ImageStyles';
import { AvatarImg } from './styles/ImageStyles';
import Profile from './imgs/profile.jpg';
import Error from './Error';
import Auth from './Auth';

const Feed = () => (
    <Auth>
        <Query query={CURRENT_USER_QUERY}>
            {({ error, loading, data }) => {
                if (error) return <Error error={error} />;
                if (loading) return <p>Loading...</p>;
                const me = data.me;
                let reviews = me.following
                    .map(user => user.reviews)
                    .flat()
                    .sort((a, b) => {
                        if (b.createdAt < a.createdAt) {
                            return -1;
                        }
                        return 1;
                    });
                if (!reviews) return <div>You need to follow some people.</div>;
                return (
                    <ReviewListStyles>
                        {reviews.map(review => {
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
                                            {review.writer.name} on{' '}
                                            {review.movie.title}
                                        </h2>
                                        <div className="rating">
                                            {review.rating} stars
                                        </div>
                                        <div className="contents">
                                            {review.contents.slice(0, 300)}...
                                            <Link to={`/reviews/${review.id}`}>
                                                more
                                            </Link>
                                        </div>
                                    </div>
                                </ReviewListItemStyles>
                            );
                        })}
                    </ReviewListStyles>
                );
            }}
        </Query>
    </Auth>
);

export default Feed;
