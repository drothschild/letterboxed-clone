import React from 'react';
import { Link } from '@reach/router';
import {
    ReviewListStyles,
    ReviewListItemStyles
} from './styles/ReviewListStyles';
import Profile from './imgs/profile.jpg';
import { AvatarImg } from './styles/ImageStyles';

const MovieReviewList = reviews => {
    return (
        <ReviewListStyles>
            {reviews.reviews.map(review => (
                <ReviewListItemStyles key={review.id}>
                    <div className="image-column">
                        <AvatarImg
                            src={review.writer.image || Profile}
                            alt={review.writer.name}
                        />
                    </div>
                    <div className="contents-column">
                        <h2>{review.writer.name}</h2>
                        <div className="rating">{review.rating} stars</div>
                        <div className="contents">
                            {review.contents.slice(0, 300)}...
                            <Link to={`/reviews/${review.id}`}>more</Link>
                        </div>
                    </div>
                </ReviewListItemStyles>
            ))}
        </ReviewListStyles>
    );
};

export default MovieReviewList;
