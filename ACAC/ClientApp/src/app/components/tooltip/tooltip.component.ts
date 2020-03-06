import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent {
    arm = false;

    itemdamage;
    itemdelayms;
    itemautoattack;
    profileinfo = null;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                public dialogRef: MatDialogRef<TooltipComponent>) {
                    console.log(data.item);
                    this.profileinfo = data.item;
                    console.log(this.profileinfo.Item);

                    try {
                        if (typeof this.profileinfo.Item !== 'undefined') { this.profileinfo = null; }

                    } catch {  this.profileinfo = null; }
        // if (data.item.Item.ItemUICategory.Name.toLowerCase().indexOf('arm') > -1) {
        //    this.itemdamage = +data.item2.DamagePhys;
        //    this.itemautoattack =  ((3.2) / 3) * +this.itemdamage;
        //    this.itemdelayms = +data.item2.DelayMs * 1000;
        //    this.arm = true;
        // }

    }
}
