import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalenderComponent } from './calender/calender.component';

const routes: Routes = [
  { path: '', component: CalenderComponent },
  // {
  //   path: 'quote',
  //   loadChildren: () =>
  //     import('./quote/quote.module').then((m) => m.QuoteModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
