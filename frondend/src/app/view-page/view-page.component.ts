import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import {UsersService} from '../users.service';
// import * as $ from 'jquery';
var $ = jQuery;
// var dt = require("datatables.net")(window, $);
// var dt = require( 'datatables.net')();

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit {
  role : any;
  email : any;
  stockList :any;
  stocktable : any;
  st:any;

  
  

  @ViewChild('stocktable') table : ElementRef;
  
  constructor(private route : ActivatedRoute,private router: Router, private userService : UsersService) { 
    this.role = this.route.snapshot.params['role'];
    this.email = this.route.snapshot.params['email'];
    
  }

  ngViewAfterInit() {
   
  }


  ngOnInit() {

  //   

    // console.log($ + "dollar");
    // this.stocktable = $(this.table.nativeElement);
    // this.stocktable.DataTable();

    setTimeout(function() {
      $(function() {
        $('#stocktable').DataTable({
        });
      })
    }, 500);
    setTimeout(function() {
      $(function() {
        $('#stocktable1').DataTable({
        });
      })
    }, 500);
    setTimeout(function() {
      $(function() {
        $('#stocktable2').DataTable({
        });
      })
    }, 500);

    
   
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
        } else {
          data[0][i].consumer = data[0][i].consumer.cusPhone;
        }
      }
      
      this.stockList = data[0];
      this.st = data;
        console.log("Entered");
        console.log(this.stockList + "It is here");
        
      console.log(this.stockList);
      

      
    });
  }

  
}
