import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService} from 'angular2-flash-messages';
import {UsersService} from '../users.service';
import { Router,ActivatedRoute,Params  } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  role:any;
  email:any;
  expiry : any;
  myDate = new Date();
  date :  any;
  aboutToExpire : any;
  expired : any;
  constructor(private datePipe: DatePipe,private formbuilder : FormBuilder, private route : ActivatedRoute,private router: Router,private userService : UsersService,private flashMessage : FlashMessagesService) { 
    this.role = this.route.snapshot.params['role'];
    this.email = this.route.snapshot.params['email'];
    this.expiry = 0;
    this.date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(this.date);
    this.aboutToExpire = [];
    this.expired = [];
    
  }
    
  ngOnInit() {
    this.expiryDate();
  }
  expiryDate(){
    let currentDate = new Date(this.date);
       
    if (this.expiry == 0) {
      this.expiry = 1;
    }else {
      this.expiry = 0;
    }

    this.userService.getAllStock(this.role, this.email).subscribe((data)=>{
      if(data) {
        //console.log(data[0][0]);
        for(var i = 0; i < data[0].length;i++){
          console.log(data[0][i]);
          let expiresOn = new Date(data[0][i].expiryDate);
          let beforeDate = new Date(currentDate.getTime() + 5*86400000);
          console.log("current " + currentDate);
          console.log("beforeDate " + beforeDate);
          console.log("expiresOn " + expiresOn);
          if(currentDate >= expiresOn) {
              this.expired.push(data[0][i]);
          }
          if(beforeDate >= expiresOn && expiresOn > currentDate) {
            if (this.expired.indexOf(data[0][i]) == -1) {
              this.aboutToExpire.push(data[0][i]);
            }
          }
        }
      } else {        
        
      }
    });

  }

}
