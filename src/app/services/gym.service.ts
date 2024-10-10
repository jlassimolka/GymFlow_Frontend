import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GymService {

  private apiUrl = 'http://localhost:3000/api'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getGyms(page: number,size:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/gym`,{params : {page,size}});
  }

  addGym(gym:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/gym`,gym);
  }

}
