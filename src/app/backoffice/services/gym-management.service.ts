import { Injectable } from '@angular/core';
import { Gym } from '../models/Gym';
import { Reponse } from 'src/app/models/Reponse';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { Coach } from '../models/Coach';
import { Adherent } from '../models/Adherent';

@Injectable({
  providedIn: 'root'
})
export class GymManagementService {

  private baseUrl = 'http://localhost:3000'+'/api/gym'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  createGyms(gym: Gym) : Observable<Reponse<Gym>>{
    return this.http.post<Reponse<Gym>>(this.baseUrl, gym);
  }

  getAllGyms(params:any) : Observable<Reponse<Gym[]>>{
    return this.http.get<Reponse<Gym[]>>(this.baseUrl,{params});
  }

  deleteGymById(id: string): Observable<Reponse<any>> {
    return this.http.delete<Reponse<any>>(this.baseUrl + '/' + id);
  }

  getGymById(id:string): Observable<Reponse<Gym>> {
    return this.http.get<Reponse<Gym>>(this.baseUrl + '/' + id);
  }

  updateGym(id: string, gym: Gym) : Observable<Reponse<Gym>>{
    return this.http.put<Reponse<Gym>>(this.baseUrl+ '/'+ id ,gym);
  }

  getCoach(params:any): Observable<Reponse<Coach[]>> {
    return this.http.get<Reponse<Coach[]>>('http://localhost:3000/api/coach',{params});
  }
  
  getCoachById(id: string): Observable<Reponse<Coach>> {
    return this.http.get<Reponse<Coach>>(`http://localhost:3000/api/coach/${id}`);
  }
  getAdherent(): Observable<Reponse<Adherent[]>> {

    
    return this.http.get<Reponse<Adherent[]>>('http://localhost:3000/api/adherent');
  }
  
  getAdherentById(id: string): Observable<Reponse<Adherent>> {
    return this.http.get<Reponse<Adherent>>(`http://localhost:3000/api/adherent/${id}`);
  }


  uploadFile(id:String, file: File) {
    let resources =  'gym';
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`http://localhost:3000/api/${resources}/${id}/upload`, formData);
  
  }
}
