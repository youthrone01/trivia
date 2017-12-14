import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent},
  
  { path: 'home', component: HomeComponent },
  {path: 'new', component: NewComponent},
  {path: 'play', component: PlayComponent},

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
