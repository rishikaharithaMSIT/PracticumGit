import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule} from 'angular2-flash-messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ViewPageComponent } from './view-page/view-page.component';
import { AddmStockComponent } from './addm-stock/addm-stock.component';
import { SellStockComponent } from './sell-stock/sell-stock.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { FilterPipe} from './filter.pipe';

const routes : Routes = [  
  {path: '' , component: HomepageComponent},
  {path: 'register/:role', component: RegisterComponent},
  {path: 'login/:role', component: LoginComponent},
  {path: 'view/:role/:email', component: ViewPageComponent},
  {path: 'addstock/:role/:email', component: AddmStockComponent},
  {path: 'purchase/:role/:email', component: PurchaseComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RegisterComponent,
    LoginComponent,
    ViewPageComponent,
    AddmStockComponent,
    SellStockComponent,
    NavbarComponent,
    PurchaseComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FlashMessagesModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
