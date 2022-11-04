import gql from 'graphql-tag'; 

const GET_ME = gql`
    {
        me{ 
            _id
            username
            email
            bookCount
            SavedBooks {
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