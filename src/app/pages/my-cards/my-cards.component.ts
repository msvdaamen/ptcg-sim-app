import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Apollo, gql, QueryRef} from 'apollo-angular';
import {CardEntity, CardPaginationModel, PaginationModel, RarityEntity} from '../../graphql';
import {debounce, debounceTime, map, takeUntil} from 'rxjs/operators';
import {BehaviorSubject, fromEvent, Observable, Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';

const MY_CARDS = gql`
    query myCards($page: Float! $amount: Float! $rarity: Int $search: String) {
      myCards(pagination: {page: $page, amount: $amount} filter: {rarity: $rarity, name: $search}) {
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

const RARITY_QUERY = gql`
    query {
      rarities {
        id
        name
      }
    }
`;

@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.component.html',
  styleUrls: ['./my-cards.component.scss']
})
export class MyCardsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  rarities$: Observable<RarityEntity[]>;
  search$ = new Subject<string>();

  cards: CardEntity[];

  pagination: PaginationModel;
  page = 1;
  amount = 20;
  cardsQuery: QueryRef<{myCards: CardPaginationModel}>;
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

    this.cardsQuery = this.apollo.watchQuery<{myCards: CardPaginationModel}>({
      query: MY_CARDS,
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
      this.cards = data.myCards.cards;
      this.pagination = data.myCards.pagination;
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
      this.cardsQuery.fetchMore({
        variables: {
          page: this.page,
          amount: this.amount,
          rarity: this.rarity,
          search: this.searchValue
        },
      });
    }
  }

  selectChanged(value: number): void {
    this.rarity = value;
    this.page = 1;
    this.cardsQuery.refetch({
      page: this.page,
      rarity: value,
      search: this.searchValue,
      amount: this.amount
    });
  }

  searchQuery(search: string): void {
    this.searchValue = search;
    this.page = 1;
    this.cardsQuery.refetch({
      page: this.page,
      rarity: this.rarity,
      search: this.searchValue,
      amount: this.amount
    });
  }

  searchStart(value): void {
    this.search$.next(value);
  }

  trackByF(index: number, card: CardEntity): number {
    return card.id;
  }

}
