import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  err_message = {
    err:""
  }
  user_reg = {
    userName:"",
    email:"",
    password:""
  }

  user_login = {
    email:"",
    password:""
  }

  constructor(private _service: ProductService, private _route: Router) { }

  login() {
    this._service.login(this.user_login, (res) => {
      console.log("front login: ", res.json());
      console.log("login data sending route");
      this.user_login = {
        email:"",
        password:""
      }
    });
    this._route.navigate(['/create']);
  }

  register() {
    this._service.register(this.user_reg, (res) => {
      console.log(res.json());
      console.log("register data sending route");
      this.user_reg = {
        userName:"",
        email:"",
        password:""
      };
    });
    // navigate the route in front end in app-routing
    this._route.navigate(['/create']);
  }


  ngOnInit() {
  }

}
