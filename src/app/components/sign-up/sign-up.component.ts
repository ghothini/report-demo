import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  classes: any = [];
  roles: string[] = ['candidate', 'facilitator']
  registerFormData: any = {
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  constructor(private router: Router, private snackbar: MatSnackBar, private sharedService: SharedService) {
    this.classes = this.sharedService.get('classes', 'local');
  }

  submit() {
    if (this.registerFormData.password != this.registerFormData.confirmPassword) {
      this.snackbar.open('Passwords do not match', 'Ok', { duration: 3000 });
      return;
    }

    const users = this.sharedService.get('users', 'local');
    if (users.length > 0) {
      const isFound = users.find((user: any) => user.email === this.registerFormData.email);
      if (isFound) {
        this.snackbar.open('Account already exists', 'Ok', { duration: 3000 });
        return;
      } else {
        this.addNewUser(users);
      }

    } else {
      this.addNewUser(users);
    }
  }

  addNewUser(users: any) {
    delete this.registerFormData.confirmPassword;
    if (this.registerFormData.role === 'candidate') {
      this.classes.forEach((_class: any) => {
        if (_class.classId === this.registerFormData.classId) {
          _class.candidates.push(this.registerFormData);
          _class.candidateCount++;
        }
        localStorage.setItem('classes', JSON.stringify(this.classes));
      })
    }
    users.push(this.registerFormData);
    localStorage.setItem('users', JSON.stringify(users));
    this.snackbar.open(`${this.registerFormData.email} was added successfully`, 'Ok', { duration: 3000 });
    this.router.navigate(['/sign-in'])
  }
}
