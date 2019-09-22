import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchItemDropComponent } from './fetch-item-drop/fetch-item-drop.component';
import { AddItemDropComponent } from './add-item-drop/add-item-drop.component';
import { ItemDropHistoryComponent } from './item-drop-history/item-drop-history.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchItemDropComponent,
    AddItemDropComponent,
    ItemDropHistoryComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'fetch-item-drop', component: FetchItemDropComponent },
      { path: 'add-item-drop', component: AddItemDropComponent },
      { path: 'item-drop-history', component: ItemDropHistoryComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
