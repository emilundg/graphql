const { GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString, GraphQLSchema } = require("graphql");
const UserType = require("./TypeDefs/UserType");
const userData = require("../MOCK_DATA.json");

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

module.exports =  new GraphQLSchema({query: RootQuery, mutation: Mutation});