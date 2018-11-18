import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { Profile } from '../../modals/profile';
import { HomePage } from './../home/home';

/**
 * Generated class for the AddProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-profile',
  templateUrl: 'add-profile.html',
})
export class AddProfilePage {
  
  profile = {} as Profile;
  constructor(private afAuth: AngularFireAuth, private aDatabase: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
  }


  createProfile() {
    this.afAuth.authState.take(1).subscribe(auth => {
        this.aDatabase.object(`profile/user/${auth.uid}`).set(this.profile)
          .then(() => this.navCtrl.setRoot(HomePage));
    })
  }

}
