import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private guestSessionId: string | null = null;

  setGuestSessionId(guestSessionId: string) {
    this.guestSessionId = guestSessionId;
  }

  getGuestSessionId(): string | null {
    return this.guestSessionId;
  }
}
