import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Profile } from '../../modals/profile';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  profileData : FirebaseObjectObservable<Profile>;
  
  constructor(private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad(){
    this.afAuth.authState.take(1).subscribe(data =>{
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to OnTheTop, ${data.email}`,
          duration: 3000
        }).present();

        this.profileData = this.afDatabase.object(`profile/${data.uid}`);
      }
      else{
        this.toast.create({
          message: `Could not find your account`,
          duration: 3000
        }).present();
      }
    })
  }

}
