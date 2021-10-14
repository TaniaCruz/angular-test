import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StarwarsService {

  constructor(private http:HttpClient) { }

  getFilms():Observable<any> {
    return this.http
      .get(`https://swapi.dev/api/films/`)
  }
}
