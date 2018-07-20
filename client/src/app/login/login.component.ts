import { Component, OnInit } from '@angular/core';
import { DataService } from '.././data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:object;

  constructor(private _dataservice:DataService, private _router:Router) { 
    this.user = {name: ''}
  }

  login() {
    console.log("compoent login initialized", this.user)
    this._dataservice.login(this.user, (data)=> {
      console.log('compoent login callback', data);
      if (data.user){
        console.log("inside if");
        this._router.navigate(['/home']);
      }
    });
  }

  ngOnInit() {
  }

}
