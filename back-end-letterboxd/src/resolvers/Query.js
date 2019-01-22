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
    }
};

module.exports = Query;
