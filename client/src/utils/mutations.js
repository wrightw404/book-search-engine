import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
            user{
                _id
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!, $email: String!){
        login(username: $username, password: $password, email: $email){
            token
            user{
                _id
                username
                email
                bookCount
                savedBooks{
                    #_id
                    bookId
                    authors
                    description
                    title
                    image
                    link
                }
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input:savedBook!) {
        saveBook(input: $input){
                _id
                username
                email
                bookCount
                savedBooks{
                    #_id
                    bookId
                    authors
                    description
                    title
                    image
                    link
                }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId:ID!) {
        removeBook(bookId: $bookId){
                _id
                username
                email
                bookCount
                savedBooks{
                    #_id
                    bookId
                    authors
                    description
                    title
                    image
                    link
                }
        }
    }
`;
