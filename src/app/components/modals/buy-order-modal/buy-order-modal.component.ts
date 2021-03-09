import {Component, Inject, NgModule, OnDestroy, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {OrderEntity, UserEntity} from '../../../graphql';

const ME_QUERY = gql`
    query  {
      me {
        id
        balance
      }
    }
`;

const BUY_ORDER_MUTATION = gql`
mutation buy($orderId: Int!) {
  buyOrder(orderId: $orderId)
}
`;

@Component({
  selector: 'app-buy-order-modal',
  templateUrl: './buy-order-modal.component.html',
  styleUrls: ['./buy-order-modal.component.scss']
})
export class BuyOrderModalComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();

  balance = 0;

  constructor(
    private apollo: Apollo,
    @Inject(MAT_DIALOG_DATA) public data: {order: OrderEntity},
    public dialogRef: MatDialogRef<BuyOrderModalComponent>
  ) { }

  ngOnInit(): void {
    this.apollo.watchQuery<{me: UserEntity}>({
      query: ME_QUERY
    }).valueChanges.pipe(takeUntil(this.destroy$)).subscribe(({data}) => {
      const user = data.me;
      if (user) {
        this.balance = user.balance;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  buy(): void {
    this.apollo.mutate<{buyOrder: boolean}>({
      mutation: BUY_ORDER_MUTATION,
      variables: {
        orderId: this.data.order.id
      },
      update: (cache, mutationResult) => {
        if (mutationResult.data.buyOrder) {
          cache.modify({
            fields: {
              orders: (value, {readField}) => {
                return {
                  orders: value.orders.filter(order => this.data.order.id !== readField('id', order)),
                  pagination: value.pagination
                };
              }
            }
          });
        }
      }
    }).subscribe(response => {
      this.dialogRef.close(true);
    });
  }

}
@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    BuyOrderModalComponent
  ]
})
class m {};
