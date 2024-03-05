import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountsKey, AccountsToken } from '../token-enums';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public saveUserToken(token: string): void {
    sessionStorage.clear();
    window.sessionStorage.setItem(AccountsKey.TOKEN_KEY, token);
  }

  public getUserToken(): string | null {
    return window.localStorage.getItem(AccountsKey.TOKEN_KEY);
  }

  public deleteUserToken(): void {
    window.localStorage.removeItem(AccountsKey.TOKEN_KEY);
  }

  public isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  public setLoggedIn(value: boolean): void {
    this._isLoggedIn.next(value);
  }
}
