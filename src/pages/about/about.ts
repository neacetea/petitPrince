import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ModalController } from 'ionic-angular';
import { GalerieInfoPage } from '../galerie-info/galerie-info';
import { Storage } from '@ionic/storage';
import { FavoritePage } from '../favorite/favorite';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  articles : any;
  dates : any;
  galeries : any;

  constructor(public navCtrl: NavController, public navParams : NavParams, public http : Http,public modalCtrl :ModalController) {
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
		let modal = this.modalCtrl.create(GalerieInfoPage,{_data: data});
    	modal.present();
	}
  OpenFavorite()
  {
    let modal = this.modalCtrl.create(FavoritePage);
      modal.present();
  }
	rafraichirListe(refresher)
  {
	 this.http.get('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?login=' + this.navParams.data.login + '&mdp=' + this.navParams.data.password)
	.map(res => res.json())
	.subscribe(data => {
	this.articles = data.articles;
	this.dates = data.dates;
	this.galeries = data.galeries;
	refresher.complete();
	});
  }
}
