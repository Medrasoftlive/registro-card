import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarjeta } from '../models/card';
import { environment } from '../../environments/environment.development';
import { ReactiveFormsModule } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CardService {

 private UrlBase=environment.apiURL+'/api/card';
  constructor(private http: HttpClient) { }

   public addCard(card: Tarjeta): Observable<Tarjeta>{
    return this.http.post<Tarjeta>(this.UrlBase, card);
  }

  public getCards(): Observable<Tarjeta[]>{
    return this.http.get<Tarjeta[]>(this.UrlBase);
  }

  public getCardById(id:number):Observable<Tarjeta>{
    return this.http.get<Tarjeta>(`${this.UrlBase}/${id}`);
  }

  public pdateCard(id:number, tarjeta: Tarjeta){
    return this.http.put(`${this.UrlBase}/${id}`, tarjeta);
  }

  public DeleteCard(id: number){
    return this.http.delete(`${this.UrlBase}/${id}`);
  }


}
