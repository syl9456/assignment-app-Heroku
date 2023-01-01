import { Injectable } from '@angular/core';
import { Assignment } from '../../assignments/assignment.model';
import { forkJoin, Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap }  from 'rxjs/operators';
import { bdInitialAssignments } from '../data';



@Injectable({
  providedIn: 'root'
})


export class AssignmentsService {
  assignments:Assignment[] = [];

  constructor(private loggingService:LoggingService,
              private http:HttpClient) { }

  url = "http://localhost:8010/api_assignment/assignments"


  private HttpOptions = {
    headers : new HttpHeaders({
      'Content Type': 'application/json'
    })
  }

  // récupération de la liste des assignments
  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.url);
  }

  // récupération d'une page d'assignments
  getAssignmentsPagine(page:number, limit:number):Observable<any> {
    return this.http.get<any>(this.url + "?page=" + page + "&limit=" + limit);
  }

  // récupération d'un assignment par son id
  getAssignment(id:number) : Observable<Assignment|undefined>{

    console.log("det by id id = " + id);
    return this.http.get<Assignment>(this.url + "/" + id)
    .pipe(
      map(a => 
      {
        return a;
      }),
      tap(_ => 
      {
        console.log("tap: assignment avec id = " + id + " requete GET envoyée sur MongoDB cloud");
      }),
      catchError(this.handleError<Assignment>('getAssignment(id=${id})'))
    );
  }

  private handleError<T>(operation, result?:T){
    return (error:any) : Observable<T> => {
      console.error(error);
      console.log(operation + ' a echoué ' + error.message);

      return of(result as T);
  };
  }

  // ajout d'un assignment dans la liste des assignments de la classe AssignmentService
  addAssignments(assignment: Assignment): Observable<any> {
    return this.http.post<Assignment>(this.url, assignment);
  }

  // effacement d'un assignment par son id
  deleteAssignment(assignment: Assignment): Observable<any>{

    let deleteURI =  this.url + "/" + assignment._id;
    return this.http.delete(deleteURI);
  }

  // mise à jour d'un assignment par son id
  updateAssignment(assignment:Assignment): Observable<any> { 
    return this.http.put<Assignment>(this.url,assignment);
  }

  // pour peupler la base de données avec les assignments du tableau bdInitialAssignments
  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment:any = [];
 
    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment:any = new Assignment();
 
      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = false;
      nouvelAssignment.auteur = a.auteur;
      nouvelAssignment.note = -1;
      nouvelAssignment.remarque = a.remarque;
      nouvelAssignment.matiere = a.matiere;
 
      appelsVersAddAssignment.push(this.addAssignments(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); 
    // renvoie un seul Observable pour dire que c'est fini
  }
}
