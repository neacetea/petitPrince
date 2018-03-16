import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import 'rxjs/add/operator/map';

/**
 * Generated class for the LogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log',
  templateUrl: 'log.html',
})
export class LogPage {

	datas : any;
	login = "";
	password = "";
	error : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogPage');
  }

  checkCredentials()
  {
  	  let loading = this.loadingCtrl.create({
  	  	spinner:'crescent',
    content: 'Connexion...'
  	});

  	loading.present();

	 this.http.get('http://www.sebastien-thon.fr/cours/M4104Cip/projet/index.php?connexion&login=' + this.login + '&mdp=' + this.password)
	.map(res => res.json())
	.subscribe(data => {
	this.datas = data;
	console.log(this.datas);
	if(this.datas.resultat == "OK")
	{
		this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
		loading.dismiss();
	}
	else
	{
		this.error = this.datas.erreur;
		loading.dismiss();
	}
  	});
  }
}