import { Component } from '@angular/core';


@Component({
  selector: 'app-eden-savage-1',
  templateUrl: './who-can-lot.component.html',
  styleUrls: ['./who-can-lot.component.css']
})
export class EdenSavage1Component {
    Floorname = 'Eden Savage Floor 1';
    Floorbanner = 'assets/img/eden1.png';
    Floormessage: any[] = [];
    constructor() {
        this.Floormessage.push('Round robin Accessory Coffers');
    }
}

@Component({
    selector: 'app-eden-savage-2',
    templateUrl: './who-can-lot.component.html',
    styleUrls: ['./who-can-lot.component.css']
  })
export class EdenSavage2Component {
    Floorname = 'Eden Savage Floor 2';
    Floorbanner = 'assets/img/eden2.png';
    Floormessage: any[] = [];
    constructor() {
        this.Floormessage.push('Round robin Equipment Coffers');
        this.Floormessage.push('Round robin Deepshadow Coating');
        this.Floormessage.push('Weapon Tomestone ... prioritize those who need it for primary weapon > free lot');
    }
}
@Component({
    selector: 'app-eden-savage-3',
    templateUrl: './who-can-lot.component.html',
    styleUrls: ['./who-can-lot.component.css']
  })
export class EdenSavage3Component {
    Floorname = 'Eden Savage Floor 3';
    Floorbanner = 'assets/img/eden3.png';
    Floormessage: any[] = [];
    constructor() {
        this.Floormessage.push('Round robin Equipment Coffers');
        this.Floormessage.push('Round robin Deepshadow Twines');
        this.Floormessage.push('Round robin Deepshadow Solvents priority DPS > Tanks > Heals, among those who have weapon to upgrade');
    }
}

@Component({
    selector: 'app-eden-savage-4',
    templateUrl: './who-can-lot.component.html',
    styleUrls: ['./who-can-lot.component.css']
  })

export class EdenSavage4Component {
    Floorname = 'Eden Savage Floor 4';
    Floorbanner = 'assets/img/eden4.png';
    Floormessage: any[] = [];
    constructor() {
        this.Floormessage.push('Round robin Chest Coffers');
        this.Floormessage.push('Round robin Weapon Coffers... priority DPS > Tanks > Heals');
    }
}
