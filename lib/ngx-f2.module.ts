import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { LoaderService } from './core/load.service';
import { F2ChartComponent } from './core/component';
import { F2ChartConfig } from './core/config';

@NgModule({
  imports: [CommonModule],
  providers: [LoaderService],
  declarations: [F2ChartComponent],
  exports: [F2ChartComponent],
})
export class F2ChartModule {
  static forRoot(config?: F2ChartConfig): ModuleWithProviders {
    return {
      ngModule: F2ChartModule,
      providers: [{ provide: F2ChartConfig, useValue: config }],
    };
  }
}
