const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Movie {
    id: String!
    title: String!
    description: String!
  }

  type TVShow {
    id: String!
    title: String!
    description: String!
  }

  type Query {
    movie(id: String!): Movie
    movies: [Movie]
    tvShow(id: String!): TVShow
    tvShows: [TVShow]
    deleteTVShow(id: String!): Boolean
  }

  type Mutation {
    createMovie(id: String!, title: String!, description: String!): Movie
    deleteTVShow(id: String!): Boolean
    updateTVShow(id: String!, title: String!, description: String!): TVShow
    deleteMovie(id: String!): Boolean
    editMovie(id: String!, title: String!, description: String!): Movie
    editTVShow(id: String!, title: String!, description: String!): TVShow
  }
  
`;

module.exports = typeDefs;
