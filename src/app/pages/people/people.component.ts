import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PeopleService } from './people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription;
  @Input() data = {
    results: []
  }

  constructor(public pplSvc: PeopleService) { }

  ngOnInit(): void {
    this.getPeople()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getPeople() {
    return this.subscription.add(
      this.pplSvc.getPeople().subscribe( res => {
        if (res) {
          this.data = res
        }
      }) 
    )
  }

}
