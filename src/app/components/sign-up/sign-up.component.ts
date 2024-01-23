import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  classes: any = [];
  roles: string[] = ['candidate','facilitator']
  registerFormData: any = {
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  constructor(private router: Router, private snackbar: MatSnackBar){
    
  }

  submit(){

  }
}
