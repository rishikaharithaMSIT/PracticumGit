import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router,ActivatedRoute,Params } from '@angular/router';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-addm-stock',
  templateUrl: './addm-stock.component.html',
  styleUrls: ['./addm-stock.component.css']
})
export class AddmStockComponent implements OnInit {
  addStockGroup : FormGroup;
  role:any;
  email : any;
  currentLocation :any;
  constructor(private formbuilder : FormBuilder, private userService : UsersService,private route : ActivatedRoute,private router: Router,private flashMessage : FlashMessagesService) {
    this.role = this.route.snapshot.params['role'];
    this.email = this.route.snapshot.params['email'];
    this.currentLocation = "";

   }

  ngOnInit() {
    this.addStockGroup = this.formbuilder.group({
      drugName: ['', Validators.required],
      dosage: ['', Validators.required],
      batchId: ['', Validators.required],
      fromDate: ['', Validators.required],
      endDate: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  get l() { return this.addStockGroup.controls; }

  addmStock() {
    //console.log(this.addStockGroup.value);
    this.userService.getLocation(this.email,this.role).subscribe((data)=>{
      if(data) {        
        //console.log(data[0].pincode + " the data");
        this.currentLocation = data[0].pincode;
        this.userService.addmStock(this.addStockGroup.value, this.email,this.currentLocation).subscribe((data)=>{
          if(data) {        
            this.router.navigate(['/view/'+this.role+'/'+this.email]);        
            // this._location.back();
          } else {        
            this.router.navigate(['/view/'+this.role+'/'+this.email]);
          }
        });
      
      } 
    });
    
  }
}
