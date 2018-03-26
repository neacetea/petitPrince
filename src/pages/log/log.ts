import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/**
 * Generated class for the LogPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-log',
  templateUrl: 'log.html',
})
export class LogPage {

	datas : any;
	login = "";
	password = "";
	error : any;
	save : any = false;
	credentials : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public loadingCtrl: LoadingController,private toastCtrl: ToastController, public storage : Storage) {
  	this.storage.get('credentials').then((val) => {
  		if(val){
    console.log('Your age is', val);
    this.login = val.login;
    this.password = val.password;
    this.save = true;
}
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogPages');
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
		if(this.save == true)
		{
			this.credentials = {
			login: this.login,
			password : this.password,
			save : this.save
			};
		}
		else{
			this.storage.remove('credentials');
		}

		this.storage.set('credentials', this.credentials);
		this.navCtrl.setRoot(TabsPage, {login : this.login, password : this.password}, {animate: true, direction: 'forward'});
		loading.dismiss();
	}
	else
	{
		this.error = this.datas.erreur;
		loading.dismiss();
		let toast = this.toastCtrl.create({
		    message: 'Le login ou le mot de passe est incorrect !',
		    duration: 3000,
		    position: 'bottom'
		 });
		toast.present();
		return false;
	}
  	});
  }
}