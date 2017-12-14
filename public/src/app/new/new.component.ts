import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  new_question = {
    content:"",
    answer:"",
    fake_one:"",
    fake_two:"",
    fake_three:"",
  }
  constructor(private _mainService: MainService, private _router: Router) { }

  cancel(){
    this.new_question = {
      content:"",
      answer:"",
      fake_one:"",
      fake_two:"",
      fake_three:"",
    }
    this._router.navigate(['home']);
  }
  create(){
    this._mainService.create_question(this.new_question, (res)=>{
      if(res.message == 'success'){
        this._mainService.home_message = "The question you just created was successfully added!!"
        this._router.navigate(['home']);
      }
    })
    this.new_question = {
      content:"",
      answer:"",
      fake_one:"",
      fake_two:"",
      fake_three:"",
    }
  };

  ngOnInit() {
    if(localStorage.user == undefined){
      this._router.navigate(['']);
    }else{
      this._mainService.home_message = null;
    }
  }

}
