import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import { DemoMaterialModule } from './material-module';
import { WhoCanLotComponent } from './who-can-lot/who-can-lot.component';

import { RaiderComponent } from './raiders/raider.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { ItemDropHistoryComponent } from './item-drop-history/item-drop-history.component';
import { CookieService } from 'ngx-cookie-service';
import { CharacterInfoComponent } from './components/character-info/character-info.component';
import { ItemDropComponent } from './components/item-drop/item-drop.component';
import { RoundRobinListComponent } from './components/round-robin-list/round-robin-list.component';
import { ItemDropByFloorComponent } from './components/item-drop-by-floor/item-drop-by-floor.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { AuthorizeComponent } from './components/authorize/authorize.component';
import { AlternateJobsComponent } from './alternate-jobs/alternate-jobs.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ChartsModule } from 'ng2-charts';
import { AttendanceComponent } from './admin-pages/attendance/attendance.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { RaidFloorComponent } from './admin-pages/raid-floors/raid-floors.component';
import { WhocanlotCoreComponent } from './components/who-canlot/who-canlot.component';
import { RaiderInfoComponent } from './components/raider-info/raider-info.component';
import { RaiderManagementComponent } from './admin-pages/raider-management/raider-management.component';
import { AddRaidItemDropComponent } from './admin-pages/add-raiditem-drop/add-raiditem-drop.component';
import { ManageRoundrobinListsComponent } from './admin-pages/manage-roundrobin-lists/manage-roundrobin-lists.component';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { NineComponent } from './nine/nine.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { bottomsheetpicturealbum, picturealbumComponent } from './admin-pages/picture-album/picture-album.component';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    WhoCanLotComponent,
    WhocanlotCoreComponent,
    RaiderComponent,
    ItemDropHistoryComponent,
    TooltipComponent,
    CharacterInfoComponent,
    ItemDropComponent,
    RoundRobinListComponent,
    ItemDropByFloorComponent,
    ConfirmationDialogComponent,
    ImageDialogComponent,
    BottomSheetComponent,
    bottomsheetpicturealbum,
    AuthorizeComponent,
    AlternateJobsComponent,
    PieChartComponent,
    AttendanceComponent,
    DoughnutChartComponent,
    RaidFloorComponent,
    RaiderInfoComponent,
    RaiderManagementComponent,
    AddRaidItemDropComponent,
    ManageRoundrobinListsComponent,
    NineComponent,
    picturealbumComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatTableModule,
    MatNativeDateModule,
    DemoMaterialModule,
    ChartsModule,
    NgxGalleryModule,
  ],
  providers: [ CookieService ],
  entryComponents: [TooltipComponent,
                    ConfirmationDialogComponent,
                    ImageDialogComponent,
                    BottomSheetComponent,
                    bottomsheetpicturealbum,
                   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
