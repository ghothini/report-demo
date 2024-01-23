import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  loginFormData: any = {
    email: '',
    password: ''
  }

  constructor(private sharedService: SharedService, private router: Router, private snackbar: MatSnackBar) { }

  submit() {
    const users = this.sharedService.get('users', 'local');
    if (users.length > 0) {
      const isFound = users.find((user: any) => user.email === this.loginFormData.email);
      if (isFound) {
        if (isFound.password === this.loginFormData.password) {
          sessionStorage.setItem('user', JSON.stringify(isFound));
          if (isFound.role === 'candidate') {
            const classes = this.sharedService.get('classes', 'local');
            classes.forEach((_class: any) => {
              if (_class.classId === isFound.classId) {
                sessionStorage.setItem('class', JSON.stringify(_class));
                this.router.navigate(['/candidate']);
              }
            })
          } else {
            this.router.navigate(['/landing']);
          }
        } else {
          this.snackbar.open('Account details do not match', 'Ok', { duration: 3000 });
          return;
        }
      } else {
        this.snackbar.open('Account does not exist', 'Ok', { duration: 3000 });
        this.router.navigate(['/sign-up']);
      }
    } else {
      this.snackbar.open('No users exist', 'Ok', { duration: 3000 });
      this.router.navigate(['/sign-up']);
    }
  }

}
