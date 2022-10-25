const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const userData = require("./MOCK_DATA.json");

// 2
const UserType = new GraphQLObjectType({
  name: "User",
  // Define columns for user type
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  })
})

// 1.
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  // Different queries we want to have
  // Creates "routes"
  fields: {
    // 3
    getAllUsers: {
      // What to be returned
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt }},
      // Pass resolver, args is argument to function, e.g id
      resolve(parent, args) {
        // If db, make the call to get the data
        return userData
      }
    }
  }
});

// 4 Update data
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        // Create/Insert to e.g db
        userData.push({
          id: userData.length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
          password: args.password
        });
        // Aka res.send
        return args;
      }
    }
    // deleteUser,
    // updateUser
  }
});

const schema = new GraphQLSchema({query: RootQuery, mutation: Mutation});

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');