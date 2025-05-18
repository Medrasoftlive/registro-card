import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListCardComponent } from './components/list-card/list-card.component';
import { CardComponent } from './components/card/card.component';



const routes: Routes = [
 {path: '', component: CardComponent},
 {path: 'card/crear', component: CardComponent},
 {path: 'card/lista', component: ListCardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
