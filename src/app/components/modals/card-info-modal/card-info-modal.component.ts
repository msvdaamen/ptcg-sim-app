import {Component, Inject, Input, NgModule, OnInit} from '@angular/core';
import {CardEntity} from '../../../graphql';
import {Observable} from 'rxjs';
import {Apollo, gql} from 'apollo-angular';
import {map} from 'rxjs/operators';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const CARD_QUERY = gql`
    query card($id: Int!) {
        card(id: $id) {
          id
          name
          amount
          imageHRes {
            url
          }
          rarity {
            name
          }
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
    @Inject(MAT_DIALOG_DATA) public data: {cardId: number}
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
}

@NgModule({
  declarations: [
    CardInfoModalComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
class m {}
