import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from './../../modals/user';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from './../home/home';
import { ProfilePage } from '../profile/profile';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async login(user: User){
    try{
    const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    if (result){
      this.navCtrl.setRoot(HomePage);
    }
       }
    catch(e){
      console.log(e);
    }
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }
}
