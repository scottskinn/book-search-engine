import { gql } from '@apollo/client';

// login user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// add new user
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;


// add to saved books
export const SAVE_BOOK = gql`
    mutation saveBook($input: savedBook!) {
        saveBook(input: $input ) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                description
                authors
                link
                image
            }
        }
    }
`;


// remove saved book
export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                title
                description
                authors
                link
                image
            }
        }
    }
`;