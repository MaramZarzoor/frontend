import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {Router} from '@angular/router';
import {PagesState} from "../pages/state/pages.state";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private store: Store,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.store.selectSnapshot(PagesState.token);
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {

      }
    }, (err: any) => {
      if (err.status === 401) {
        this.router.navigate(['pages/auth']);
      }
    }));
  }
}



