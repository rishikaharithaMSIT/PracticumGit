import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import {UsersService} from '../users.service';
import { FlashMessagesService} from 'angular2-flash-messages';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNumber } from 'util';
// import * as $ from 'jquery';
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
  $ : any;

  constructor(private flashMessage : FlashMessagesService,private route : ActivatedRoute,private router: Router, private userService : UsersService, private formbuilder : FormBuilder ) {
    this.searchText = ''; 
    this.role = this.route.snapshot.params['role'];
    this.email = this.route.snapshot.params['email'];
  }

  ngOnInit() {
    this.cusNameval = '';
    this.cusform = this.formbuilder.group({
      cusName: ['', Validators.required],
      cusPhone: ['', [Validators.required, Validators.minLength(10)]],
      cusEmail: ['', Validators.email]
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
      this.medicines = [];
      for(var i = 0; i <data[0].length;i++) {
        let con  = data[0][i].consumer;
        console.log(con + " con");
        if(con == "not sold") {
          this.medicines.push(data[0][i]);
        }
      }
      //this.medicines = data[0];
      console.log(this.medicines);
      
      
    });
    this.prods = [];
   
    
  }

  

  AddProd(Value) {
    
      this.prods.push(Value);
      this.cost = +Value.price;
      this.totalprice = this.totalprice + this.cost;
    
    
    
    //console.log(Value);
    //this.medicines.remove(Value);
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
    console.log("checkout");
    //console.log(this.cusform.value.cusName);
    //console.log(this.prods);
    if(this.cusform.value.cusEmail != ""){
      console.log("checkout3");
      let from = this.email;
      let to = this.cusform.value.cusEmail;
      let data =  "<h2>Hi, "+this.cusform.value.cusName+"</h2>";
      data = data +  "<ul>";
      for(var i = 0;i< this.prods.length;i++){
        data = data + "<li>" + this.prods[i].name +" - " + this.prods[i].price +"</li>";
      }
      data = data +  "</ul>";
      data = data + "<h4> Total amount:"+ this.totalprice+"</h4>";
      console.log("checkout4");
      this.userService.sendEmail(from,to,data).subscribe((data) => {
        if(data) {
          console.log("sent");
        }
      });
      this.flashMessage.show("DONE! READY TO ADD NEXT ITEMS.",{cssClass :'alert-danger',timeout:5000});
      window.location.reload();
    
  }

    for(var i = 0;i< this.prods.length;i++){
      this.id = this.prods[i]._id;
      //console.log(this.id);
      //console.log(this.cusform.value.cusEmail + " here");
      this.userService.setSellers(this.cusform.value , "consumer",this.id,"").subscribe((data) => {
      if(data) {
        console.log("checkout 1");
        }
      
     });
    }
    console.log("checkout2");
  
  }
}

