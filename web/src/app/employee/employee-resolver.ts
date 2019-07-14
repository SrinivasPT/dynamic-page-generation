import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmployeeResolver implements Resolve<any> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return of({
      employeeDetailsOne: {
        firstName: 'Srinivas',
        lastName: 'Peeta',
        email: 'speeta@gmail.com',
        dob: new Date('1/1/2018'),
        country: 'INDIA',
        state: 'HYDERABAD'
      },
      addressOne: [
        { addressLineOne: 'Aparna Cyber Commune', addressLineTwo: 'Nallagandla', city: 'Hyderabad', state: 'Telangana', country: 'India' },
        { addressLineOne: 'Vijaya Sai Residensy', addressLineTwo: 'Miyapur', city: 'Hyderabad', state: 'Telangana', country: 'India' },
        { addressLineOne: 'Rachel Terrace', addressLineTwo: 'Parcipenny', city: '', state: 'New Jersy', country: 'USA' }
      ]
    }).pipe(delay(0));
  }
}
