import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from './interfaces';



const url = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})


export class APIClientService {

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<string> {
    const response = this.http.post<string>(url, user, {
      withCredentials: true,
    }).pipe(
      catchError(this.handleError)
    );

    return response;
  }


}