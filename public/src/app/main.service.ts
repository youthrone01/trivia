import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import io from "socket.io-client";
import {BehaviorSubject} from 'Rxjs';

@Injectable()
export class MainService {
login_user;
home_message;

is_login: BehaviorSubject<any[]> = new BehaviorSubject([])

  constructor(private _http:Http) {
    if(localStorage.user){
      this.login_user = JSON.parse(localStorage.user);
    }
   }

  create_user(user, callback){
    this._http.post('/users', user).subscribe(
      (res)=>{
        console.log('success 1');
        callback(res.json());
        if(res.json().message == "success"){
          this.login_user = res.json().user;
          localStorage.setItem('user',JSON.stringify(res.json().user));
          this.update_logiin_status([true])  
        }
      },
      (error)=>{
        console.log("error 1");
      }
    )
  };

  login(user, callback){
    this._http.post('/login', user).subscribe(
      (res)=>{
        console.log('success 2');
        callback(res.json());
        if(res.json().message == "success"){
          this.login_user = res.json().user;
          localStorage.setItem('user',JSON.stringify(res.json().user));
          this.update_logiin_status([true])  
        }
      },
      (error)=>{
        console.log("error 2");
      }
    )
  };

  create_question(question, callback){
    this._http.post('/questions', question).subscribe(
      (res)=>{
        console.log('success 3');
        callback(res.json());
      },
      (error)=>{
        console.log("error 3");
      }
    )
  };

  get_questions(callback){
    this._http.get('/questions').subscribe(
      (res)=>{
        console.log('success 4');
        callback(res.json());
      },
      (error)=>{
        console.log("error 4");
      }
    )
  };

  create_result(result, callback){
    this._http.post('/results', result).subscribe(
      (res)=>{
        console.log('success 5');
        callback(res.json());
      },
      (error)=>{
        console.log("error 5");
      }
      )
  };

  get_all_result(callback){
    this._http.get('/results').subscribe(
      (res)=>{
        console.log('success 6');
        callback(res.json());
      },
      (error)=>{
        console.log("error 6");
      }
    )
  };

  update_logiin_status(data){
    this.is_login.next(data);
  };

  search_results(keyword, callback){
    this._http.post('/results/search', {keyword:keyword}).subscribe(
      (res)=>{
        console.log('success 7');
        callback(res.json());
      },
      (error)=>{
        console.log("error 7");
      }
    )
  };

  get_online_questions(callback){
    this._http.get('/oxford').subscribe(
      (res)=>{
        console.log('success 8');
        callback(res.json());
      },
      (error)=>{
        console.log("error 8");
      }
    )
  }
}
