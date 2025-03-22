import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SessionService } from './services/session.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Pentflix';

  private _subs = new Subscription();

  constructor(
    private _authService: AuthService,
    private _sessionService: SessionService,
  ) {}

  ngOnInit(): void {
    this._subs.add(this._authService.newGuestSession().subscribe((guestSessionId) => {
      this._sessionService.setGuestSessionId(guestSessionId);
    }));
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }
}
