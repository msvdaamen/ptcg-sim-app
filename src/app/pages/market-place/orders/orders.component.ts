import {Component, OnDestroy, OnInit} from '@angular/core';
import {Apollo, gql, QueryRef} from 'apollo-angular';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {CardPaginationModel, OrderEntity, PaginationModel} from '../../../graphql';
import {filter, map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {IPageInfo} from 'ngx-virtual-scroller';

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
        },
        pagination {
          total
          currentPage
          count
          perPage
          totalPages
        }
      }
    }
`;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']

})
export class OrdersComponent implements OnInit, OnDestroy {

  orders: OrderEntity[] = [];
  pagination: PaginationModel = {
    currentPage: 1,
    count: 0,
    total: 0,
    totalPages: 1,
    perPage: 15
  };
  loading: boolean;
  ordersQuery: QueryRef<{orders: {orders: OrderEntity[], pagination: PaginationModel}}>;


  destroy$ = new Subject();

  constructor(
    private apollo: Apollo,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.ordersQuery = this.apollo.watchQuery<{orders: {orders: OrderEntity[], pagination: PaginationModel}}>({
      query: ORDERS_QUERY,
      variables: {
        page: this.pagination.currentPage,
        amount: this.pagination.perPage
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first'
    });
    this.ordersQuery.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(({data}) => {
      const pagination = data.orders.pagination;
      const orders = data.orders.orders;
      this.pagination = pagination;
      this.orders = orders;
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  nextPage(): void {
    if (this.pagination.currentPage < this.pagination.totalPages && !this.loading) {
      this.loading = true;
      this.pagination = {...this.pagination, currentPage: this.pagination.currentPage + 1};
      this.ordersQuery.fetchMore({
        variables: {
          page: this.pagination.currentPage,
          amount: this.pagination.perPage
        }
      }).then(() => this.loading = false)
        .catch(() => this.loading = false);
    }
  }

  async buyOrder(order: OrderEntity): Promise<any> {
    const {BuyOrderModalComponent} = await import('../../../components/modals/buy-order-modal/buy-order-modal.component');
    const dialogRef = this.dialog.open(BuyOrderModalComponent, {
      data: {
        order
      }
    });
  }

}
