const { ApolloServer, gql, PubSub } = require("apollo-server");
const movies = require("./mocks/movies");
const categories = require("./mocks/categories");
const { getMoviesForCategory } = require("./utils");

const pubsub = new PubSub();

const typeDefs = gql`
  type Movie {
    title: String!
    vote_count: String!
    id: ID!
    video: String!
    vote_average: String!
    popularity: String!
    poster_path: String!
    original_language: String!
    original_title: String!
    backdrop_path: String!
    adult: String!
    overview: String!
    release_date: String!
    categories: [Category!]!
  }

  type Category {
    id: ID!
    name: String!
    movies: [Movie!]!
  }

  type Query {
    hello: String!
    getMovies(category: String): [Movie!]!
    getCategories: [Category!]!
  }

  type Subscription {
    voteAdded: Movie!
  }

  type Mutation {
    addVote(movie_id: ID!): Movie!
  }
`;

const resolvers = {
  Query: {
    hello: (parent, args, ctx, info) => "Hello world!",
    getCategories() {
      return categories;
    },
    getMovies(parents, args, ctx, info) {
      const { category } = args;
      if (!category) return movies;
      return getMoviesForCategory(category);
    }
  },
  Movie: {
    categories: (parent, args, ctx, info) => {
      return parent.category_ids.map(id =>
        categories.find(genre => genre.id === id)
      );
    }
  },
  Category: {
    movies: (parent, args, ctx, info) => {
      return getMoviesForCategory(parent.name);
    }
  },
  Mutation: {
    addVote: (parent, args) => {
      const movie = movies.find(movie => movie.id.toString() === args.movie_id);
      movie.vote_count += 1;
      pubsub.publish("voteAdded", { voteAdded: movie });
      return movie;
    }
  },
  Subscription: {
    voteAdded: {
      subscribe: () => pubsub.asyncIterator(["voteAdded"])
    }
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
