import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {RarityEntity} from '../../graphql';
import {Apollo, gql} from 'apollo-angular';
import {map} from 'rxjs/operators';

const RARITY_QUERY = gql`
    query {
      rarities {
        id
        name
        cardsOwned
        totalCards
      }
    }
`;

@Component({
  selector: 'app-rarity-overview',
  templateUrl: './rarity-overview.component.html',
  styleUrls: ['./rarity-overview.component.scss']
})
export class RarityOverviewComponent implements OnInit {

  rarities$: Observable<RarityEntity[]>;

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.rarities$ = this.apollo.watchQuery<{rarities: RarityEntity[]}>({
      query: RARITY_QUERY
    }).valueChanges.pipe(
      map(({data}) => data.rarities)
    );
  }

  getPercentage(amount: number, total: number) {
    return Math.ceil((100 / total) * amount);
  }

}
