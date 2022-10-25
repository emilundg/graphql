const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

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

module.exports = UserType;