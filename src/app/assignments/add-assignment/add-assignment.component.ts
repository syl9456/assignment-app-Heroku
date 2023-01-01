import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/services/assignments.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  nomDevoir:string = "";
  dateDeRendu:Date;
  remarque:string = "";
  matiere:string = "";

  constructor(private assignmentsService: AssignmentsService,
              private router: Router,
              private tokenStorageService: TokenStorageService){}
  
  // fonction de la création d'un assignment
  onSubmit() {
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random()*1000000000000000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.auteur = this.tokenStorageService.getUser().username;
    newAssignment.note = -1;
    newAssignment.remarque = this.remarque;
    newAssignment.matiere = this.matiere;

    //this.nouvelAssignment.emit(newAssignment);

    this.assignmentsService.addAssignments(newAssignment)
    .subscribe(reponse => console.log(reponse.message));

    this.router.navigate(['home'], {replaceUrl:true});
  }

  ngOnInit(): void {
  }

}
