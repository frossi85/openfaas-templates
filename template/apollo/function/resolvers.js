"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    }
];
const resolvers = {
    Query: {
        books: () => books,
    }
};
exports.default = resolvers;
