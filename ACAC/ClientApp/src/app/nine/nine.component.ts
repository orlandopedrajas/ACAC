import { Component } from '@angular/core';

export interface NineMembers {
    value: string;
    viewValue: string;
}
@Component({
    selector: 'app-nine',
    templateUrl: './nine.component.html',
    styleUrls: ['./nine.component.css']
})

export class NineComponent {
    ninemembers: NineMembers[] = [
        {value: '14593575', viewValue: 'Ariela Cooke'},
        {value: '9411542', viewValue: 'Babeth Mantear'},
        {value: '10504886', viewValue: 'Elisabeti Mantear'},
        {value: '9401374', viewValue: 'Lan Mantear'},
        {value: '11320813', viewValue: 'Lizha Nuhla'},
        {value: '9768479', viewValue: 'Sonic Blue'},
        {value: '9400141', viewValue: 'Yumi Rin'},
        {value: '26850205', viewValue: 'Faye Cooke'}
    ];
    charid: string;

    constructor() {
        this.charid = null;
    }
}

