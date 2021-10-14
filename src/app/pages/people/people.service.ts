import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http:HttpClient) { }

  getPeople():Observable<any> {
    return this.http
      .get(`https://swapi.dev/api/people/`)
  }
}
