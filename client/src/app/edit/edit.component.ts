import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product = {
    title:"",
    price:"",
    image_url:""
  };
  id;
  constructor(private _service: ProductService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params=>{
      console.log(params.get('id'));
      this._service.retrieveOneProduct(params.get('id'),(res)=>{
        this.product = res;
        this.id = params.get('id');
        console.log(this.id);
      })
    })
  }
  
  updateProduct(id){
    this._service.getPostNewPro(this.id, this.product);
    this._router.navigate(['list']);
    this.product = {
      title:"",
      price:"",
      image_url:""
    };
  }

}
