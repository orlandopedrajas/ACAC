import {Component, Inject} from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
    selector: 'app-bottom-sheet',
    templateUrl: './bottom-sheet.component.html',
    styleUrls: ['./bottom-sheet.component.css'],
})
export class BottomSheetComponent {

    // tslint:disable-next-line: variable-name
    constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {  }

}

