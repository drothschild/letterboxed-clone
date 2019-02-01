import React, { Suspense } from 'react';
import { Router } from '@reach/router';
import Movies from './components/Movies';
import CreateMovie from './components/CreateMovie';
import MovieDetails from './components/MovieDetails';
import Main from './components/Main';
import CreateReview from './components/CreateReview';
import ReviewDetails from './components/ReviewDetails';
import UserDetails from './components/UserDetails';
import Users from './components/Users';
import Feed from './components/Feed';
import Auth from './components/Auth';

function Routes() {
    return (
        <Suspense fallback="loading...">
            <Router>
                <Main path="/" />
                <Auth path="/auth" />
                <Movies path="movies" />
                <Feed path="feed" />
                <CreateMovie path="movies/new" />
                <MovieDetails path="movies/:movieId" />
                <CreateReview path="movies/:movieId/review" />
                <ReviewDetails path="reviews/:reviewId" />
                <Users path="users" />
                <UserDetails path="users/:userId" />
            </Router>
        </Suspense>
    );
}

export default Routes;
