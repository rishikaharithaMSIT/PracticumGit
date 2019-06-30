import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  uri = 'http://localhost:4000';
  user : any;
  stockdetails : any;
  addedproducts : any = [];
  constructor(private http : HttpClient) { }
  //------------------------------------------------------------------------
  //SignUp user
  addUser(data,role) {
    this.user = {
      role : role,
      name : data.name,
      organisation : data.orgname,
      phone : data.phnum,
      email : data.email,
      password :data.password,
      address : data.address,
      pincode : data.pincode,
      doc : data.proofdoc,
      gstNumber : data.gstnum
    };
    //console.log(this.user);
    return this.http.post(`${this.uri}/user/add`,this.user);
  }

  //login User 
  login(data,role) {
    this.user = {
      role : role,      
      email : data.useremail,
      password :data.password,
      
    };
    console.log(this.user);
    return this.http.post(`${this.uri}/user/login`,this.user);
  }

  //add manufacturer stock
  addmStock(data, email, currentLocation){
    this.user = {
      name : data.drugName,
      dosage : data.dosage,
      manufactureDate : data.fromDate,
      expiryDate : data.endDate,
      batchId : data.batchId,
      price:data.price,
      manufacturer : email,
      distributer : null,
      retailer : null,
      consumer : null,
      currentLocation : currentLocation
    }
    return this.http.post(`${this.uri}/stock/addstock`,this.user);
  }

  //to get stock from db
  getAllStock(role,email){
    console.log(role + " " + email)
    this.user = {
      role : role,
      email : email
    }
    return this.http.post(`${this.uri}/stock/getallStock`,this.user);
  }

  getaddedproducts() {
    return this.addedproducts;
  }

  //to get sellers
  getSellers(){
    // console.log(roleType);
    return this.http.get(`${this.uri}/user/getSellers`);
  }

  //to set sellers
  setSellers(role, email, id, currentLocation){
    this.user = {
      role : email,
      email : role,
      currentLocation : currentLocation,
      id : id
    }
    return this.http.post(`${this.uri}/stock/setSellers`,this.user);
  }

  //to get location
  getLocation(email, role) {
    this.user = {
      role : role,
      email : email
    }
    return this.http.post(`${this.uri}/user/getLocation`,this.user);
  }

  //send Mail
  sendEmail(from,to,data){
    console.log("in service");
    this.user = {
      from : from,
      to : to,
      data :data
    }
    return this.http.post(`${this.uri}/mail/sendMail`,this.user);
  }

  updateStock(stockarray, location) {
    console.log(this.addedproducts + "added Products in");
    this.stockdetails = {
      stocktest : stockarray,
      loc : location
    }
    console.log("ENtered into serve");
    return this.http.post(`${this.uri}/updateStock`,this.stockdetails);
  }

}
