import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
  isloggedIn(){
    if(localStorage.getItem('token')){
      return true;
    }
    else{
      return false;
    }
  }
  setLoggedIn(value: boolean): void {
    this.loggedIn.emit(value);
  }
}
