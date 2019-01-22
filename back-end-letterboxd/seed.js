const { Prisma } = require('prisma-binding');
const faker = require('faker');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const db = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: process.env.PRISMA_ENDPOINT,
    secret: process.env.PRISMA_SECRET,
    debug: false
});

const seedConfig = {
    numberOfUsers: 200,
    numberOfMovies: 10,
    numberOfReviewsPerUser: 3
};

const setup = async () => {
    await db.mutation.deleteManyReviews({});
    await db.mutation.deleteManyUsers({});
    await db.mutation.deleteManyMovies({});
    const password = await bcrypt.hash('password', 10);
    for (let index = 0; index < seedConfig.numberOfUsers; index++) {
        const user = await db.mutation.createUser({
            data: {
                name: faker.name.findName(),
                email: faker.internet.email(),
                image: faker.image.avatar(),
                password
            }
        });
    }
    for (let index = 0; index < seedConfig.numberOfMovies; index++) {
        const movie = await db.mutation.createMovie({
            data: {
                title: faker.company.bsNoun(),
                description: faker.lorem.paragraph(),
                image: faker.image.image(),
                year: 1999
            }
        });
    }
    const users = await db.query.users({});
    const movies = await db.query.movies({});
    users.forEach(async user => {
        for (let index = 0; index < seedConfig.numberOfMovies; index++) {
            const randomMovie =
                movies[Math.floor(Math.random() * movies.length)];
            const review = await db.mutation.createReview({
                data: {
                    writer: {
                        connect: {
                            id: user.id
                        }
                    },
                    movie: {
                        connect: {
                            id: randomMovie.id
                        }
                    },
                    contents: faker.lorem.paragraphs(3),
                    rating: Math.floor(Math.random() * 5)
                }
            });
        }
    });
};

// Remember to call the setup method in the end
setup();
