import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {OrderEntity} from '../../../graphql';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';

const ORDERS_QUERY = gql`
    query ordersQuery($page: Float! $amount: Float!) {
      orders(pagination: {page: $page, amount: $amount}) {
        orders {
          id
          price
          createdAt
          card {
            id
            name
            smallImage {
              url
            }
          }
        }
      }
    }
`;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders$: Observable<OrderEntity[]>;

  constructor(
    private apollo: Apollo,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.orders$ = this.apollo.watchQuery<{orders: {orders: OrderEntity[]}}>({
      query: ORDERS_QUERY,
      fetchPolicy: 'cache-and-network',
      variables: {
        page: 1,
        amount: 20
      }
    }).valueChanges.pipe(
      map(({data}) => data.orders.orders)
    );
  }

  async buyOrder(order: OrderEntity): Promise<any> {
    const {BuyOrderModalComponent} = await import('../../../components/modals/buy-order-modal/buy-order-modal.component');
    this.dialog.open(BuyOrderModalComponent, {
      data: {
        order
      }
    });
  }

}
