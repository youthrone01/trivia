import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { Router } from "@angular/router";
declare var $: any;
declare var jquery: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  new_user = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  };

  pass_confirm;

  login_user = {
    email: "",
    password: ""
  };
  error_message = {
    login:null,
    register:null,
  };
  constructor(private _mainService: MainService, private _router: Router) { }


  create(){
    this._mainService.create_user(this.new_user,(res)=>{
        if(res.message == "success"){
          this._router.navigate(['home'])
          this.error_message.register = null
        }else{
          this.error_message.register = "This email has been registered!"
        }
    })
    this.new_user = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    };
    this.pass_confirm = "";
  }

  login(){
    this._mainService.login(this.login_user, (res)=>{
        if(res.message == "success"){
          this._router.navigate(['home']);
          this.error_message.login = null;          
        }else{
          this.error_message.login = res.message;
        }
    })
    this.login_user = {
      email: "",
      password: ""
    };
  }

  ngOnInit() {
    if(localStorage.user != undefined){
      this._router.navigate(['home']);
    }
    $(function() {
      
          $('#login-form-link').click(function(e) {
            $("#login-form").delay(100).fadeIn(100);
           $("#register-form").fadeOut(100);
          $('#register-form-link').removeClass('active');
          $(this).addClass('active');
          e.preventDefault();
        });
        $('#register-form-link').click(function(e) {
          $("#register-form").delay(100).fadeIn(100);
           $("#login-form").fadeOut(100);
          $('#login-form-link').removeClass('active');
          $(this).addClass('active');
          e.preventDefault();
        });
      
      });
  }

}
