
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LogPage } from '../pages/log/log';
import { DatePage } from '../pages/date/date';
import { ArticleInfoPage } from '../pages/article-info/article-info';
import { GalerieInfoPage } from '../pages/galerie-info/galerie-info';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { DateInfoPage } from '../pages/date-info/date-info';
import { Calendar } from '@ionic-native/calendar';
import { FavoritePage } from '../pages/favorite/favorite';
import { Contacts } from '@ionic-native/contacts';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { registerLocaleData } from '@angular/common';
import { Network } from '@ionic-native/network';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DatePage,
    DateInfoPage,
    TutorialPage,
    ArticleInfoPage,
    FavoritePage,
    GalerieInfoPage,
    LogPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
        DateInfoPage,
        FavoritePage,
    HomePage,
    TabsPage,
    LogPage,
    TutorialPage,
    ArticleInfoPage,
    GalerieInfoPage,
    DatePage
  ],
  providers: [
    StatusBar,
    Network,
    SplashScreen,
    Calendar,
    Contacts,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
