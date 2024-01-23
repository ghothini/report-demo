import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
 user: any;
 class: any;
 menuItems: any = []
 activeLink: number = 0

 constructor(private router: Router) {

  this.user = {name: 'Simphiwe Nene', role: 'facilitator'}
  this.class = {className: 'Maths'}


  if(this.user === 'candidate') {
    this.menuItems = [{name: 'View Late Report', route: 'candidate/late-report'}]
  }else {
    this.menuItems = [{name: 'View Candidate', route: 'facilitator/late-report'},
    {name: 'View Late Comers', route: 'facilitator/view-late-report'}]
  }

 this.listenToRouteChange()

 }

 listenToRouteChange() {
  this.router.events.subscribe(event => {
    if(event instanceof NavigationEnd) {
      this.menuItems.forEach((item: any, indx: number) => {
        if(item.route === event.url) {
          this.activeLink = indx
        }
      })
    }
  })
 }

 logOut(): void {
  sessionStorage.clear()
  this.router.navigate(['sign-in'])
 }

}
