import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit {
  role : any;
  email : any;
  stockList :any;
  st:any;
  
  constructor(private route : ActivatedRoute,private router: Router, private userService : UsersService) { 
    this.role = this.route.snapshot.params['role'];
    this.email = this.route.snapshot.params['email'];
    
  }

  ngOnInit() {
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
      
      this.stockList = data[0];
      this.st = data;
      console.log(this.stockList);

      
    });
  }

}
