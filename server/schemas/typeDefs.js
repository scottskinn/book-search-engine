// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        saveBooks: [Book]
    }
    type Book {
        bookId: String
        authors: String
        description: String
        title: String
        image: String
        link: String
    }
    type Auth {
        token: ID!
        user: User
    } 
    type Query {
        me: User
        users: [User]
        user(username: String!): User
        books(title: String): Book
        book(title: String): Book
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBooks(Book: String): User
        removeBook(bookId: ID!): User
    }
`;

// export the typeDefs
module.exports = typeDefs;