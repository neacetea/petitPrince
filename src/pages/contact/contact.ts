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
<<<<<<< HEAD
	  contact.save().then(
      () => console.log('Contact saved!', contact),
      (error: any) => console.error('Error saving contact.', error)
    );
=======
	  contact.save();
>>>>>>> 2acc9837e6d54c86a0d09e9aa8222f7808c0a3dc
  }

}
