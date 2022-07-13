import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LuggageDomainModule } from '@flight-workspace/luggage/domain';
import { LuggageUiCardModule } from '@flight-workspace/luggage/ui-card';
import { ReportLossComponent } from './report-loss.component';

@NgModule({
  imports: [CommonModule, LuggageDomainModule, LuggageUiCardModule, RouterModule.forChild([{ path: '', component: ReportLossComponent }])],
  declarations: [ReportLossComponent],
  exports: [ReportLossComponent]
})
export class LuggageFeatureReportLossModule {}
