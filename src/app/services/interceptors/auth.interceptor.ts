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
    let accessToken = 'no token';
    if (localStorage.getItem('accessToken')) {
      accessToken = localStorage.getItem('accessToken');
    }
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
