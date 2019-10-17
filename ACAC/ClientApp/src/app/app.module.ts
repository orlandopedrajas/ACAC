import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent, ValidateUserComponent } from './nav-menu/nav-menu.component';

import { DemoMaterialModule } from './material-module';
import { EdenSavage1Component } from './who-can-lot/eden-savage-1/eden-savage-1.component';
import { EdenSavage2Component } from './who-can-lot/eden-savage-2/eden-savage-2.component';
import { EdenSavage3Component } from './who-can-lot/eden-savage-3/eden-savage-3.component';
import { EdenSavage4Component } from './who-can-lot/eden-savage-4/eden-savage-4.component';
import { AerilynElessedilComponent } from './raiders/raider.component';
import { HadesCarmineComponent } from './raiders/raider.component';
import { LaKiComponent } from './raiders/raider.component';
import { LanMantearComponent } from './raiders/raider.component';
import { ShellyDuncanComponent } from './raiders/shelly-duncan/shelly-duncan.component';
import { ThomasSilverstarComponent } from './raiders/thomas-silverstar/thomas-silverstar.component';
import { ValPhoenixComponent } from './raiders/val-phoenix/val-phoenix.component';
import { YumiRinComponent } from './raiders/yumi-rin/yumi-rin.component';
import { ItemDropHistoryComponent } from './item-drop-history/item-drop-history.component';
import { AddItemDropComponent } from './add-item-drop/add-item-drop.component';
import { ArchivedItemDropComponent } from './admin-pages/archived-item-drop/archived-item-drop.component';
import { ManageListsComponent } from './admin-pages/manage-lists.component';
import { ProfilePicturesComponent } from './admin-pages/profile-pictures/profile-pictures.component';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    EdenSavage1Component,
    EdenSavage2Component,
    EdenSavage3Component,
    EdenSavage4Component,
    AerilynElessedilComponent,
    HadesCarmineComponent,
    LaKiComponent,
    LanMantearComponent,
    ShellyDuncanComponent,
    ThomasSilverstarComponent,
    ValPhoenixComponent,
    YumiRinComponent,
    ItemDropHistoryComponent,
    AddItemDropComponent,
    ArchivedItemDropComponent,
    ManageListsComponent,
    ProfilePicturesComponent,
    ValidateUserComponent,
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
    DemoMaterialModule
  ],
  providers: [ CookieService ],
  entryComponents: [ValidateUserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
