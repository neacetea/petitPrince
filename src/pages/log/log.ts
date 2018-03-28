import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,public loadingCtrl: LoadingController,private toastCtrl: ToastController, public storage : Storage, public network : Network) {
  	storage.get('new').then((val) => { 
  		if(val == true)
  			storage.set('new', true);
  		else if(val == false)
  		{
  			storage.set('new',false);
  		}
  		else
  		{
  			storage.set('new', true);
  		}
  	});
  	
  	this.storage.get('credentials').then((val) => {
  		if(val){
    console.log('Your age is', val);
    this.login = val.login;
    this.password = val.password;
    this.save = true;
	}
  });

    var networkState = network.type;

  	if(networkState == "none")
  	{
		let toast = this.toastCtrl.create({
	    message: 'Vous n\'avez pas internet !',
	    duration: 3000,
	    position: 'bottom'
		 });
		toast.present();

		let connectSubscription = this.network.onConnect().subscribe(() => {
		  console.log('network connected!');
		  // We just got a connection but we need to wait briefly
		   // before we determine the connection type. Might need to wait.
		  // prior to doing any api requests as well.
		  setTimeout(() => {
		    if (this.network.type !== 'none') {
		      let toast = this.toastCtrl.create({
			    message: 'Vous etes maintenant connecté à internet !',
			    duration: 3000,
			    position: 'bottom'
				 });
				toast.present();
				connectSubscription.unsubscribe();
		    }
		  }, 3000);
		});
  	}
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

  	var networkState = this.network.type;
	if(networkState == "none")
	  	{
			let toast = this.toastCtrl.create({
		    message: 'Veuillez vous connecter à internet !',
		    duration: 3000,
		    position: 'bottom'
			 });
			loading.dismiss();
			toast.present();

			let connectSubscription = this.network.onConnect().subscribe(() => {
		  console.log('network connected!');
		  // We just got a connection but we need to wait briefly
		   // before we determine the connection type. Might need to wait.
		  // prior to doing any api requests as well.
		  setTimeout(() => {
		    if (this.network.type !== 'none') {
		      let toast = this.toastCtrl.create({
			    message: 'Vous etes maintenant connecté à internet !',
			    duration: 3000,
			    position: 'bottom'
				 });
				toast.present();
				connectSubscription.unsubscribe();
		    }
		  }, 3000);
		});
	  	}


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