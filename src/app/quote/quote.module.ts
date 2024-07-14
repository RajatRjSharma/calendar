import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteRoutingModule } from './quote-routing.module';
import { QuoteComponent } from './quote.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [QuoteComponent],
  imports: [CommonModule, QuoteRoutingModule, MatButtonModule],
})
export class QuoteModule {}
