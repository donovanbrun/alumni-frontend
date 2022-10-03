import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AddPromoService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}

  public send(body : any) : Observable<any>{
    return this.http.post("http://localhost:8000/upload/", body);
  }
}
