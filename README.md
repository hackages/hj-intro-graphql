# HackJam Intro GraphQL

## 1. Your first queries

Go to the GitHub GraphQL API Explorer: https://developer.github.com/v4/explorer/

With the help of the documention that you can toggle on the right upper side of the `GraphiQL` explorer, try to write:

1. A query to get the following information from the `Hackages` organization:

   - Email
   - Total number of repositories

2. Get the `id` of this repository
3. Try to give a star to this reposiroty. **HINT**: you will need to use a `mutation` and the `id` of the repository (that you should have by now)

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

If everything is working correctly, you should be able to execute à `hello` query:

```graphql
query helloWorld {
  hello
}
```

### Implement your own API

Create a `Movie` type within the `gql` string literals:

```javascript
const typeDefs = gql`
  type Movie {
      // type definition
  }
`;
```

Now that we defined our `Movie` type, let's try to make a `getMovies` query.

Add a `getMovies` field under the `Query` type that should return an `array` of `Movie`. **HINT**: use the `hello` Query field as example.

```graphql
  type Query {
    getMovies: #return type
  }
```

It's time to implement the `getMovies` resolver now (the function which will be executed when we execute the `getMovies` query). Each resolvers has the following.

For now, this function should return en entire list of movies.

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
