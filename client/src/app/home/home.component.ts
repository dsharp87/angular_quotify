import { Component, OnInit } from '@angular/core';
import { DataService } from '.././data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: object;
  quote:object;
  _id :any;
  quotes:object[];

  constructor(private _dataservice:DataService, private _router:Router) {
    this.user = {name : '', _id: ''};
    this.quote = {quote: '', user: ''};
    this.quotes = [];
  }

  checkSess() {
    this._dataservice.checkSess( (data) => {
      // console.log(data);
      this.user = data.user;
      if(!this.user) {
        this._router.navigate(['/']);
      }
      this.quote ={
        quote: '',
        user: this.user._id
      }
      console.log(this.quote);
    });
  }

  makequote() {
    this._dataservice.Super();
    console.log(this.quote, "making quote component")
    this._dataservice.makequote(this.quote, (data)=> {
      console.log(data, 'im back bitches');
    })
  }


  delete(id) {
    console.log(id, "delete comp")
    this._dataservice.deleteQuote(id)
  }
  
  like(id){
    console.log(id, "like comp")
    this._dataservice.likeQuote(id)
  }

  ngOnInit() {
    this.checkSess();
    this._dataservice.quotechange.subscribe(
      (data) => {this.quotes = data}
    )
  }

}
