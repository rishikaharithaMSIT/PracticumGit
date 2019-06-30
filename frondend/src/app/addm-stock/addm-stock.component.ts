import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService} from 'angular2-flash-messages';
import { Router,ActivatedRoute,Params } from '@angular/router';
import {UsersService} from '../users.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-addm-stock',
  templateUrl: './addm-stock.component.html',
  styleUrls: ['./addm-stock.component.css']
})
export class AddmStockComponent implements OnInit {
  // @Input() usermail : any;
  // @Input() userrole : any;
  addStockGroup : FormGroup;
  role:any;
  email : any;
  currentLocation :any;
  constructor(private formbuilder : FormBuilder, private userService : UsersService,private route : ActivatedRoute,private router: Router,private flashMessage : FlashMessagesService ) {
    this.role = this.route.snapshot.params['role'];
    this.email = this.route.snapshot.params['email'];
    this.currentLocation = "";
    

   }

  ngOnInit() {
    //console.log(this.email + " in add stock" + this.role);
    this.addStockGroup = this.formbuilder.group({
      drugName: ['', Validators.required],
      dosage: ['', Validators.required],
      batchId: ['', Validators.required],
      fromDate: ['', Validators.required],
      endDate: ['', Validators.required],
      price: ['', Validators.required],
      quantity : ['',Validators.required]
    });
  }

  // openScrollableContent(longContent) {
  //   console.log("ENtered");
  //   this.modalService.open(longContent, { scrollable: true });
  // }

  get l() { return this.addStockGroup.controls; }

  addmStock() {
    //console.log(this.addStockGroup.value);
    this.userService.getLocation(this.email,this.role).subscribe((data)=>{
      if(data) {        
        //console.log(data[0].pincode + " the data");
        this.currentLocation = data[0].pincode;
        
        for(var i = 0; i < this.addStockGroup.value.quantity;i++) {
          this.userService.addmStock(this.addStockGroup.value, this.email,this.currentLocation).subscribe((data)=>{
            if(data) {
              //window.location.reload(); 
              // console.log("here in");  
              // opener.location.reload();
              // window.close();     
              this.router.navigate(['/view/'+this.role+'/'+this.email]);        
              // this._location.back();
            } else { 
              console.log("here else");  
              //opener.location.reload();
              //window.location.reload();     
              this.router.navigate(['/view/'+this.role+'/'+this.email]);
            }
          });
        }      
      
      } 
    });
    
  }
}
