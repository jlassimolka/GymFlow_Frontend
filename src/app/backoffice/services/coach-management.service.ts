import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coach } from '../models/Coach';
import { Observable } from 'rxjs';
import { Reponse } from 'src/app/models/Reponse';
import { Gym } from '../models/Gym';

@Injectable({
  providedIn: 'root'
})
export class CoachManagementService {
  private baseUrl = 'http://localhost:3000' + '/api/coach'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  createCoach(coach: Coach): Observable<Reponse<Coach>> {
    return this.http.post<Reponse<Coach>>(this.baseUrl, coach);
  }

  getAllCoach(params: any): Observable<Reponse<Coach[]>> {
    console.log("params ", params);
    console.log('Update param ', this.queryParams(params));
    return this.http.get<Reponse<Coach[]>>(this.baseUrl, { params: this.queryParams(params) });
  }

  deleteCoachById(id: string): Observable<Reponse<any>> {
    return this.http.delete<Reponse<any>>(this.baseUrl + '/' + id);
  }


  getCoachById(id: string): Observable<Reponse<Coach>> {
    return this.http.get<Reponse<Coach>>(this.baseUrl + '/' + id);
  }

  updateCoach(id: string, coach: Coach): Observable<Reponse<Coach>> {
    return this.http.put<Reponse<Coach>>(this.baseUrl + '/' + id, coach);
  }

  getGyms(): Observable<Reponse<Gym[]>> {
    return this.http.get<Reponse<Gym[]>>('http://localhost:3000/api/gym');
  }
  getGymById(id: string): Observable<Reponse<Gym>> {
    return this.http.get<Reponse<Gym>>(`http://localhost:3000/api/gym/${id}`);
  }

  queryParams(queryParams: { [key: string]: any }): { [key: string]: any } {
    const filteredParams: { [key: string]: any } = {};

    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        const value = queryParams[key];
        // Filter out null, undefined, and empty strings
        if (value !== null && value !== undefined && value !== '') {
          filteredParams[key] = value;
        }
      }
    }

    return filteredParams;
  }
  uploadFile(id:String, file: File) {
    let resources =  'coach';
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`http://localhost:3000/api/${resources}/${id}/upload`, formData);
  
  }

}
