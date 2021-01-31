import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {UserEntity} from '../../graphql';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const ME_QUERY = gql`
    query {
      me {
        id
        email
        balance
      }
    }
`;

const BALANCE_CHANGED_SUBSCRIPTION = gql`
    subscription {
        balanceChanged
    }
`;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user$: Observable<UserEntity>;
  balanceAdded: number;

  constructor(
    private readonly apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.user$ = this.apollo.watchQuery<{me: UserEntity}>({
      query: ME_QUERY,
      fetchPolicy: 'cache-only'
    }).valueChanges.pipe(map(({data}) => data.me));

    this.apollo.subscribe<{balanceChanged: number}>({
      query: BALANCE_CHANGED_SUBSCRIPTION
    }).subscribe(response => {
      const newBalance = response.data.balanceChanged;
      const result = this.apollo.client.readQuery({
        query: ME_QUERY
      });
      this.balanceAdded = newBalance - result.me.balance;
      const cache = this.apollo.client.cache;
      cache.modify({
        id: cache.identify(result.me),
        fields: {
          balance: (currentBalance) => {
            return newBalance;
          }
        }
      });
    });
  }

}
