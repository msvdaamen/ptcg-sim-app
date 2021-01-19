import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Apollo, gql} from 'apollo-angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private apollo: Apollo
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cache = this.apollo.client.cache.readQuery<{accessToken: string}>({
      query: gql`
        query accessToken {
          accessToken @client
        }
      `
    });
    const accessToken = cache?.accessToken ?? null;
    if (accessToken) {
      const newReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return next.handle(newReq);
    }
    return next.handle(req);
  }

}
