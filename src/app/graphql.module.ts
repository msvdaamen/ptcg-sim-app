import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, split} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {CardPaginationModel} from './graphql';
import {WebSocketLink} from '@apollo/client/link/ws';
import {getMainDefinition} from '@apollo/client/utilities';
import {OperationDefinitionNode} from 'graphql';
import {environment} from '../environments/environment';

const uri = environment.apiUrl; // <-- add the URL of the GraphQL server here
const wsUri = environment.socketUrl; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const ws = new WebSocketLink({
    uri: wsUri,
    options: {
      reconnect: true,
      connectionParams: {
        authorization: 'Bearer ' + localStorage.getItem('accessToken')
      }
    },
  });
  const http = httpLink.create({uri});

  const link = split(
    // split based on operation type
    ({query}) => {
      const {kind, operation} = getMainDefinition(query) as OperationDefinitionNode;
      return (
        kind === 'OperationDefinition' && operation === 'subscription'
      );
    },
    ws,
    http,
  );

  return {
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            myCards: {
              keyArgs: false,
              merge(existing = {cards: []}, incoming, {variables: {reset}}): CardPaginationModel {
                if (reset) {
                  return incoming;
                } else {
                  const cards = [...existing.cards, ...incoming.cards];
                  const values = {
                    cards,
                    pagination: incoming.pagination
                  };
                  return values;
                }
              }
            },
            cardsPaginated: {
              keyArgs: false,
              merge(existing = {cards: []}, incoming, {variables: {reset}}): CardPaginationModel {
                if (reset) {
                  return incoming;
                } else {
                  const cards = [...existing.cards, ...incoming.cards];
                  const values = {
                    cards,
                    pagination: incoming.pagination
                  };
                  return values;
                }
              }
            }
          }
        }
      }
    }),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
