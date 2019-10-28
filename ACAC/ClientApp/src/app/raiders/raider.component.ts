import { Component, Inject } from '@angular/core';

export class ACACRaider {
  raider: {characterid: string, charactername: string, avatar: string }[] = [
    {characterid: '4477459',
     charactername: 'Aerilyn Elessedil',
     // tslint:disable-next-line: max-line-length
     avatar: 'https://img2.finalfantasyxiv.com/f/29afb530949056fe7581230e46ce25f8_0e336ff6ad415f47233f0aaf127feac0fc0_96x96.jpg?1572269901'},
    {characterid: '10525190',
     charactername: 'Hades Carmine',
     // tslint:disable-next-line: max-line-length
     avatar: 'https://img2.finalfantasyxiv.com/f/971ab9839fea01f73e66af3faca1fe39_0e336ff6ad415f47233f0aaf127feac0fc0_96x96.jpg?1572267232'},
    {characterid: '24166474',
     charactername: 'La Ki',
     // tslint:disable-next-line: max-line-length
     avatar: 'https://img2.finalfantasyxiv.com/f/d4a9e875d82fae5d760ea19e106cde42_b937560c841465f7c4bc8eb47ea7948afc0_96x96.jpg?1572270121'},
    {characterid: '9401374',
     charactername: 'Lan Mantear',
     // tslint:disable-next-line: max-line-length
     avatar: 'https://img2.finalfantasyxiv.com/f/79bbfa3e3ffac4723c307a1ba522185f_0e336ff6ad415f47233f0aaf127feac0fc0_96x96.jpg?1572267127'},
    {characterid: '17298413',
     charactername: 'Shelly Duncan',
     // tslint:disable-next-line: max-line-length
     avatar: 'https://img2.finalfantasyxiv.com/f/8343ee17af8fd3c4e5fb2bf918830e68_0e336ff6ad415f47233f0aaf127feac0fc0_96x96.jpg?1572267128'},
    {characterid: '9199289',
     charactername: 'Thomas Silverstar',
     // tslint:disable-next-line: max-line-length
     avatar: 'https://img2.finalfantasyxiv.com/f/9f92216069dfc0b084b11bbb9fb24dcb_0e336ff6ad415f47233f0aaf127feac0fc0_96x96.jpg?1572267941'},
    {characterid: '7346455',
     charactername: 'Val Phoenix',
     // tslint:disable-next-line: max-line-length
     avatar: 'https://img2.finalfantasyxiv.com/f/3f7234df431e4f6b75a65ec116494239_0e336ff6ad415f47233f0aaf127feac0fc0_96x96.jpg?1572270357'},
    {characterid: '9400141',
     charactername: 'Yumi Rin',
     avatar: 'https://img2.finalfantasyxiv.com/f/84263e7ebe2d0bcc2d03ee6fe83bbd69_0e336ff6ad415f47233f0aaf127feac0fc0_96x96.jpg?1572267008'}
  ];
  selected: string;
  constructor(Selected: string) { this.selected = Selected; }
}

@Component({
  selector: 'app-raider',
  templateUrl: './raider.component.html',
  styleUrls: ['./raider.component.css']
})
export class RaiderComponent {
  raider = new ACACRaider('0');
}

@Component({
    selector: 'app-lan-mantear',
    templateUrl: './raider.component.html',
    styleUrls: ['./raider.component.css']
})

export class LanMantearComponent {
  raider = new ACACRaider('3');
}

@Component({
    selector: 'app-aerilyn-elessedil',
    templateUrl: './raider.component.html',
    styleUrls: ['./raider.component.css']
})
export class AerilynElessedilComponent {
  raider = new ACACRaider('0');
}
@Component({
    selector: 'app-hades-carmine',
    templateUrl: './raider.component.html',
    styleUrls: ['./raider.component.css']
  })

  export class HadesCarmineComponent {
    raider = new ACACRaider('1');
}

@Component({
  selector: 'app-la-ki',
  templateUrl: './raider.component.html',
  styleUrls: ['./raider.component.css']
})

export class LaKiComponent {
  raider = new ACACRaider('2');
}

@Component({
  selector: 'app-shelly-duncan',
  templateUrl: './raider.component.html',
  styleUrls: ['./raider.component.css']
})

export class ShellyDuncanComponent {
  raider = new ACACRaider('4');

}

@Component({
  selector: 'app-thomas-silverstar',
  templateUrl: './raider.component.html',
  styleUrls: ['./raider.component.css']
})

export class ThomasSilverstarComponent {
  raider = new ACACRaider('5');
}

@Component({
  selector: 'app-val-phoenix',
  templateUrl: './raider.component.html',
  styleUrls: ['./raider.component.css']
})

export class ValPhoenixComponent {
  raider = new ACACRaider('6');
}
@Component({
  selector: 'app-yumi-rin',
  templateUrl: './raider.component.html',
  styleUrls: ['./raider.component.css']
})
export class YumiRinComponent {
  raider = new ACACRaider('7');
}

