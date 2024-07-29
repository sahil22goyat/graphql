import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { user, quotes } from './fakedb.js';

const typeDefs = gql`
 type Query {
     user: [user]
     quotes:[quotes]
      userone(id:ID!): user
    quoteone(id:ID!):quotes
  }

 type user {
    id: Int
    firstname: String
    lastname: String
    email: String
    age: Int
    phoneno: Int
    quotes: [quotes]
  }

 type quotes {
    quote:String
    by:Int
  }
type Mutation {
    createuser(
      firstname: String!
      lastname: String!
      email: String!
      age: Int!
      phoneno: String!
    ): user
  }
`;

const resolvers = {
  Query: {
    user: () => user,
    quotes: () => quotes,
    userone:(_,p)=> user.find(user => user.id == p.id),
    quoteone:(_,p)=> quotes.find(quotes => quotes.by == p.id)
  },
  user:{

    quotes: (parent) => {
      return quotes.filter((quote) => quote.by == parent.id);
    }
  },


  Mutation:{

    createuser:(_,p)=>{
      const newuser={
        id:user.length+1,
        firstname:p.firstname,
        lastname:p.lastname,
        email:p.email,
        age:p.age,
        phoneno:p.phoneno
      }
      user.push(newuser)
      return newuser
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`Server is listening at ${url}`);
});