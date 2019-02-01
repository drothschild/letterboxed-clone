import React from 'react';
import { Link } from '@reach/router';
import {
    ReviewListStyles,
    ReviewListItemStyles
} from './styles/ReviewListStyles';
import { SmallMovieImg } from './styles/ImageStyles';

function UserReviewList(following) {
    return (
        <ReviewListStyles>
            {following.map(user => (
                <Link to={`/users/${user.id}`}>
                    <ReviewListItemStyles key={user.id}>
                        <div className="image-column">
                            <SmallMovieImg src={user.image} alt={user.name} />
                        </div>
                        <div className="contents-column">
                            <h2>{user.name}</h2>
                        </div>
                    </ReviewListItemStyles>
                </Link>
            ))}
        </ReviewListStyles>
    );
}

export default UserReviewList;
