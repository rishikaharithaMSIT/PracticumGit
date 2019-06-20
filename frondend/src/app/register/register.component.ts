import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService} from 'angular2-flash-messages';
import { pwdvalidator } from './cnfrmpwdvalidator';
import {UsersService} from '../users.service';
import { Router,ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerform : FormGroup;
  submitted = false;
  role : any;
  constructor(private formbuilder : FormBuilder, private route : ActivatedRoute,private router: Router,private flashMessage : FlashMessagesService,private userService : UsersService) { 
    this.role = this.route.snapshot.params['role'];
  }

  ngOnInit() {
    this.registerform = this.formbuilder.group({
      name: ['', Validators.required],
      orgname: ['', Validators.required],
      phnum: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.minLength(6)]],
      proofdoc: ['', Validators.required],
      gstnum: ['', [Validators.required, Validators.minLength(15)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      cnfrmpwd: ['', [Validators.required, Validators.minLength(6), pwdvalidator]],
    });
  }

  get f() { return this.registerform.controls; }

  handleSubmit() {
    console.log(this.registerform.value);
    this.userService.addUser(this.registerform.value, this.role).subscribe((data) => {
      console.log(data);
      if(data) {
        this.flashMessage.show("Email or phone already exists!",{cssClass :'alert-danger',timeout:5000});
      }
      else {
        console.log("suces");
        this.router.navigate(['/login/'+this.role]);
      }
      //this.router.navigate(['/login']);
    });
  }

}
