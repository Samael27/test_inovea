import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './components/collection/collection.component';

const routes: Routes = [
  { path: 'collection', component: CollectionComponent },
  { path: '', redirectTo: '/collection', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
