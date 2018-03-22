import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { TabsPage } from '../tabs/tabs';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { DatePage } from '../date/date';

import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	datas : any;
  constructor(public navParams : NavParams, public navCtrl: NavController,public http: Http) {

  	console.log(this.navParams.data);
	this.http.get('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?login=' + this.navParams.data.login + '&mdp=' + this.navParams.data.password)
	.map(res => res.json())
	.subscribe(data => {
	this.datas = data;
	console.log(this.datas);
		});
	}
}