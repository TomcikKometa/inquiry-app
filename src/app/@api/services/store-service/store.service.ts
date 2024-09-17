import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private static readonly ACCESS_TOKEN = 'accessToken';
  private static readonly USER_ID = 'userId'
  
  public saveUserToken(token: string): void {
    window.sessionStorage.setItem(StoreService.ACCESS_TOKEN, token);
  }
  public getUserToken(): string | null {
    return window.sessionStorage.getItem(StoreService.ACCESS_TOKEN);
  }

  public saveUserId(id:number):void{
    return window.sessionStorage.setItem(StoreService.USER_ID,id.toString())
  }
}
