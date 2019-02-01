const Subscription = {
    myFeed: {
        subscribe: async (parent, args, ctx, info) => {
            if (!ctx.request.userId) {
                return null;
            }
            return await ctx.db.subscription.review(
                {
                    where: {
                        mutation_in: [CREATED],
                        node: {
                            writer: {
                                followers_some: { id: ctx.request.userId }
                            }
                        }
                    }
                },
                info
            );
        }
    }
};
module.exports = Subscription;
