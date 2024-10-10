import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responsable } from '../models/Responsable';
import { Observable } from 'rxjs';
import { Reponse } from 'src/app/models/Reponse';

@Injectable({
  providedIn: 'root'
})
export class ResponsablemanagementService {
  private baseUrl = 'http://localhost:3000'+'/api/responsable'; // Replace with your AP

  constructor(private http: HttpClient) { }

  createResponsable(responsable: Responsable) : Observable<Reponse<Responsable>>{
    return this.http.post<Reponse<Responsable>>(this.baseUrl, responsable);
  }

  getAllResponsable(params:any) : Observable<Reponse<Responsable[]>>{
    return this.http.get<Reponse<Responsable[]>>(this.baseUrl,{params});
  }

  deleteResponsableById(id: string): Observable<Reponse<any>> {
    return this.http.delete<Reponse<any>>(this.baseUrl + '/' + id);
  }

  getResponsableById(id:string): Observable<Reponse<Responsable>> {
    return this.http.get<Reponse<Responsable>>(this.baseUrl + '/' + id);
  }

  updateResponsable(id: string, responsable:Responsable) : Observable<Reponse<Responsable>>{
    return this.http.put<Reponse<Responsable>>(this.baseUrl+ '/'+ id ,responsable);

}

uploadFile(id:String, file: File) {
  let resources =  'responsable';
  const formData: FormData = new FormData();
  formData.append('file', file);

  return this.http.post(`http://localhost:3000/api/${resources}/${id}/upload`, formData);

}
}
