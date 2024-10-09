import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseUser } from '../token-enums';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private readonly _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private readonly _isCenterView: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public saveUserToken(token: string): void {
    sessionStorage.clear();
    window.sessionStorage.setItem(ResponseUser.TOKEN_KEY, token);
    console.log(window.sessionStorage.getItem(ResponseUser.TOKEN_KEY));
    
  }

  public getUserToken(): string | null {
    return window.sessionStorage.getItem(ResponseUser.TOKEN_KEY);
  }

  public deleteUserToken(): void {
    window.localStorage.removeItem(ResponseUser.TOKEN_KEY);
  }

  public isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  public isCenterView$():Observable<boolean>{
    return this._isCenterView.asObservable()
  }

  public setLoggedIn(value: boolean): void {
    this._isLoggedIn.next(value);
  }

  public setCenterView(value: boolean): void {
    this._isCenterView.next(value);
  }

  public saveUserId(id:number):void{
    return window.sessionStorage.setItem(ResponseUser.USER_ID,id.toString())
  }
}
