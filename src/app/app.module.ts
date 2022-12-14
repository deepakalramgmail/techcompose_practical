import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { AddComponent } from './components/user/add/add.component';
import { PersonalComponent } from './components/user/add/personal/personal.component';
import { BusinessComponent } from './components/user/add/business/business.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddComponent,
    PersonalComponent,
    BusinessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
