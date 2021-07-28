import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

//The JWT Interceptor intercepts http requests from the application to add a JWT auth token to the Authorization header if the user is logged in.
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `${currentUser}`
        }
      });
    }
    return next.handle(request);
  }
}
