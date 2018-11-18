import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/messageservice/messageservice';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  arrData = [];
  messageList = [];
  card = {
    title: "",
    description: "",
  };

  constructor(private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth, private toast: ToastController, 
    private messageService: MessageServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    //don't works
    this.getMessages();
    //firebase get data
    this.afDatabase.list('profile/data/').valueChanges().subscribe(data =>{
      this.arrData = data;
      console.log(this.arrData);
    })
  }

  ionViewWillLoad(){
    this.afAuth.authState.take(1).subscribe(data =>{
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to OnTheTop, ${data.email}`,
          duration: 3000
        }).present();
      }
      else{
        this.toast.create({
          message: `Could not find your account`,
          duration: 3000
        }).present();
      }
    })
  }
  getMessages(){
    this.messageService.getMessages().subscribe(data => this.messageList = data);
  }

  goList(){
    this.navCtrl.push('ListsPage');
  }

  add(){
    this.afDatabase.list('profile/data/usles').push(this.card);
    console.log(this.card);
  }
}
