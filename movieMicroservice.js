const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { ApolloServer, gql } = require('apollo-server');
const movieProtoPath = 'movie.proto';
const movieProtoDefinition = protoLoader.loadSync(movieProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const movieProto = grpc.loadPackageDefinition(movieProtoDefinition).movie;

const movieService = {
  getMovie: (call, callback) => {

    const movie = {
      id: call.request.movie_id,
      title: 'Example Movie',
      description: 'This is an example movie.',
  
    };
    callback(null, {movie});
  },
  searchMovies: (call, callback) => {
    const { query } = call.request;

    const movies = [
      {
        id: '1',
        title: 'Example Movie 1',
        description: 'This is the first example movie.',
      },
      {
        id: '2',
        title: 'Example Movie 2',
        description: 'This is the second example movie.',
      },

    ];
    callback(null, { movies });
  },
  createMovie: (call, callback) => {
    const { query } = call.request;
    const movie = {
      id: call.request.movie_id,
      title: call.request.title,
      description: call.request.description,

    };
    callback(null, {movie});
  },
  deleteMovie: (call, callback) => {
    const { movie_id } = call.request;
    // Delete movie logic here
    callback(null, { success: true });
  },

  editMovie: (call, callback) => {
    const { movie_id, title, description } = call.request;
    // Edit movie logic here
    const movie = {
      id: movie_id,
      title,
      description,
    };
    callback(null, { movie });
  },
};



const grpcServer = new grpc.Server();
grpcServer.addService(movieProto.MovieService.service, movieService);
const grpcPort = 50051;
grpcServer.bindAsync(`0.0.0.0:${grpcPort}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error('Failed to bind server:', err);
    return;
  }

  console.log(`gRPC server is running on port ${port}`);
  grpcServer.start();
});
console.log(`Movie microservice running on port ${grpcPort}`);

const typeDefs = gql`
  type Movie {
    id: String!
    title: String!
    description: String!
  }

  type Query {
    movie(id: String!): Movie
    movies: [Movie]
  }

  type Mutation {
    deleteMovie(id: String!): Boolean
    editMovie(id: String!, title: String!, description: String!): Movie
  }
`;

const resolvers = {
  Query: {
    movie: (_, { id }) => {
      // Logic to retrieve a movie by ID
    },
    movies: () => {
      // Logic to retrieve all movies
    },
  },
  Mutation: {
    deleteMovie: (_, { id }) => {
      // Logic to delete a movie
    },
    editMovie: (_, { id, title, description }) => {
      // Logic to edit a movie
    },
  },
};

const graphQLServer = new ApolloServer({ typeDefs, resolvers });
graphQLServer.listen().then(({ url }) => {
  console.log(`GraphQL server running at ${url}`);
});