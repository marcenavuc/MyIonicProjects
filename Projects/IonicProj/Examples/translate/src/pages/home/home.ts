import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  arrData = []

  constructor(private afDatabase: AngularFireDatabase, 
    public navCtrl: NavController) {
      this.afDatabase.list("/myItem/").subscribe(_data =>{
        this.arrData = _data;
        console.log(this.arrData);
      })
      }

  }

