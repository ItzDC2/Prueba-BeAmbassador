import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { application } from 'express';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiceRequest {
  
  private endpoint = 'https://api.be-ambassador.com/api/developers/test';
  private appKey = "73e162fb-0d71-4225-b039-9baa8a0308e4";

  constructor(private http: HttpClient) {}

  sendRequest(obj: Object): Observable<any> {
    return this.http.post(this.endpoint, obj, {
      headers: {
        'ApiKey': this.generateApiKey(),
        'AppKey': this.appKey 
      }
    });
  }

  private generateApiKey(): string {
    return Math.random().toString(36).substring(2, 15) + 
          Math.random().toString(36).substring(2, 15);
  }

}
