
import { 
    ApolloClient, 
    ApolloLink,
    // createHttpLink,
    InMemoryCache,
    // withClientState,
    gql 
  } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { setContext } from 'apollo-link-context';
// import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from 'apollo-link-state';
import { CachePersistor } from 'apollo-cache-persist';
import { AsyncStorage } from 'react-native';
// import gql from 'graphql-tag';
import { READ_AUTH_INFO } from "./queries/queries";

const cache = new InMemoryCache();

export const persistor = new CachePersistor({
  cache,
  storage: AsyncStorage,
  debug: true,
})

const defaults = {
  userAuthInfo: {
    __typename: 'UserAuthInfo',
    id: null,
    token: null,
    email: null,
    firstName: null,
    lastName: null,
    profilePicture: null,
  }
}


const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      updateAuthInfo: (_, { userAuthInfo }, { cache }) => {
        cache.writeData({ data: { userAuthInfo } });
        return null;
      }
    },
    Query: {
      userAuthInfo: async (_,_args,{ cache }) => {
        const res = await cache.readQuery({ query: READ_AUTH_INFO })
        console.log(res)
        return res;
      }
    }
  },
  defaults
})
const httpLink = createHttpLink({
  uri: "https://kayrapid-backend.herokuapp.com"
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  const query = gql`
  query{
    userAuthInfo @client{
      id
      token
      email
      firstName
      lastName
      profilePicture
    }
  }
`
  let cacheRead = cache.readQuery({ query });
  let token = cacheRead["userAuthInfo"].token;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});


const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    stateLink,
    // httpLink
    authLink.concat(httpLink)
  ])
});

console.log(client)


export default client;