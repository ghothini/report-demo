import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FacilitatorGuard implements CanActivate {
  constructor(private sharedService: SharedService, private location: Location){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isLoggedIn = this.sharedService.get('user','session');
      if(isLoggedIn && isLoggedIn.role === 'facilitator'){
        return true;
      } else {
        this.location.back()
        return false;
      }
  }
  
}
