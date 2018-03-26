import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalerieInfoPage } from './galerie-info';

@NgModule({
  declarations: [
    GalerieInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(GalerieInfoPage),
  ],
})
export class GalerieInfoPageModule {}
