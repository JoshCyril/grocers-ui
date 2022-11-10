import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();
  // … 
  loginUser(correctID: boolean) {
    if (correctID) {
      this.fireIsLoggedIn.emit(true);
    } else {
      this.fireIsLoggedIn.emit(false);
    }
  }

  getEmitter() {
    return this.fireIsLoggedIn;
  }
}
