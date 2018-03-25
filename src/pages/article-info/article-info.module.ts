import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArticleInfoPage } from './article-info';

@NgModule({
  declarations: [
    ArticleInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ArticleInfoPage),
  ],
})
export class ArticleInfoPageModule {}
