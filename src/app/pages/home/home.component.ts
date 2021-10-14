import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MarvelService } from './marvel.service';
import { StarwarsService } from './starwars.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription;
  @Input() data = {
    results: []
  };

  constructor(public authSvc: AuthService,
    public mvlSvc: MarvelService,
    public stwSvc: StarwarsService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 
  ngOnInit(): void {
    this.getMarvelComics()
  }

  getMarvelComics(): Subscription {
    return this.subscription.add(
      this.stwSvc.getFilms().subscribe( res => {
        if (res) {
          this.data = res
        }
      }) 
    )
  }

}
