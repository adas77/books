import { faker } from "@faker-js/faker";
import { BookType, PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { randomInt } from "crypto";

const prisma = new PrismaClient();

const USERS_TO_CREATE = 30;
const AUTHORS_TO_CREATE = 100;
const BOOKS_TO_CREATE = 200;
const REVIEWS_TO_CREATE = 200;

const randomConnect = (uuids: any[]) => {
    return uuids[randomInt(uuids.length - 1)]?.id
}

async function run() {
    const PASSWORD = await bcrypt.hash('password', 10);
    // console.log('Starting pass:', PASSWORD)

    // 
    // USER
    // 
    const userData = Array(USERS_TO_CREATE)
        .fill(null)
        .map(() => {
            return {
                name: faker.internet.userName().toLowerCase(),
                email: faker.internet.email().toLocaleLowerCase(),
                password: PASSWORD,
                image: faker.image.avatar(),
            };
        });

    const createUsers = userData.map((user) =>
        prisma.user.create({ data: user })
    );

    const users = await prisma.$transaction(createUsers);
    // 
    // 
    // 

    // 
    // AUTHOR
    // 
    const authorData = Array(AUTHORS_TO_CREATE)
        .fill(null)
        .map(() => {
            return {
                name: faker.internet.userName().toLowerCase(),
                surname: faker.internet.userName().toLowerCase(),
            };
        });

    const createAuthors = authorData.map((a) =>
        prisma.author.create({ data: a })
    );

    const authors = await prisma.$transaction(createAuthors);
    // 
    // 
    // 
    // 
    // BOOK
    // 
    const bookData = Array(BOOKS_TO_CREATE)
        .fill(null)
        .map((i: number) => {
            return {
                type: i % 2 == 0 ? BookType.ACTION : BookType.DETECTIVE
            };
        });


    const createBooks = bookData.map((b, i) =>
        prisma.book.create({
            data: {
                isbn: faker.random.alphaNumeric(13),
                type: b.type,
                authors: {
                    connect: [{ id: randomConnect(authors) }, { id: randomConnect(authors) }, { id: randomConnect(authors) }, { id: randomConnect(authors) },]
                },
                users: {
                    connect: [{ id: randomConnect(users) }, { id: randomConnect(users) }, { id: randomConnect(users) }, { id: randomConnect(users) },]
                }
            }
        })
    );

    const books = await prisma.$transaction(createBooks);
    // 
    // 
    // 
    // 
    // 
    // 
    // 
    // reviews
    // 
    const reviewData = Array(REVIEWS_TO_CREATE)
        .fill(null)
        .map(() => {
            return {
                text: faker.lorem.sentences(),
                imgs: [faker.image.image(), faker.image.image(), faker.image.image(),]
            };
        });


    const createReviews = reviewData.map((r) =>
        prisma.bookReview.create({
            data: {
                text: r.text,
                imgs: r.imgs,
                userId: randomConnect(users),
                bookId: randomConnect(books),
            }
        })
    );

    const reviews = await prisma.$transaction(createReviews);

}

run();