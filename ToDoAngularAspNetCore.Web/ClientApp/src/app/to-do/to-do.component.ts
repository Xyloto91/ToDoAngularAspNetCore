import { Component, Inject, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToDoModel } from '../../models/to-do-model';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})

export class ToDoComponent implements OnInit {
  @Input() toDo: ToDoModel;

  webApiUrl = '';

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router, private modalComponent: ModalComponent, @Inject('WEB_API_URL') webApiUrl: string) {
    this.webApiUrl = webApiUrl;
    this.toDo = window.history.state['toDo'];
  }

  ngOnInit(): void {
    if (!this.toDo) {
      this.toDo = new ToDoModel('', '', new Date(), false, undefined);
    }
  }

  onSubmit(): void {
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    if (this.toDo.id) {
      this.http.put<ToDoModel>(this.webApiUrl + 'api/to-do', this.toDo, { headers: headers, observe: 'response' }).subscribe(
        result => {
          let snackBarRef = this.snackBar;
          if (result.status == 200) {
            snackBarRef.open(`To do with title '${this.toDo?.title}' successfully updated.`);
          }
          else {
            snackBarRef.open(`To do with title '${this.toDo?.title}' didn't update!`);
          }
        },
        error => console.error(error));
    }
    else {
      this.http.post<ToDoModel>(this.webApiUrl + 'api/to-do', this.toDo, { headers: headers, observe: 'response' }).subscribe(
        result => {
          let snackBarRef = this.snackBar;
          if (result.status == 200) {
            snackBarRef.open(`To do with title '${this.toDo?.title}' successfully created.`);
          }
          else {
            snackBarRef.open(`To do with title '${this.toDo?.title}' didn't create.`);
          }
          this.router.navigate(['/']);
        },
        error => console.error(error));
    }
  }

  onDelete(): void {
    this.modalComponent.toDo = this.toDo;
    this.modalComponent.open();
  }

  setCompletedDate(): void {
    if (this.toDo.isCompleted) {
      this.toDo.completedDate = new Date();
    }
    else {
      this.toDo.completedDate = undefined;
    }
  }
}
