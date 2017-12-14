import { Component, OnInit } from '@angular/core';
import { MainService } from "./main.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  if_login_one = false;
  if_login_two = false;
  
  constructor(private _mainService: MainService, private _router: Router) {
    if(localStorage.user != undefined){
      this.if_login_one = true;
    }
    console.log(this.if_login_one)
   }
  logout(){
    this._router.navigate([''])
    localStorage.removeItem('user');
    this.if_login_one = false;
    this.if_login_two = false;
  }
  ngOnInit(){
    this._mainService.is_login.subscribe(
      (data)=>{
        this.if_login_two = data[0];
        console.log(this.if_login_two);
      }
    )
  }
}
