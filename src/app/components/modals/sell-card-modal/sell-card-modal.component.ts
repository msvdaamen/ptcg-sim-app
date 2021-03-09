import {Component, Inject, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Apollo, gql} from 'apollo-angular';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {CardEntity} from '../../../graphql';

const PLACE_ORDER_MUTATION = gql`
  mutation order($cardId: Int! $price: Float!) {
    createOrder(order: {cardId: $cardId price: $price}) {
      id
      amount
    }
  }
`;

@Component({
  selector: 'app-sell-card-modal',
  templateUrl: './sell-card-modal.component.html',
  styleUrls: ['./sell-card-modal.component.scss']
})
export class SellCardModalComponent implements OnInit {

  price: number;

  constructor(
    private apollo: Apollo,
    @Inject(MAT_DIALOG_DATA) public data: {cardId: number},
    public dialogRef: MatDialogRef<SellCardModalComponent>
  ) { }

  ngOnInit(): void {
  }

  sell(): void {
    this.apollo.mutate<{createOrder: CardEntity}>({
      mutation: PLACE_ORDER_MUTATION,
      variables: {
        cardId: this.data.cardId,
        price: this.price
      },
      update: (cache, mutationResult) => {
        const soldCard = mutationResult.data.createOrder;
        if (soldCard.amount === 0) {
          cache.modify({
            fields: {
              myCards: (value, {readField}) => {
                return {
                  cards: value.cards.filter(card => soldCard.id !== readField('id', card)),
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
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  declarations: [
    SellCardModalComponent
  ]
})
class m {}
