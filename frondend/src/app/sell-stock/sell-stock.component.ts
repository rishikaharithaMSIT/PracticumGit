import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-sell-stock',
  templateUrl: './sell-stock.component.html',
  styleUrls: ['./sell-stock.component.css']
})

export class SellStockComponent implements OnInit {
  @Input() role: any;
  @Input() email : any;
  stockList:any;

  sellers:String[];
  selectedSeller:any;
  sellerNames:any;
  isdisabled = false;
  isinddisabled = true;
  selectedItem = '';
  isformhidden = true;
  isbuttonhidden = true;
  isitemshidden = true;
  addedProducts:String[];
  items:any;
  Totalsellers:any;
  categories:any = [];
  sellRole : any;
  sellEmail : any;
  spl :any;
  spl2 :any;
  currentLocation : any;
  constructor(private route : ActivatedRoute,private router: Router, private userService : UsersService) { 
    this.sellers = ["manufacturer", "distributer", "retailer", "consumer"];
    // for(var i = 0; i < this.stock.length; i++) {
    //   this.items.add(this.stock[i].name);
    // }
    this.addedProducts = new Array;
  }

  ngOnInit() {
    this.sellerNames = [];
    this.Totalsellers = [];
    this.selectedSeller = '';
    var indexval = this.sellers.indexOf(this.role);
      for(var j = indexval + 1; j < this.sellers.length;j++){
        this.categories.push(this.sellers[j]);
      }
    this.userService.getAllStock(this.role, this.email).subscribe((data) => {    
      this.stockList = data[0];
      this.items = [];
      for(var i = 0; i < this.stockList.length;i++){
        console.log(this.stockList[i].distributer + " " + this.stockList[i].retailer);
        if(this.role == 'manufacturer') {
          if(this.stockList[i].distributer == null && this.stockList[i].retailer == null && this.stockList[i].consumer == null) {
            this.items.push(this.stockList[i].name + "-" +this.stockList[i]._id);
          }
        } else if(this.role == 'distributer') {
          if(this.stockList[i].retailer == null && this.stockList[i].consumer == null) {
            this.items.push(this.stockList[i].name + "-" +this.stockList[i]._id);
          }
        } else if(this.role == 'retailer') {
          if(this.stockList[i].consumer == null) {
            this.items.push(this.stockList[i].name + "-" +this.stockList[i]._id);
          }
        } 
                
      }
      
      console.log(this.items + " items");

      this.userService.getSellers().subscribe((data) => {
        this.sellerNames = data;
          // this.Totalsellers.push(data[j].email);
          
      });
      
    });

    
  }

  onChange(newValue) {
    //console.log(this.selectedSeller);
    this.spl = this.selectedSeller.split("-");
    this.sellRole = this.spl[0];
    this.sellEmail = this.spl[1];
    //console.log(sellRole + "-"+sellEmail)
    // this.sellerNames = [];
    // for(var j = 0; j < this.Totalsellers.length; j++) {
    //   if(this.Totalsellers[j].email == this.selectedSeller) {
    //     this.sellerNames.push(this.Totalsellers[j].email);
    //   }
    // }
    // this.isinddisabled = false;
    // console.log(this.selectedSeller);
    this.isdisabled = true;
    this.isformhidden = false;
  }

  filterItemsOfType(){
    return this.sellerNames.filter(x => this.categories.includes(x.role));
  }

  onAdd(newItem) {
    this.selectedItem = newItem;

  }

  cancelAdd() {
    this.addedProducts = [];
    this.isitemshidden = true;
    this.selectedItem = '';
  }

  AddItem() {
    this.addedProducts.push(this.selectedItem);
    //console.log(this.addedProducts);
    this.isitemshidden = false;
  }

  confirmStock() {
    //console.log(this.sellRole + " - " + this.sellEmail);
    //console.log(this.addedProducts + " added products");
    
    if(this.addedProducts.length == 0) {
      alert("Please add Some products!!!");
      return;
    }
    for(var i = 0;i < this.addedProducts.length;i++){
      this.spl2 = this.addedProducts[i].split("-");
      console.log(this.sellEmail + " hee " + this.sellRole);
      this.userService.getLocation(this.sellRole,this.sellEmail).subscribe((data)=>{
        if(data) {        
          console.log(data[0] + " the data");
          this.currentLocation = data[0].pincode;
          this.userService.setSellers(this.sellRole,this.sellEmail,this.spl2[1],this.currentLocation).subscribe((data) => {
            this.sellerNames = data;
              // this.Totalsellers.push(data[j].email);
            
          });
        
        } 
      });
      
      
    }
    
    this.addedProducts = [];
    this.isformhidden = true;
    this.isitemshidden = true;
    this.isdisabled = false;
    this.selectedSeller = '';
    this.selectedItem = '';
    this.router.navigate(['/view/'+this.role+'/'+this.email]);
  }

  remove(item) {
    var index = this.addedProducts.indexOf(item);
    //console.log(index);
    this.addedProducts.splice(index,1);
  }

  changeConsumer() {
    this.addedProducts = [];
    this.isformhidden = true;
    this.isitemshidden = true;
    this.isdisabled = false;
    this.selectedSeller = '';
    this.selectedItem = '';
  }

}
