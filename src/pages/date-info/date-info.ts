import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController  } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Calendar } from '@ionic-native/calendar';

/**
 * Generated class for the DateInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-date-info',
  templateUrl: 'date-info.html',
})
export class DateInfoPage {
	data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public storage: Storage,private calendar: Calendar,private toastCtrl: ToastController) {
  	  	this.data = navParams.get("_data");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DateInfoPage');
  }

   closeModal() {
    this.viewCtrl.dismiss();
  }

  addToCalendar()
  {
    let date = new Date(this.data.date.toLocaleString('fr-FR', { timeZone: 'UTC' }));
    this.calendar.createCalendar('MyCalendar').then(
    (msg) => { console.log(msg); },
      (err) => { console.log(err); }
    );
    this.calendar.createEventInteractively(this.data.titre,"",this.data.texte,date,date).then((success) =>
    {
      let toast = this.toastCtrl.create({
        message: 'Date ajouté au calendrier !',
        position: 'bottom',
        showCloseButton: true,
        closeButtonText:"Fermer",
      });
      toast.present();
    });

  }
}
