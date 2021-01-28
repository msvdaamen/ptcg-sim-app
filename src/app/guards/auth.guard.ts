import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Apollo, gql} from 'apollo-angular';
import {catchError, map} from 'rxjs/operators';
import {AuthUser} from '../graphql';
import {of} from 'rxjs';

const ME_QUERY = gql`
  query {
    me {
      id
      email
    }
  }
`;


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private apollo: Apollo
  ) {
  }

  // @ts-ignore
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const cache = this.apollo.client.cache.readQuery<{accessToken: string}>({
      query: gql`
        query accessToken {
          accessToken @client
        }
      `
    });
    if (cache?.accessToken) {
      return true;
    }
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // @ts-ignore
      return this.apollo.query<{me: AuthUser}>({
        query: ME_QUERY,
      }).pipe(
        map(({data}) => {
          if (!data?.me) {
            return this.router.parseUrl('/auth/login');
          }
          this.apollo.client.cache.writeQuery({
            query: gql`
              query accessToken {
                accessToken @client
              }
            `,
            data: {
              accessToken
            }
          });
          this.router.navigate([state.url.split('?')[0]], {queryParams: route.queryParams});
          return true;
        }),
        catchError(() => of(this.router.parseUrl('/auth/login')))
      );
    }
    return this.router.parseUrl('/auth/login');
  }

}
