import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	
  constructor(public navCtrl: NavController, public contacts: Contacts) {

  }

 
  
  addContact(){
  let contact : Contact = this.contacts.create(); 
    contact.name = new ContactName(null, 'Ecole', 'LePetitPrince');
	  contact.phoneNumbers = [new ContactField('mobile', '0412345678')];
	  contact.emails = [new ContactField('emails','contact@lepetitprince.fr')];
	  contact.save();
  }

}
