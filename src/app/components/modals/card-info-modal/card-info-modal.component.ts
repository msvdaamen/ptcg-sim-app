import {Component, Inject, Input, NgModule, OnInit} from '@angular/core';
import {CardEntity} from '../../../graphql';
import {Observable} from 'rxjs';
import {Apollo, gql} from 'apollo-angular';
import {map} from 'rxjs/operators';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';

const CARD_QUERY = gql`
    query card($id: Int!) {
        card(id: $id) {
          id
          name
          amount
          price
          largeImage {
            url
          }
          rarity {
            name
          }
        }
    }
`;

const QUICK_SELL = gql`
    mutation sell($cardId: Int! $amount: Int!) {
      quickSellCard(cardInfo: {cardId: $cardId amount:  $amount}) {
        id
        name
        amount
      }
    }
`;

@Component({
  selector: 'app-card-info-modal',
  templateUrl: './card-info-modal.component.html',
  styleUrls: ['./card-info-modal.component.scss']
})
export class CardInfoModalComponent implements OnInit {

  card$: Observable<CardEntity>;
  imageLoaded: boolean;

  constructor(
    private apollo: Apollo,
    @Inject(MAT_DIALOG_DATA) public data: {cardId: number},
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CardInfoModalComponent>
  ) { }

  ngOnInit(): void {
    this.card$ = this.apollo.watchQuery<{card: CardEntity}>({
      query: CARD_QUERY,
      variables: {
        id: this.data.cardId
      }
    }).valueChanges.pipe(map(({data}) => data.card));
  }

  showInfo(): void {
    this.imageLoaded = true;
  }

  async sell(cardId: number): Promise<any> {
    const {SellCardModalComponent} = await import('../sell-card-modal/sell-card-modal.component');
    const dialogRef = this.dialog.open(SellCardModalComponent, {
      data: {
        cardId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close();
      }
    });
  }

  quickSell(cardId: number, amount: number): void {
    this.apollo.mutate<{quickSellCard: CardEntity}>({
      mutation: QUICK_SELL,
      variables: {
        cardId,
        amount
      },
      update: (cache, mutationResult) => {
        const soldCard = mutationResult.data.quickSellCard;
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
    }).subscribe(({data}) => {
      const card = data.quickSellCard;
      if (card.amount === 0) {
        this.dialogRef.close();
      }
    });
  }
}

@NgModule({
  declarations: [
    CardInfoModalComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
class m {}
