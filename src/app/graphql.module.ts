import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {CardPaginationModel} from './graphql';

const uri = 'http://localhost:3005/graphql'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
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
                console.log(reset);
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
