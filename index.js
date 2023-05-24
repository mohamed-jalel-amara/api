// const { ApolloServer } = require('apollo-server');
// const mongoose = require('mongoose');

// require('dotenv').config();
// const MONGODB = process.env.MONGO_URL;

// // console.log(MONGODB);

// // Apollo Server
// // typeDefs: GraphQL Type Definitions
// // resolvers: How do we resolve queries / mutations


// const typeDefs = require('./typeDefs');

// const resolvers = require('./resolvers');

//  const server = new ApolloServer({typeDefs,resolvers});


// mongoose.connect(MONGODB, {useNewUrlParser: true}).then(()=>{
//     console.log("db connected");
//     return server.listen({port:5001});
// }).then((res)=>{
//     console.log(`Customers Microservices running at ${res.url}`);
// })