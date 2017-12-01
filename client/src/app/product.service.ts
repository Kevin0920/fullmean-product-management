import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class ProductService {

  products=[];
  user;

  constructor(private _http: Http) {
    if(localStorage.user !== undefined) {
        this.user = JSON.parse(localStorage.user);
      }
   }
  // create product
  create(products, callback) {
    console.log(products);
        console.log("create service route");
    this._http.post('/products', products).subscribe(
      (res)=>{
        callback(res);
      },
      (err)=>{
        console.log(err);
      }
    )
  }
  // register user
  register(data, callback) {
    this._http.post("/register", data).subscribe(
      (res) => {
        console.log("from service register: ", res.json());
        callback(res.json());
        if(res.json().success = "success") {
          this.user = res.json().user;
          localStorage.user = JSON.stringify(res.json().user);
        }
      },
      (err) => {
        console.log(err);
      })
    }

  login(data, callback) {
    this._http.post("/login", data).subscribe(
      (res) => {
        callback(res);
        this.user = res.json();
        console.log(this.user);
        localStorage.user = JSON.stringify(res.json());
      },
      (err) => {
        console.log("error from login service: ", err);
      })
    }

    getPostNewPro(id, data) {
      this._http.put('/products/edit/' + id, data).subscribe(
        (res)=>{
        console.log("success update from service");
        },
        (err)=>{
        console.log("fail update product", err);
        }
      )

    }

    retrieveOneProduct(id, callback) {
      this._http.get('/products/' + id).subscribe((res)=>{
        console.log(res.json());
        callback(res.json());
      })
    }

    retrieveProduct(callback) {
      console.log("retrieve all products in list component");
      this._http.get('/products').subscribe(
        (res)=>{
          callback(res.json());
        },
        (err)=>{
          console.log(err);
        }
      )
    }

    delete(id, callback) {
      console.log("delete method");
      this._http.delete('/products/' + id).subscribe(
        (res)=> {
          callback(res.json());
        },
        (err)=> {
          console.log(err);
        }
      )
    }
  }
