import { Component,OnInit, Input} from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/services/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})

export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis: Assignment;


  constructor(private assignmentsService: AssignmentsService,
              private route:ActivatedRoute,
              private router:Router,
              private authService: AuthService){}

  ngOnInit(): void{
    this.getAssignment();
  }


  //fonctions de vérification de l'utilisateur
  isAdmin():boolean {
    return this.authService.isAdmin();
  }
  isModerator():boolean {
    return this.authService.isModerator();
  }
  isUser():boolean {
    return this.authService.isUser();
  }

  //fonction de récupération d'un assignment
  getAssignment(){
    const id = +this.route.snapshot.params['id'];
    console.log(id);
    this.assignmentsService.getAssignment(id)
    .subscribe((assignment) => 
    {
      this.assignmentTransmis = assignment
    });
  }
  
  //fonction de la mise à jour d'un assignment sur rendu
  onAssignmentRendu(){
    if (!this.assignmentTransmis) return;

    this.assignmentTransmis.rendu = true;

    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe((message) => 
      {
        console.log(message);
      });
  }

  // fonction destinée à supprimer un assignment 
  onDelete(){
    if(!this.assignmentTransmis) return;

    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
    .subscribe((message) => 
    {
      console.log(message);
      this.assignmentTransmis = null;
      this.router.navigate(["home"], {replaceUrl:true});
    });
  }
}
