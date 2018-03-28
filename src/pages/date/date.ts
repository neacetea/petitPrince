import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ModalController } from 'ionic-angular';
import { DateInfoPage } from '../date-info/date-info';
import { Storage } from '@ionic/storage';
import { FavoritePage } from '../favorite/favorite';

/**
 * Generated class for the DatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-date',
  templateUrl: 'date.html',
})
export class DatePage {
  articles : any;
  dates : any;
  galeries : any;
  dateValue : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http : Http, public modalCtrl : ModalController, public storage: Storage) {
  	 		console.log(this.navParams.data);
      	this.http.get('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?login=' + this.navParams.data.login + '&mdp=' + this.navParams.data.password)
        .map(res => res.json())
        .subscribe(data => {
        	this.articles = data.articles;
        	this.dates = data.dates;
        	this.galeries = data.galeries;
        	console.log(this.galeries);

      	});
	}

    showInformation(data)
    {
      let modal = this.modalCtrl.create(DateInfoPage,{_data: data});
      modal.present();
    }
  OpenFavorite()
  {
    let modal = this.modalCtrl.create(FavoritePage);
      modal.present();
  }
    ionViewDidLoad() {
      console.log('ionViewDidLoad DatePage');
    }

    rafraichirListe(refresher)
    {
       this.http.get('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?login=' + this.navParams.data.login + '&mdp=' + this.navParams.data.password)
      .map(res => res.json())
      .subscribe(data => {
      this.articles = data.articles;
      this.dates = data.dates;
      this.galeries = data.galeries;
      this.dates.forEach(element => {
            this.storage.get(element.id).then(data=>
            {
            if(data)
            {
              element.fav = true;
            }
            else
            {
              element.fav = false;
            }});
          });
      refresher.complete();
      });
    }
}
