import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService} from 'angular2-flash-messages';
import {UsersService} from '../users.service';
import { Router,ActivatedRoute,Params  } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login : FormGroup;
  submitted = false;
  role : any;
  constructor(private formbuilder : FormBuilder, private route : ActivatedRoute,private router: Router,private userService : UsersService,private flashMessage : FlashMessagesService) { 
    this.role = this.route.snapshot.params['role'];
  }

  ngOnInit() {
    this.login = this.formbuilder.group({
      useremail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get l() { return this.login.controls; }

  loginUser() {
    //console.log(this.login.value);
    this.userService.login(this.login.value, this.role).subscribe((data)=>{
      if(data) {
        
        this.router.navigate(['/view/'+this.role+'/'+this.login.value.useremail]);
        
        // this._location.back();
      } else {        
        console.log("Not a user");
        this.flashMessage.show("Email/phone or password is incorrect! Try again!",{cssClass :'alert-danger',timeout:5000});

      }
    });
  }

}
