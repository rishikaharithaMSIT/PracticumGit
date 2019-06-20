import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import {UsersService} from '../users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  cusform : FormGroup;
  medicines:any;
  ishidden = true;
  totalprice = 0;
  prods:any;
  searchText:any;
  cusNameval:any;
  role : any;
  email : any;
  phone : any;
  stockList :any;
  cost: number;
  id:any;

  constructor(private route : ActivatedRoute,private router: Router, private userService : UsersService, private formbuilder : FormBuilder ) {
    this.searchText = ''; 
    this.role = this.route.snapshot.params['role'];
    this.email = this.route.snapshot.params['email'];
  }

  ngOnInit() {
    this.cusNameval = '';
    this.cusform = this.formbuilder.group({
      cusName: ['', Validators.required]
    });
    this.userService.getAllStock(this.role, this.email).subscribe((data) => {
      
      //console.log(data[0][0].name);
      for(var i = 0;i<data[0].length;i++) {
        if(data[0][i].distributer == null) {
          data[0][i].distributer = "not sold";
        }
        if(data[0][i].retailer == null) {
          data[0][i].retailer = "not sold";
        }
        if(data[0][i].consumer == null) {
          data[0][i].consumer = "not sold";
        }
      }
      
      this.medicines = data[0];
      console.log(this.medicines);
      
      
    });
    this.prods = [];
    
  }

  AddProd(Value) {
    this.prods.push(Value);
    this.cost = +Value.price;
    this.totalprice = this.totalprice + this.cost;
  }

  display(event) {
    if(this.searchText == '') {
      this.ishidden = true;
    } else {
      this.ishidden = false;
    }
  }

  DelProd(Value) {
    console.log(Value);
    var index = this.prods.indexOf(Value);
    this.cost = +Value.price;
    this.totalprice = this.totalprice - this.cost;
    this.prods.splice(index,1);
  }

  Checkout() {
    //console.log(this.cusform.value.cusName);
    //console.log(this.prods);
    for(var i = 0;i< this.prods.length;i++){
      this.id = this.prods[i]._id;
      console.log(this.id);
      this.userService.setSellers(this.cusform.value.cusName , "consumer",this.id).subscribe((data) => {
      
     });
    }
    
  }

}
