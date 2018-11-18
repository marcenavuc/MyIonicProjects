import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  arrData = []
  card = {
    title: "",
    description: "",
  }

  constructor(private afDatabase: AngularFireDatabase,
    public navCtrl: NavController) {
      this.afDatabase.list('profile/').valueChanges().subscribe(data =>{
        this.arrData = data;
        console.log(this.arrData);
      })
  }

  add(){
    this.afDatabase.list('users/').push(this.card);
    console.log(this.card);
  }

}
