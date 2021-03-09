import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {CardEntity, CardPaginationModel, PaginationModel, RarityEntity} from '../../graphql';
import {Apollo, gql, QueryRef} from 'apollo-angular';
import {MatDialog} from '@angular/material/dialog';
import {debounceTime, map, takeUntil} from 'rxjs/operators';

const RARITY_QUERY = gql`
  query {
    rarities {
      id
      name
    }
  }
`;

const CARDS_QUERY = gql`
  query cards($page: Float! $amount: Float! $rarity: Int $search: String) {
    cardsPaginated(pagination: {page: $page, amount: $amount} filter: {rarity: $rarity, name: $search}) {
      cards {
        id
        name
        amount
        smallImage {
          url
        }
      }
      pagination {
        count
        currentPage
        perPage
        total
        totalPages
      }
    }
  }
`;

@Component({
  selector: 'app-card-overview',
  templateUrl: './card-overview.component.html',
  styleUrls: ['./card-overview.component.scss']
})
export class CardOverviewComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  rarities$: Observable<RarityEntity[]>;
  search$ = new Subject<string>();

  cards: CardEntity[];

  pagination: PaginationModel;
  page = 1;
  amount = 20;
  cardsQuery: QueryRef<{cardsPaginated: CardPaginationModel}>;
  rarity: number;
  searchValue: string;
  rarity$ = new BehaviorSubject(null);

  constructor(
    private apollo: Apollo,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.rarities$ = this.apollo.query<{rarities: RarityEntity[]}>({
      query: RARITY_QUERY
    }).pipe(map(({data}) => data.rarities));

    this.cardsQuery = this.apollo.watchQuery<{cardsPaginated: CardPaginationModel}>({
      query: CARDS_QUERY,
      variables: {
        page: this.page,
        amount: this.amount,
        rarity: this.rarity,
        search: this.searchValue
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first'
    });
    this.cardsQuery.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(({data}) => {
      this.cards = data.cardsPaginated.cards;
      this.pagination = data.cardsPaginated.pagination;
    });

    this.search$.pipe(
      takeUntil(this.destroy$),
      debounceTime(500)
    ).subscribe(search => {
      this.searchQuery(search);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  async viewCard(cardId: number): Promise<void> {
    const {CardInfoModalComponent} = await import('../../components/modals/card-info-modal/card-info-modal.component');
    const dialogRef = this.dialog.open(CardInfoModalComponent, {
      height: 'calc(100% - 50px)',
      width: '70%',
      data: {
        cardId
      }
    });
  }

  loadMore(): void {
    if (this.pagination.totalPages > this.page) {
      this.page++;
      this.fetchMore();
    }
  }

  fetchMore(): void {
    this.cardsQuery.fetchMore({
      variables: {
        page: this.page,
        amount: this.amount,
        rarity: this.rarity,
        search: this.searchValue
      },
    });
  }

  selectChanged(value: number): void {
    this.rarity = value;
    this.page = 1;
    this.fetchMore();
  }

  searchQuery(search: string): void {
    this.searchValue = search;
    this.page = 1;
    this.fetchMore();
  }

  searchStart(value): void {
    this.search$.next(value);
  }
}
