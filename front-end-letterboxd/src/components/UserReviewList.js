import React from 'react';
import { Link } from '@reach/router';
import {
    ReviewListStyles,
    ReviewListItemStyles
} from './styles/ReviewListStyles';
import { SmallMovieImg } from './styles/ImageStyles';

function UserReviewList({ reviews }) {
    return (
        <ReviewListStyles>
            {reviews.map(review => (
                <ReviewListItemStyles key={review.id}>
                    <div className="image-column">
                        <SmallMovieImg
                            src={review.movie.image}
                            alt={review.movie.title}
                        />
                    </div>
                    <div className="contents-column">
                        <h2>{review.movie.title}</h2>
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
}

export default UserReviewList;
