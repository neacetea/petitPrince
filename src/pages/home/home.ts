import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { TabsPage } from '../tabs/tabs';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	datas : any;
	params : any;
  constructor(public navParams : NavParams, public navCtrl: NavController,public http: Http) {

  	this.params = this.navParams.get('data');
  	console.log(this.navParams.get('data'));
	this.http.get('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?login=' + this.params[0] + '&mdp=' + this.params[1])
	.map(res => res.json())
	.subscribe(data => {
	this.datas = data;
	console.log(this.datas);
		});
	}
}