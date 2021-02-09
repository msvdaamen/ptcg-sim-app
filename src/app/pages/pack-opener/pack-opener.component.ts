import {Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {CardEntity} from '../../graphql';
import {animate, state, style, transition, trigger} from '@angular/animations';

const OPEN_PACK_MUTATION = gql`
    mutation {
        openPack {
          id
          name
          amount
          rarityId
          smallImage {
            url
          }
        }
    }
`;

@Component({
  selector: 'app-pack-opener',
  templateUrl: './pack-opener.component.html',
  styleUrls: ['./pack-opener.component.scss'],
  animations: [
    trigger('viewCardAnimation', [
      state('hidden', style({
        opacity: 0
      })),
      state('open', style({
        opacity: 1
      })),
      state('hide', style({
        top: '-100%',
        // opacity: 0.5
      })),
      transition('hidden => open', [
        animate('500ms')
      ]),
      transition('open => hide', [
        animate('500ms')
      ])
    ])
  ]
})
export class PackOpenerComponent implements OnInit {

  @ViewChild('packOpenContainer', {static: false})
  packOpenContainer: ElementRef<HTMLDivElement>;

  isOpeningPack: boolean;
  packOverview: boolean;
  packCards: CardEntity[];
  cards: CardEntity[];
  index: number = null;

  constructor(
    private apollo: Apollo,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }

  @HostListener('window:keyup.space')
  spacePresses(): void {
    if (this.isOpeningPack) {
      this.viewNextCardStart(0);
    } else if (this.packOverview) {
      this.openPack();
    }
  }

  openPack(): void {
    this.apollo.mutate<{openPack: CardEntity[]}>({
      mutation: OPEN_PACK_MUTATION
    }).subscribe(({data}) => {
      const cards = data.openPack;
      this.isOpeningPack = true;
      this.packOverview = false;
      this.packCards = cards;
      this.cards = cards;
    });
  }

  viewNextCardStart(index: number): void {
    if (this.index === null) {
      this.index = index;
      const secondChild = this.packOpenContainer.nativeElement.querySelector('.card:nth-child(2)');
      if (secondChild) {
        this.renderer.addClass(secondChild, 'is-next-card');
      }
    }
    // setTimeout(() => {
    //   this.viewNextCard();
    //   this.index = null;
    // }, 2000);
  }

  viewNextCard($event: AnimationEvent): void {
    // @ts-ignore
    if ($event.toState === 'hide') {
      this.index = null;
      this.packCards = this.packCards.slice(1);
      if (!this.packCards.length) {
        this.isOpeningPack = false;
        this.packOverview = true;
      }
    }
  }

  getAnimationState(index: number): string {
    if (this.index === index) {
      return 'hide';
    } else if (this.index !== null && index === 1) {
      return 'open';
    } else if (index === 0) {
      return 'open';
    }
    return 'hidden';
  }

}
