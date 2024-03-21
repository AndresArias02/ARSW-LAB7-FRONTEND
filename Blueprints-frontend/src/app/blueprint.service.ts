import { Injectable } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { Blueprint } from './blueprint';
import { HttpClient} from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlueprintService {

  //Base URL
  private URL = "http://localhost:8080/blueprints";

  constructor(private httpClient: HttpClient) { }

  //Service to Get all the blueprints by author
  getBlueprintsByAuthor(author: string): Observable<Blueprint[]> {
    return this.httpClient.get<Blueprint[]>(`${this.URL}/${author}`);
  }

  //Service to Get a blueprint with the name of this and author's name
  getBlueprintsByNameAndAuthor(author: string,nameBlueprint:string): Observable<Blueprint> {
    return this.httpClient.get<Blueprint>(`${this.URL}/${author}/${nameBlueprint}`);
  }

  //Service to create a new blueprint
  createNewBlueprint(blueprint:Blueprint):Observable<Object>{
    return this.httpClient.post(`${this.URL}/agregar`,blueprint);
  }

  //Method to delete the blueprint
  deleteBlueprint(author:string,nameBlueprint:string):Observable<Object>{
    return this.httpClient.delete(`${this.URL}/${author}/${nameBlueprint}`);
  }

  //Method to update the blueprint
  updateBlueprint(author:string,nameBlueprint:string,points: { x: number, y: number }[]):Observable<Object>{
    return this.httpClient.put(`${this.URL}/${author}/${nameBlueprint}`,points);
  }
  
  
}
