import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

const MY_CARDS = gql`
    query {
      myCards {
        id
        imageHRes {
          url
        }
      }
    }
`;

@Component({
  selector: 'app-my-cards',
  templateUrl: './my-cards.component.html',
  styleUrls: ['./my-cards.component.scss']
})
export class MyCardsComponent implements OnInit {

  constructor(
    private apollo: Apollo
  ) { }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: MY_CARDS
    }).valueChanges.subscribe(({data}) => {
      console.log(data);
    });
  }

}
