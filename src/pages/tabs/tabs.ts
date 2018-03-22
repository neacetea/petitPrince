import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

	data : any;

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public params : NavParams) {
  	console.log(this.params.get('login'));
  	this.data = {
  			login: this.params.get('login'),
			password: this.params.get('password')
  	};
  	console.log(this.data);
  }
}
