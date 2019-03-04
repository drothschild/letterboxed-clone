const jwt = require('jsonwebtoken');
const { Prisma } = require('prisma-binding');

async function getUserId(ctx) {
    const Authorization = ctx.request.headers.authorization;
    console.log('Auth', Authorization);
    if (Authorization && Authorization !== 'null') {
        console.log('authorized');
        const token = Authorization.replace('Bearer ', '');
        const { userId } = await jwt.verify(token, process.env.APP_SECRET);
        console.log('id', userId);
        return userId;
    } else {
        return null;
    }
}

module.exports = { getUserId };
