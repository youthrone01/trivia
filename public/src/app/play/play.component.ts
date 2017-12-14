import { Component, OnInit } from '@angular/core';
import { MainService } from "./../main.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  user = {
    first_name:"",
    last_name :"",
  } ;
  questions=[];
  random_answers=[];
  
  submit_answers = [
    {answer:""},
    {answer:""},
    {answer:""},
    {answer:""},
  ];

  constructor(private _mainService: MainService, private _router: Router) { }
  
  make_random_answer(question){
    for(var i =0; i < question.length; i++){
      var arr = []
      arr.push(question[i].answer);
      arr.push(question[i].fake_one);
      arr.push(question[i].fake_two);
      arr.push(question[i].fake_three);
      this.random_answers.push(arr);
    }
    
    this.random_answers.map(function(ele){
      for (var i = ele.length-1; i >=0; i--) {
        
           var randomIndex = Math.floor(Math.random()*(i+1)); 
           var itemAtIndex = ele[randomIndex];						
           ele[randomIndex] = ele[i]; 
           ele[i] = itemAtIndex;
         }
         return ele;
    })
    console.log(this.random_answers);
  }

  cancel(){
    this._router.navigate(['home']);
    this.submit_answers = [
    {answer:""},
    {answer:""},
    {answer:""},
    {answer:""},
  ];
    
  }

  onSubmit(){
    var count = 0;
    for(var i = 0; i < 4; i++){
      if(this.submit_answers[i].answer == this.questions[i].answer){
        count ++;
      }
    }
    var name = this.user.first_name +" "+this.user.last_name
    var percentage = (count / 4).toFixed(2);
    this._mainService.create_result({name: name, score:count, percentage:percentage}, (res)=>{
      if(res.message == "success"){
        this._router.navigate(['home']);
        if(count == 4){
          this._mainService.home_message = "That's great, "+name+"! Your score is 4/4(100%).";
          
        }else if(count == 3){
          this._mainService.home_message = "That's good, "+name+"! Your score is 3/4(75%). Please try again!!"
          
        }else{
          var per = (count / 4) * 100;
          this._mainService.home_message = "That's fine, "+name+"! Your score is "+count+"/4("+ per+"%). Please try again!!"
        }
    }
    })
  }
  
  ngOnInit(){
    if(localStorage.user == undefined){
      this._router.navigate(['']);
    }else{
      this._mainService.home_message = null;
      this.user = this._mainService.login_user
      this._mainService.get_questions((res)=>{
        this.questions = res;
        this.make_random_answer(this.questions);
      })
    }
  }

}
