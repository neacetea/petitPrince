import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
/**
 * Generated class for the GalerieInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-galerie-info',
  templateUrl: 'galerie-info.html',
})
export class GalerieInfoPage {
	data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
  	this.data = navParams.get("_data");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleInfoPage');
  }

   closeModal() {
    this.viewCtrl.dismiss();
  }

}
