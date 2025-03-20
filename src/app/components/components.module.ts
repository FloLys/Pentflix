import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscoverBannerComponent } from './discover-banner/discover-banner.component';

const COMPONENTS = [DiscoverBannerComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule
  ],
  exports: [COMPONENTS]
})
export class ComponentsModule { }
