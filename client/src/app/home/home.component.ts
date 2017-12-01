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
    email:"",
    password:""
  }
  user_reg = {
    userName:"",
    email:"",
    password:""
  }

  password_confirm = {
    con:""
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
      if(res.json() === null) {
        console.log(res.json());
      }
      else {
        this._route.navigate(['/create']);
      }
      this.user_login = {
        email:"",
        password:""
      }

    });
  }

  register() {
    console.log("from com register: ", this.user_reg);
    this._service.register(this.user_reg, (res) => {
      if(res.success === "success") {
        this._route.navigate(['/create']);
      }
      else {
        this.err_message.email = "This email has been registered."
      }
      this.user_reg = {
        userName:"",
        email:"",
        password:""
      };
      this.password_confirm = {
        con:""
      };
    });
  }


  ngOnInit() {
  }

}
