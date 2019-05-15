import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

@Injectable()
export class HomePage {

  today;
  segment="Aniversarios";
  
  request: Observable<any>;
  userArray = [];
  userArrayCopy = [];

  searchBarActive = false;

  constructor(public http: HttpClient) {
    this.today = new Date().toISOString();
    this.requestgetUsers(http);
    }

  
getItems(ev: any) {//used by the searchbox - searchBoxActive value == false
  // Reset items back to all of the items 
  // set val to the value of the searchbar
  let val = ev.target.value;
  this.userArray = this.userArrayCopy;
  if (val && val.trim() != '') {    
    this.userArray = this.userArray.filter((item,index) => {      
      return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })

  }else{
    this.userArray = this.userArrayCopy;
  }
}

requestgetUsers(httpClient){
  this.request = httpClient.get('https://jsonplaceholder.typicode.com/users');
  this.request
  .subscribe(data => {
    this.userArray = data;
    this.userArrayCopy = data;
    console.log('my data: ', data);
  });
}

}
