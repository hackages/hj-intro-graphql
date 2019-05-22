# HackJam Intro GraphQL

## 1. Your first queries

Go to the GitHub GraphQL API Explorer: https://developer.github.com/v4/explorer/

With the help of the documentation that you can toggle on the right upper side of the `GraphiQL` explorer, try to write:

1. A query to get the following information from the `Hackages` organization:

   - Email
   - Total number of repositories

2. Get the `id` of this repository
3. Try to give a star to this repository. **HINT**: you will need to use a `mutation` and the `id` of the repository (that you should have by now)

## 2. Implement your own API

### Install

```bash
## yarn
yarn
yarn start

## npm
npm install
npm run start
```

Go to [http://localhost:4000/](http://localhost:4000/), you should get a playground where you can type your query/mutation on the left side and see the result on the right side.

If everything is working correctly, you should be able to execute a `hello` query:

```graphql
query helloWorld {
  hello
}
```

The resolver and type for this query are within the `index.js` file. You can try to change the return value of the resolver (for instance return an object instead of a string as defined in the `typeDefs`) and see what happens.

### Create your own GraphQL type

Create a `Movie` type within the `gql` string literals. Try to write the movie type definition based on the shape of a movie that you can see in the `mocks` folder.

You can have a look at the `GraphQL` scalar types: https://graphql.org/learn/schema/#scalar-types

```javascript
const typeDefs = gql`
  type Movie {
      // type definition
  }
`;
```

Now that we defined our `Movie` type, let's try to make a `getMovies` query.

Add a `getMovies` field under the `Query` type that should return an `array` of `Movie`. **HINT**: use the `hello` Query field as an example.

```graphql
  type Query {
    getMovies: #return type
  }
```

It's time to implement the `getMovies` resolver now (the function which will be executed when we make a `getMovies` query). Each resolver has the following.

For now, this function should return the entire list of movies.

```javascript
const resolvers = {
  Query: {
    getMovies(parents, args, ctx, info) {
      // return movies list
    }
  }
};
```

You can get information about `resolvers` signature here: https://www.apollographql.com/docs/apollo-server/essentials/data#type-signature

You should now be able to run this `getMovies` query within the playground. Try it with different movie `fields` and see how `GraphQL` let you granularly select what information you need! **NOTE**: You will probably have to refresh the `playground` to have the new type definitions updated.

Let's do the same now for the `categories`:

1. Define the `Category` type
2. Add a `getCategories` field to the `Query` type
3. Implement the corresponding `resolver`
4. Verify that your `getCategories` query works (via the playground)

As you've probably seen by now, a `Movie` is attributed to a list of `Category` through the `category_ids` field of the `Movie` type. Wouldn't it be better to be able to retrieve the list of `category` (and their details) when asking for a `Movie` ?

To make that possible, we should slightly modify our `Movie` type. Add a `categories` field to the `Movie` type. **HINT**: use the `Category` type we've defined previously.

```graphql
type Movie {
  #Existing fields
  categories: ... #Use the Category type we've defined
}
```

Then, create a `Movie` resolver field (next to the `Query` field) and describe how to resolve the `categories`:

```javascript
const resolvers = {
  Query: {
    //...
  }
  Movie: {
    categories: (parent, args, ctx, info) => {
      // Return the categories
    }
  },
}
```

**HINT**: Only the `categories` from the currently resolved `movie` should be returned. Inspect the `parent` parameter to check if you can grab useful information from there.  


Don't forget to try your solution via the playground! Again, see how we can exactly define which fields we want to get back from the server, and so even for the children

Let's now do the same but in the other way around: add the possibility to retrieve the list of `movies` from a category:

1. Add a `movies` field to the `Category` type
2. Implement the corresponding `resolver`
3. Test your solution through the playground


Cool! Now let's allow a user to get the `movies` from a specific `category`.

1. Change the `getMovies` Query field to accept an optional `category` string.
2. Adapt the `getMovies` resolver to only return `movies` from the specific `category` **only if the filter is present**. **HINT**: the `category` filter can be accessed through the resolver's `arg` parameter.
**HINT**: You can use the `getMoviesForCategory` within the `utils.js` file to help you. This function take the category name as parameter.
3. Test your implementation via the playground.

Okay, now let's add the possibility to add a vote for a movie. Since we're going to change our data, we will use this time a `Mutation`:

First, we need to define your `Mutation` type:

```graphql
type Mutation {
  addVote(movie_id: ID!): Movie!
}
```

The `addVote` mutation take a required `mutation_id` param and return a `Movie`.

Now, let's implement the resolver:

```javascript
Mutation: {
  addVote: (parent, args, ctx, info) => {
    // Try to figure out what to do here
  };
}
```

Don't forget to try this `Mutation` via the playground!

## 3. Still hungry ?

- Implement a `getMovie` query type that should return a movie based on its `id`

- Let's try to write a query that returns the list of `movies` and `categories`

- Try to create a `voteAdded` `Subscription` which will react when a vote is added to a movie. You can find some useful documentation here: https://www.apollographql.com/docs/apollo-server/features/subscriptions
