const { ApolloServer, gql, PubSub } = require("apollo-server");
const movies = require("./mocks/movies");
const categories = require("./mocks/categories");
const { getMoviesForCategory } = require("./utils");

const pubsub = new PubSub();

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: (parent, args, ctx, info) => "Hello world!"
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: true,
  playground: {
    settings: {
      "editor.theme": "light"
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
