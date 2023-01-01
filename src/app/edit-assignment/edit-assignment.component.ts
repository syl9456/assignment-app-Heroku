import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from '../shared/services/assignments.service';
import { Assignment } from '../assignments/assignment.model';

@Component({
 selector: 'app-edit-assignment',
 templateUrl: './edit-assignment.component.html',
 styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  assignment!: Assignment | undefined;
  nomAssignment!: string;
  dateDeRendu!: Date;
  note!: number;
  remarque!: string;
  matiere!: string;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment() {
  // on récupère l'id dans le snapshot passé par le routeur
  // le "+" force l'id de type string en "number"
  const id = +this.route.snapshot.params['id'];

  this.assignmentsService.getAssignment(id).subscribe((assignment) => {
    if (!assignment) return;
    this.assignment = assignment;
    // Pour pré-remplir le formulaire
    this.nomAssignment = assignment.nom;
    this.dateDeRendu = assignment.dateDeRendu;
    this.remarque = assignment.remarque;

    if (assignment.note == -1) {
      this.note = null;
    } else {
      this.note = assignment.note;
    }
  });
  }

  // fonction de la mise à jour d'un assignment
  onSaveAssignment() {
    if (!this.assignment) return;

    // on récupère les valeurs dans le formulaire
    if(this.nomAssignment){
      this.assignment.nom = this.nomAssignment;
    }

    if(this.dateDeRendu){
      this.assignment.dateDeRendu = this.dateDeRendu;
    }

    if(this.note){
      this.assignment.note = this.note;
    }

    if(this.remarque){
      this.assignment.remarque = this.remarque;
    }

    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);

        // navigation vers la home page
        this.router.navigate(['home'], {replaceUrl:true});
      });
  }
}

