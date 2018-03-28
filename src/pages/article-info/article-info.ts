import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ArticleInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article-info',
  templateUrl: 'article-info.html',
})
export class ArticleInfoPage {
data: any;
favorite : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController, public storage : Storage,private toastCtrl: ToastController) {
  	this.data = navParams.get("_data");
    this.favorite = this.data.fav;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticleInfoPage');
  }

   closeModal() {
    this.viewCtrl.dismiss();
  }

  setFav(value,element)
    {
      this.favorite = value.value;
      element.fav = value.value;
      if(value.value == true)
      {
        this.storage.set(element.id,element);
        let toast = this.toastCtrl.create({
          message: 'Article ajouté aux favoris !',
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      }
      if(value.value == false)
      {
        this.storage.remove(element.id);
        let toast = this.toastCtrl.create({
          message: 'Article retiré des favoris !',
          duration: 3000,
          position: 'middle'
        });
        toast.present();
      }
    }
}
