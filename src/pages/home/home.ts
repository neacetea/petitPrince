import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ModalController } from 'ionic-angular';
import { ArticleInfoPage } from '../article-info/article-info';
import { FavoritePage } from '../favorite/favorite';
import { Storage } from '@ionic/storage';
import { TutorialPage } from '../tutorial/tutorial';

import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	articles : any;
	dates : any;
	galeries : any;
	filtered : any = [];

  constructor(public navParams : NavParams, public navCtrl: NavController,public http: Http, private modalCtrl: ModalController, public storage : Storage) {

  	storage.get('new').then((val) => {
  			if(val == true)
  			{
  				let tuto = this.modalCtrl.create(TutorialPage);
    			tuto.present();
    			tuto.onDidDismiss(() => {
    				storage.set('new', false);
    			});
  			}
  	});

    console.log(this.navParams.data);
  	this.http.get('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?login=' + this.navParams.data.login + '&mdp=' + this.navParams.data.password)
  	.map(res => res.json())
  	.subscribe(data => {
    	this.articles = data.articles;
    	this.dates = data.dates;
    	this.galeries = data.galeries;
      this.initializeItems();
      this.articles.forEach(element => {
        this.storage.get(element.id).then(data=>
        {
          if(data)
          {
            element.fav = true;
          }
          else
          {
            element.fav = false;
          }
        });
      });
  	});
	}

	showInformation(data)
	{
		let modal = this.modalCtrl.create(ArticleInfoPage,{_data: data});
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
    this.initializeItems();
      this.articles.forEach(element => {
        this.storage.get(element.id).then(data=>
        {
          if(data)
          {
            element.fav = true;
          }
          else
          {
            element.fav = false;
          }
        });
      });
  	refresher.complete();
	});
  }

  initializeItems() {
    this.filtered = [];
  	this.articles.forEach(element => {
    	this.filtered.push(element);
	  });
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filtered = this.filtered.filter((item) => {
        return (item.titre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}