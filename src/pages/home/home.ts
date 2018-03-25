import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { TabsPage } from '../tabs/tabs';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { DatePage } from '../date/date';
import { ModalController } from 'ionic-angular';
import { ArticleInfoPage } from '../article-info/article-info';


import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	articles : any;
	dates : any;
	galeries : any;
  constructor(public navParams : NavParams, public navCtrl: NavController,public http: Http, private modalCtrl: ModalController) {

  	console.log(this.navParams.data);
	this.http.get('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?login=' + this.navParams.data.login + '&mdp=' + this.navParams.data.password)
	.map(res => res.json())
	.subscribe(data => {
	this.articles = data.articles;
	this.dates = data.dates;
	this.galeries = data.galeries;
		});
	}

	showInformation(data)
	{
		let modal = this.modalCtrl.create(ArticleInfoPage,{_data: data});
    	modal.present();
	}
}