import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { application } from 'express';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiceRequest {
  
  private endpoint = 'https://api.be-ambassador.com/api/developers/test';
  private appKey = '73e162fb-0d71-4225-b039-9baa8a0308e4';
  private apiKey = '9197078a-bb00-4429-a655-b574b61a5038';

  constructor(private http: HttpClient) {}

  sendRequest(obj: Object): Observable<any> {
    return this.http.post(this.endpoint, obj, {
      headers: {
        'ApiKey': this.apiKey,
        'AppKey': this.appKey 
      }
    });
  }

}
