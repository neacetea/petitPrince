import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DateInfoPage } from './date-info';

@NgModule({
  declarations: [
    DateInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DateInfoPage),
  ],
})
export class DateInfoPageModule {}
