import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../modals/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AddProfilePage } from '../add-profile/add-profile';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(private aFuth: AngularFireAuth, 
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async register(user: User) {
    try{
    const result = await this.aFuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    console.log(result);
    this.navCtrl.setRoot(AddProfilePage);
        }
    catch(e){
      console.error(e);
    }
  }

}
