import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddClassComponent } from 'src/app/popUps/add-class/add-class.component';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  user: any;
  classes: any;

  constructor(private sharedService: SharedService, private snackBar: MatSnackBar, private matDialog: MatDialog, private router: Router)  {
    this.user = {name: 'Simphiwe Nene', role: 'facilitator'}
    this.updateClass()

  }

  updateClass(): void {
    let allClasses = this.sharedService.get('classes', 'local')
    this.classes =   [{className: 'Maths', facilitatorEmail:'gsim@gmail.com', candidatesCount: 20, timeIn: '08:00', timeOut: '16:00'}]

  }

  addNewClass():void {
    let dialogRef = this.matDialog.open(AddClassComponent)
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.snackBar.open(result, 'OK', {duration: 3000})
        this.updateClass()
      }
    }
      
      )
  }

  goTo(_class: any): any {
    sessionStorage.setItem('class', _class)
    this.router.navigate([`/${this.user.role}/candidate`])
  }
}
