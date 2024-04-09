import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, from, Observable, switchMap, throwError} from 'rxjs';
import { HandleErrorService } from './error-handling/service/handle-error.service';
import { CustomErrorResponse } from './error-handling/model/custom-error-response';
import {LoginService} from "../login/service/login.service";
import {RefreshTokenResponse} from "../login/model/refresh-token-response";
import {AuthenticationService} from "../core/authentication/service/authentication.service";
import {AuthorizationService} from "../core/authorization/service/authorization.service";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private toastrService: HandleErrorService,
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: req.headers.set(
        'Authorization',
        sessionStorage.getItem('token') ?? ``
      ),
      withCredentials: true
    });

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 403 && this.authenticationService.isLoggedIn()) {
          return this.refreshTokenMethod(req, next);
        }

        this.toastrService.handleError(error.error as CustomErrorResponse);
        return throwError('');
      })
    );
  }

  refreshTokenMethod(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return from(this.authenticationService.refreshToken()).pipe(
      switchMap((res: RefreshTokenResponse) => {
        if(sessionStorage.getItem('token')){
          sessionStorage.removeItem('token');
        }
        sessionStorage.setItem('token', res.renewedAccessToken);

        request = request.clone({
          headers: request.headers.set(
            'Authorization',
            sessionStorage.getItem('token') ?? ``
          )
        });

        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status == 403) {
              this.authenticationService.logout()
              this.authorizationService.logout();
              this.toastrService.handleInformative("Session expired");
            }

            this.toastrService.handleError(error.error as CustomErrorResponse);
            return throwError('');
          }))
      })
    );
  }

}
