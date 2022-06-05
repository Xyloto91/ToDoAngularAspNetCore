import { Component, Input, Injectable, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToDoModel } from '../../models/to-do-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constants } from '../config/constants';

@Component({
  selector: 'app-modal-content',
  template: `
      <div class="modal-card-head">
        <h4 class="modal-card-title">Delete to do task</h4>
        <button type="button" class="delete" aria-label="Close" (click)="activeModal.close('Cancel')"></button>
      </div>
      <div class="modal-card-body">
        <p>Are you sure you want to delete this to do task '{{title}}'?</p>
      </div>
      <div class="modal-card-foot">
        <button type="button" class="button is-link" (click)="activeModal.close('Ok')">Submit</button>
        <button type="button" class="button" (click)="activeModal.close('Cancel')">Close</button>
      </div>
  `
})
export class ModalContent {
  @Input() title?: string;

  constructor(public activeModal: NgbActiveModal) { }
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ModalComponent implements OnInit {
  toDo?: ToDoModel;

  private apiUrl: string = this.constants.WEB_API_BASE_URL + this.constants.API_TO_DO_ENDPOINT;

  constructor(private modalService: NgbModal, private http: HttpClient, private router: Router, private snackBar: MatSnackBar, private constants: Constants) {}

  ngOnInit() {
    
  }

  open(): void {
    const modalRef = this.modalService.open(ModalContent, { backdrop: false });
    modalRef.componentInstance.title = this.toDo?.title;
    modalRef.result.then(result => {
      if (result == 'Ok') {
        const headers: HttpHeaders = new HttpHeaders();
        headers.set('Content-Type', 'application/json');

        this.http.delete<ToDoModel>(this.apiUrl + '/' + this.toDo?.id, { headers: headers, observe: 'response' }).subscribe(
          result => {
            if (result.status == HttpStatusCode.Ok) {
              this.router.navigate(['/']);
            }
            else {
              let snackBarRef = this.snackBar;
              snackBarRef.open(`Couldn't delete data!`);
            }
          },
          error => console.error(error));
      }
    });
  }
}

