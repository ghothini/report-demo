import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  get(key:string, sessionType: string) {
    let data = sessionType === 'session' ? sessionStorage.getItem(key) : localStorage.getItem(key)
    return data ? JSON.parse(data) : data
  }

  getDateFromTime(date:any): string {
    const now = date
    const hoursAndMinutes = now.getHours() + ':' + now.getMinutes()
    return hoursAndMinutes;
  }
}
