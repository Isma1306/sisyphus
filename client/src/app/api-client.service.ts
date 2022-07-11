import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User, Routine, ApiResponseRoutine, ApiResponseUser, ApiResponseRoutines, ExerciseSets } from './interfaces';



const url = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})


export class APIClientService {

  constructor(private http: HttpClient) { }
  // user handling requests
  createUser(user: User): Observable<User> {
    return this.http.post<ApiResponseUser>(url, user, {
      withCredentials: true,
    }).pipe(map(response => {
      return response.data;
    }));
  }

  getUser(): Observable<User> {
    return this.http.get<ApiResponseUser>(`${url}/login`, {
      withCredentials: true,
    }).pipe(map(response => {
      return response.data;
    }));
  }

  loginUser(user: User): Observable<User> {
    return this.http.post<ApiResponseUser>(`${url}/login`, user, {
      withCredentials: true,
    }).pipe(map(response => {
      return response.data;
    }));
  }
  logoutUser(): Observable<User> {
    return this.http.post<ApiResponseUser>(`${url}/logout`, 'logout', {
      withCredentials: true,
    }).pipe(map(response => {
      return response.data;
    }));
  }
  // Exercise handling requests
  SaveExer(routine: ExerciseSets) {
    return this.http.post<ExerciseSets>(`${url}/routine`, routine, {
      withCredentials: true,
    }).pipe(map(response => {
      return response;
    }));
  }

  SaveRoutine(routine: Routine) {
    return this.http.post<ApiResponseRoutine>(`${url}/routine`, routine, {
      withCredentials: true,
    }).pipe(map(response => {
      return response.data;
    }));
  }
  selectRoutine(routines: Routine[]) {
    return this.http.put<ApiResponseRoutines>(`${url}/routine`, routines, {
      withCredentials: true,
    }).pipe(map(response => {
      return response.data;
    }));
  }
  deleteRoutine(routine: Routine) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true,
      body: {
        id: routine.id
      },
    };
    return this.http.delete<ApiResponseRoutine>(`${url}/routine`, options).pipe(map(response => {
      return response.data;
    }));
  }

}

