import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Apollo, gql} from 'apollo-angular';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ptcg-sim-app';

  destroy$ = new Subject();
  isAuthenticated: boolean;

  constructor(
    private readonly apollo: Apollo
  ) {
  }

  ngOnInit(): void {
    this.apollo.watchQuery<{accessToken: string}>({
      query: gql`
        query accessToken {
          accessToken @client
        }
      `
    }).valueChanges.pipe(takeUntil(this.destroy$)).subscribe(({data}) => {
      if (data.accessToken) {
        this.isAuthenticated = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next('true');
  }


}
