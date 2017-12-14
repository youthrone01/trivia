import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { PlayComponent } from './play/play.component';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { HttpModule } from '@angular/http'; // <-- Import HttpModule
import { MainService } from './main.service'; // <-- Imported

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NewComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // <-- Include module in our AppModules
		HttpModule, // <-- Include module in our AppModules
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
