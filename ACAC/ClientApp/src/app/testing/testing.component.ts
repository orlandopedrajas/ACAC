import { Component } from '@angular/core';

export interface CPROUser {
    name: string;
    mobilenumber: string;
    email: string;
    datecreated: string;
    status: string;
    costcenter: string;
}
const USER_DATA: CPROUser [] = [
  {name: 'Aable Kozlowski', mobilenumber: '123-456-7890', email: 'akoz@email.com', datecreated: '2020-01-01', status: 'Current/Active', costcenter: 'Location A'},
  {name: 'Bethany Kozlowski', mobilenumber: '223-456-7890', email: 'bkoz@email.com', datecreated: '2020-02-01', status: 'Current/Active', costcenter: 'Location B'}, 
  {name: 'Coulson Kozlowski', mobilenumber: '323-456-7890', email: 'ckoz@email.com', datecreated: '2020-03-01', status: 'Current/Active', costcenter: 'Location C'}, 
  {name: 'Darren Kozlowski', mobilenumber: '423-456-7890', email: 'dkoz@email.com', datecreated: '2020-04-01', status: 'Current/Active', costcenter: 'Location D'},
  {name: 'Eva Kozlowski', mobilenumber: '523-456-7890', email: 'ekoz@email.com', datecreated: '2020-05-01', status: 'Pending Registration', costcenter: 'Location E'}  
]
;

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css'],

})
export class testingcomponent {

    displayedColumns: string[] = ['name','mobilenumber', 'email', 'datecreated',  'status', 'costcenter'];
    dataSource = USER_DATA;

}