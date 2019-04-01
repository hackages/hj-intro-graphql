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

#### Create Movie type

Create a `Movie` type within the `gql` string literals:

```graphql
const typeDefs = gql`
  type Movie {
      // type definition
  }
`
```