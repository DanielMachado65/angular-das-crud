import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, from, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  BASE_URL = 'http://localhost:8080';
  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private readonly httpClient: HttpClient) {}

  protected get<T>(url: string): Observable<T | null> {
    return this.httpClient.get<T>(this.BASE_URL + url, this.httpOptions).pipe(
      map((response: HttpResponse<T>) => {
        if (response.status != 200) return null;
        else return response.body;
      }),
      catchError((e) => {
        if (e.status == 404) return of(null);
        else return throwError(() => e);
      })
    );
  }

  protected post<T>(url: string, body: any): Observable<T | null> {
    return this.httpClient
      .post<T>(this.BASE_URL + url, body, this.httpOptions)
      .pipe(
        map((response: HttpResponse<T>) => {
          if (response.status != 201) return null;
          else return response.body;
        }),
        catchError((error) => {
          if (error.status == 404) return of(null);
          else return throwError(() => error);
        })
      );
  }

  protected put<T>(url: string, body: any): Observable<T | null> {
    return this.httpClient
      .put<T>(this.BASE_URL + url, body, this.httpOptions)
      .pipe(
        map((response: HttpResponse<T>) => {
          if (response.status != 200) return null;
          else return response.body;
        }),
        catchError((error) => {
          if (error.status == 404) return of(null);
          else return throwError(() => error);
        })
      );
  }

  protected delete<T>(url: string): Observable<T | null> {
    return this.httpClient
      .delete<T>(this.BASE_URL + url, this.httpOptions)
      .pipe(
        map((response: HttpResponse<T>) => {
          if (response.status != 200) return null;
          else return response.body;
        }),
        catchError((error) => {
          if (error.status == 404) return of(null);
          else return throwError(() => error);
        })
      );
  }
}
