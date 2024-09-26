import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseUser } from '../token-enums';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public saveUserToken(token: string): void {
    sessionStorage.clear();
    window.sessionStorage.setItem(ResponseUser.TOKEN_KEY, token);
  }

  public getUserToken(): string | null {
    return window.localStorage.getItem(ResponseUser.TOKEN_KEY);
  }

  public deleteUserToken(): void {
    window.localStorage.removeItem(ResponseUser.TOKEN_KEY);
  }

  public isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  public setLoggedIn(value: boolean): void {
    this._isLoggedIn.next(value);
  }
  
  public saveUserID(id: number): void {
    window.sessionStorage.setItem(ResponseUser.USER_ID, id.toString());
    console.log(window.sessionStorage.getItem(ResponseUser.USER_ID));
    console.log('id',id);
    
    
  }
}
