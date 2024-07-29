import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { User, quotes } from './fakedb.js';

const typeDefs = gql`
 type Query {
     users: [User]
     quotes:[quotes]
  }

 type User {
    id: Int
    firstname: String
    lastname: String
    email: String
    age: Int
    phoneno: Int
  }

 type quotes {
    quote:String
    by:Int
  }
 
`;

const resolvers = {
  Query: {
    users: () => User,
    quotes: () => quotes,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`Server is listening at ${url}`);
});