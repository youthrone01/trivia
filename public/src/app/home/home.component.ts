import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message;
  list = [];
  all_results;
  key_word;
  constructor(private _mainService: MainService, private _router: Router) { }

  search(){
    this.list = [];
    if(this.key_word == ""){
      this._mainService.get_all_result((res)=>{
        this.pagination(res);
        this.all_results = this.list[0];
      })
    }else{
      this._mainService.search_results(this.key_word, (res)=>{
        this.pagination(res);
        this.all_results = this.list[0];
      })
    }
  }
  
  pagination(data){
    var arr = []
    for(var i =0; i < data.length; i++){
      arr.push(data[i]);
      if( i % 10 == 9){
        this.list.push(arr);
        arr = []
      }        
    }
    if (arr.length > 0){
      this.list.push(arr);
    }
  };

  update(num){
    this.all_results = this.list[num];
  }

  ngOnInit() {
    if(localStorage.user == undefined){
      this._router.navigate(['']);
    }else{
      this.message = this._mainService.home_message;
      this._mainService.get_all_result((res)=>{
        this.pagination(res);
        console.log(this.list);
        this.all_results = this.list[0];

      })
    }
  }

}
