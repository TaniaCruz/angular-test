import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  constructor(private http:HttpClient) { }

  getComics():Observable<any> {
    return this.http
      .get(`https://developer.marvel.com/v1/public/comics?apikey=${environment.MARVEL_API_KEY}`)
  }
}
