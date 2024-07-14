import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public getRandomQuote(): Observable<any> {
    return this.http.get(`https://api.quotable.io/random`);
  }
}
