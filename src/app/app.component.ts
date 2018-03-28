import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { LogPage } from '../pages/log/log';
import { Events } from 'ionic-angular';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LogPage;
  theme : any = "defaut";

  constructor(platform: Platform, public storage:Storage, statusBar: StatusBar, splashScreen: SplashScreen, public events : Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.storage.get("theme").then((value) => {this.theme = value});
    this.events.subscribe('functionCall:updateTheme', eventData => { 
      console.log("receive");
        this.theme = eventData;
    });
  }
}
