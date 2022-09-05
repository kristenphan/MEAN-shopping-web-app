import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from './notifier/notifier.component'

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar:MatSnackBar) { }

  showNotification(displayMessage:string, buttonText:string) {
    this.snackBar.openFromComponent(NotifierComponent, {
      duration:5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
