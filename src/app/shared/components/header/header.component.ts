import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription;
  isAdmin = false;
  isLogged = false;
  @Output() toggleSidenav = new EventEmitter<void>();
  
  constructor(private authSvc:AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscription.add(
      this.authSvc.isLogged.subscribe((res) => (this.isLogged = res))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onToggleSidenav(){
    this.toggleSidenav.emit();
  }

  onLogout(): void {
    this.authSvc.logout();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent);
  }
}
