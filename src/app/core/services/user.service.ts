import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.api_url;

  constructor(private http: HttpClient) {}

  getUser(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }

  getUserGames(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}/games`);
  }
}
