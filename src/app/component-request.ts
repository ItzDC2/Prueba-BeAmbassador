// import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ComponentRequest {
  
  private endpoint = 'https://api.be-ambassador.com/api/developers/test';
  private appKey = "73e162fb-0d71-4225-b039-9baa8a0308e4";

  constructor(private http: HttpClient) {}

  sendRequest(obj: Object): Observable<any> {
    return this.http.post(this.endpoint, obj, {
      headers: {
        'ApiKey': this.generateApiKey(),
        'AppKey': this.appKey 
      }
    }).pipe(tap(res => {
      JSON.stringify(res);
      console.log(res);
    }));
  }

  private generateApiKey(): string {
    return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.floor(Math.random() * 16);
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

}
