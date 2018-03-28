import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ViewController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ArticleInfoPage } from '../article-info/article-info';


/**
 * Generated class for the FavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {
  data : any =[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage : Storage, public viewCtrl : ViewController, public modalCtrl : ModalController,public loadingCtrl: LoadingController) {
    let loading = this.loadingCtrl.create({
        spinner:'crescent',
        content: 'Récupération...'
    });
    loading.present();
    this.data = [];
  	this.storage.forEach( (value, key, index) => {
  		if(key != "credentials" && key != "new")
			this.data.push(value);
	  });
    loading.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritePage');
  }
 closeModal() {
    this.viewCtrl.dismiss();
  }

  showInformation(data)
  {
    let modal = this.modalCtrl.create(ArticleInfoPage,{_data: data});
      modal.present();
      modal.onDidDismiss(() => {
        this.data = [];
         this.storage.forEach( (value, key, index) => {
          if(key != "credentials" && key != "new" && key != "theme")
            this.data.push(value);
          });
      });
  }
}

