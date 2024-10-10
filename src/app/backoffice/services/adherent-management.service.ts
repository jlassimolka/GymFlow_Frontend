import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Adherent } from '../models/Adherent';
import { Observable } from 'rxjs';
import { Reponse } from 'src/app/models/Reponse';
import { Gym } from '../models/Gym';
import { Coach } from '../models/Coach';

@Injectable({
  providedIn: 'root'
})
export class AdherentManagementService {

  private baseUrl = 'http://localhost:3000'+'/api/adherent'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  createAdherent(adherent: Adherent) : Observable<Reponse<Adherent>>{
    return this.http.post<Reponse<Adherent>>(this.baseUrl, adherent);
  }

  getAllAdherent(params:any) : Observable<Reponse<Adherent[]>>{
    return this.http.get<Reponse<Adherent[]>>(this.baseUrl,{params});
  }

  deleteAdherentById(id: string): Observable<Reponse<any>> {
    return this.http.delete<Reponse<any>>(this.baseUrl + '/' + id);
  }


  getAdherentById(id:string): Observable<Reponse<Adherent>> {
    return this.http.get<Reponse<Adherent>>(this.baseUrl + '/' + id);
  }

  updateAdherent(id: string, adherent:Adherent) : Observable<Reponse<Adherent>>{
    return this.http.put<Reponse<Adherent>>(this.baseUrl+ '/'+ id ,adherent);

}
getGyms(): Observable<Reponse<Gym[]>> {
  return this.http.get<Reponse<Gym[]>>('http://localhost:3000/api/gym');
}
getGymById(id: string): Observable<Reponse<Gym>> {
  return this.http.get<Reponse<Gym>>(`http://localhost:3000/api/gym/${id}`);
}

getCoach(): Observable<Reponse<Coach[]>> {
  return this.http.get<Reponse<Coach[]>>('http://localhost:3000/api/coach');
}

getCoachById(id: string): Observable<Reponse<Coach>> {
  return this.http.get<Reponse<Coach>>(`http://localhost:3000/api/coach/${id}`);
}
 

uploadFile(id:String, file: File) {
  let resources =  'adherent';
  const formData: FormData = new FormData();
  formData.append('file', file);

  return this.http.post(`http://localhost:3000/api/${resources}/${id}/upload`, formData);

}

}
