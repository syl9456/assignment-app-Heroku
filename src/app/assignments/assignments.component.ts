import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/services/assignments.service';
import { Assignment } from './assignment.model';
import { ActivatedRoute,Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})


export class AssignmentsComponent implements OnInit {
  titre = "Mon application de devoirs !";
  page: number = 1;
  limit: number = 10;
  totalDocs: number;
  totalPages: number;
  hasPrevPage: boolean;
  prevPage: number;
  hasNextPage: boolean;
  nextPage: number;

  assignmentSelectionne:Assignment;
  assignments:Assignment[];

  constructor(private assignmentService: AssignmentsService,
              private router: Router
              /*private route:ActivatedRoute*/) { }
  
  ngOnInit(): void {    
    this.getAssignments();   
  }

  //Prend les assignments, pagine et subscribe le résultat 
  getAssignments(){
    this.assignmentService.getAssignmentsPagine(this.page, this.limit)
     .subscribe((data) => {
       this.assignments = data.docs;
       this.page = data.page;
       this.limit = data.limit;
       this.totalDocs = data.totalDocs;
       this.totalPages = data.totalPages;
       this.hasPrevPage = data.hasPrevPage;
       this.prevPage = data.prevPage;
       this.hasNextPage = data.hasNextPage;
       this.nextPage = data.nextPage;
       console.log("Données reçues");
     });
  }

  assignmentClick(assignment: Assignment){
    console.log(assignment);
    this.assignmentSelectionne = assignment;
  }

  handlePageEvent(e:PageEvent){
    this.page = e.pageIndex+1;
    this.limit = e.pageSize;
    console.log(e);
    console.log("prevPage : " + this.prevPage + " Page : "+ this.page + " limite : " + this.limit);
    this.getAssignments();
  }
}


