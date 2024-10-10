import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manager } from '../models/Manager';
import { Observable } from 'rxjs';
import { Reponse } from 'src/app/models/Reponse';
import { Gym } from '../models/Gym';

@Injectable({
  providedIn: 'root'
})
export class ManagerManagementService {

  private baseUrl = 'http://localhost:3000'+'/api/manager'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  createManager(manager: Manager) : Observable<Reponse<Manager>>{
    return this.http.post<Reponse<Manager>>(this.baseUrl, manager);
  }

  getAllManager(params:any) : Observable<Reponse<Manager[]>>{
    return this.http.get<Reponse<Manager[]>>(this.baseUrl,{params});
  }

  deleteManagerById(id: string): Observable<Reponse<any>> {
    return this.http.delete<Reponse<any>>(this.baseUrl + '/' + id);
  }
  getGyms(): Observable<Reponse<Gym[]>> {
    return this.http.get<Reponse<Gym[]>>('http://localhost:3000/api/gym');
  }

  getManagerById(id:string): Observable<Reponse<Manager>> {
    return this.http.get<Reponse<Manager>>(this.baseUrl + '/' + id);
  }

  updateManager(id: string, manager:Manager) : Observable<Reponse<Manager>>{
    return this.http.put<Reponse<Manager>>(this.baseUrl+ '/'+ id ,manager);

}

getGymById(id: string): Observable<Reponse<Gym>> {
  return this.http.get<Reponse<Gym>>(`http://localhost:3000/api/gym/${id}`);
}

uploadFile(id:String, file: File) {
  let resources =  'manager';
  const formData: FormData = new FormData();
  formData.append('file', file);

  return this.http.post(`http://localhost:3000/api/${resources}/${id}/upload`, formData);

}

}

