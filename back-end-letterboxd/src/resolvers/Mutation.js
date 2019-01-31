const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mutations = {
    async signup(parents, args, ctx, info) {
        args.email = args.email.toLowerCase();
        const password = await bcrypt.hash(args.password, 10);
        const user = await ctx.db.mutation.createUser(
            {
                data: {
                    ...args,
                    password
                }
            },
            info
        );
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365
        });

        return user;
    },
    async login(parents, { email, password }, ctx, info) {
        const user = await ctx.db.query.user({ where: { email } });
        if (!user) {
            throw new Error('Invalid Email or Password!');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Invalid Email or Password!');
        }
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 365
        });
        return user;
    },
    async logout(parents, args, ctx, info) {
        ctx.response.clearCookie('token');
        return { message: 'Goodbye!' };
    },
    async createMovie(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged in to do that');
        }
        return ctx.db.mutation.createMovie(
            {
                data: {
                    ...args
                }
            },
            info
        );
    },
    async createReview(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged in to do that');
        }
        const review = await ctx.db.mutation.createReview(
            {
                data: {
                    writer: {
                        connect: {
                            id: ctx.request.userId
                        }
                    },
                    movie: {
                        connect: {
                            id: args.movieId
                        }
                    },
                    contents: args.contents,
                    rating: args.rating
                }
            },
            info
        );
        return review;
    },
    async followUser(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged in to do that');
        }
        const user = await ctx.db.mutation.updateUser(
            {
                where: { id: ctx.request.userId },
                data: {
                    following: {
                        connect: {
                            id: args.followingId
                        }
                    }
                }
            },
            info
        );

        return user;
    },
    async unfollowUser(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged in to do that');
        }
        const user = await ctx.db.mutation.updateUser(
            {
                where: { id: ctx.request.userId },
                data: {
                    following: {
                        disconnect: {
                            id: args.followingId
                        }
                    }
                }
            },
            info
        );
        return user;
    }
};

module.exports = mutations;
