import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Pentflix';

  constructor(private _authService: AuthService) {
  }
  
  ngOnInit(): void {
    const authToken = this._authService.getRequestToken().subscribe((token) => {
      console.log('Auth token:', token);
    });

    this._authService.newGuestSession().subscribe((session) => {
      console.log('Guest session:', session);
    });
  }
}
