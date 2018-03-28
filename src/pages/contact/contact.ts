import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { TutorialPage } from '../tutorial/tutorial';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { FavoritePage } from '../favorite/favorite';
import { Events } from 'ionic-angular';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	
  theme:any;

  constructor(public navCtrl: NavController, public contacts: Contacts,public modalCtrl : ModalController,public toastCtrl : ToastController,public events : Events, public storage:Storage,public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
      this.storage.get("theme").then((value) => {this.theme = value});
  }

  AfficherTuto()
  {
    let tuto = this.modalCtrl.create(TutorialPage);
    tuto.present();
  }
  
  addContact(){

  let contact : Contact = this.contacts.create(); 
    contact.name = new ContactName(null, 'Ecole', 'LePetitPrince');
	  contact.phoneNumbers = [new ContactField('mobile', '0412345678')];
	  contact.emails = [new ContactField('emails','contact@lepetitprince.fr')];
	  contact.save().then(
      () => {console.log('Contact saved!', contact);
      let toast = this.toastCtrl.create({
        message: 'Contact ajouté !',
        position: 'bottom',
        duration: 3000,
        showCloseButton: true,
        closeButtonText:"Fermer",
      });
      toast.present();
    },
      (error: any) => console.error('Error saving contact.', error)
    );
  }
  OpenFavorite()
  {
    let modal = this.modalCtrl.create(FavoritePage);
      modal.present();
  }

  updateTheme()
  {
    console.log("sent");
    this.events.publish('functionCall:updateTheme', this.theme);
    this.storage.set("theme",this.theme);
  }

  ViderFavoris()
  {
    let alert = this.alertCtrl.create({
    title: 'Vider les favoris ?',
    message: 'Voulez vous vraiment vider vos favoris ? (La récupération est impossible)',
     cssClass: 'ios-alert',
    buttons: [
      {
        text: 'Non',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Oui',
        handler: () => {
          let loading = this.loadingCtrl.create({
          spinner:'crescent',
          content: 'Suppression...'
          });
          loading.present();

          this.storage.forEach( (value, key, index) => {
          if(key != "credentials" && key != "new" && key != "theme")
              this.storage.remove(key);
          });
          loading.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

}
