import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Modele } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private apiRoute = "https://inov-test-api.onrender.com/api";
  private modelSource = new BehaviorSubject<Modele | null>(null);
  currentModel$ = this.modelSource.asObservable();

  private modelUpdatedSource = new BehaviorSubject<boolean>(false);
  modelUpdated$ = this.modelUpdatedSource.asObservable();

  constructor(private http: HttpClient) { }

  //PING API SERVER
  pingServer(): Observable<string>{
    return this.http.get<string>(`${this.apiRoute}/ping`);
  }

  //ADD GET LIST
  getList(): Observable<Modele[]> {
    return this.http.get<Modele[]>(`${this.apiRoute}/models`);
  }

  //ADD GET MODEL BY ID
  getModelById(modelId: string): Observable<Modele> {
    return this.http.get<Modele>(`${this.apiRoute}/models/${modelId}`);
  }

  //ADD POST REQUEST
  createModel(model: Modele): Observable<Modele> {
    return this.http.post<Modele>(`${this.apiRoute}/models`, model);
  }

  //ADD PUT REQUEST
  updateModel(modelId: string, model: Modele): Observable<Modele> {
    return this.http.put<Modele>(`${this.apiRoute}/models/${modelId}`, model);
  }

  //ADD DELETE REQUEST
  deleteModel(modelId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiRoute}/models/${modelId}`);
  }

  getImagePath(modelName: string): string {
    return `assets/images/${modelName}.png`;
  }

  changeModel(model: Modele) {
    this.modelSource.next(model);
  }

  notifyModelUpdated(): void {
    this.modelUpdatedSource.next(true);
  }
}
