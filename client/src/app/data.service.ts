import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class DataService {
  quotes:object[];
  // users:string[];
  quotechange: BehaviorSubject<Object[]>
  constructor(private _http:Http) {
    this.quotechange = new BehaviorSubject([])
    this.quotes = [];
    this.getQuotes();
  }

  login(user, callback) {
    console.log("service login", user);
    this._http.post('/login', user).subscribe((res)=> {
      console.log("service post callback", res.json())
      callback(res.json());
    });
  }
  
  checkSess(callback) {
    this._http.get('/checksess').subscribe( (res)=> {
      callback(res.json());
    })
  }

  makequote(quote, callback) {
    console.log(quote, 'made it to service');
    this._http.post('/makequote', quote).subscribe( (res) => {
      this.quotes.push(res.json())
      this.quotechange.next(this.quotes)
      console.log(res.json(), 'made back to service');

      // callback(res.json());
    })
  }

  getQuotes(){
    this._http.get('/getquotes').subscribe( (res) => {
      console.log(res.json().quotes)
      this.quotes = res.json().quotes
      this.quotes = this.SortNotes(this.quotes)  
      this.quotechange.next(this.quotes)
    })
  }

  deleteQuote(id){ 
    this._http.post(`/deletequote/${id}`, '').subscribe()
    let idx = this.quotes.findIndex( function (quote){
      return quote._id == id
    })
    this.quotes.splice(idx,1)
    this.quotechange.next(this.quotes)
    
  }

  likeQuote(id) {
    this._http.post(`/likequote/${id}`, '').subscribe()
    let idx = this.quotes.findIndex( function (quote){
      return quote._id == id
    })
    this.quotes[idx].likes++
    this.quotes = this.SortNotes(this.quotes)
    this.quotechange.next(this.quotes)
  }


  SortNotes(arr:Array<Object>): Array<Object>{
    arr.sort(function(a,b){
      if(a.likes < b.likes)
        {return 1}
      if(a.likes > b.likes)
        {return -1}
      return 0
    })
    return arr
  }

  Super() {
    console.log("super");
  }

}

