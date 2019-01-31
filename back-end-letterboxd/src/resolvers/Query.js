const { forwardTo } = require('prisma-binding');
const Query = {
    movies: forwardTo('db'),
    movie: forwardTo('db'),
    review: forwardTo('db'),
    reviews: forwardTo('db'),
    user: forwardTo('db'),
    users: forwardTo('db'),
    me(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            return null;
        }
        return ctx.db.query.user({ where: { id: ctx.request.userId } }, info);
    },
    async myFeed(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            return null;
        }
        const reviews = await ctx.db.query.reviews(
            {
                where: {
                    writer: { followers_some: { id: ctx.request.userId } }
                }
            },
            info
        );
        return reviews.sort((a, b) => {
            if (b.createdAt < a.createdAt) {
                return -1;
            }
            return 1;
        });
    }
};
module.exports = Query;
