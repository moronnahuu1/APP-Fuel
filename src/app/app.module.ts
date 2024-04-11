import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { InFuelButtonComponent } from './main-menu/in-fuel-button/in-fuel-button.component';
import { OutFuelButtonComponent } from './main-menu/out-fuel-button/out-fuel-button.component';
import { NavBarComponent } from './main-menu/nav-bar/nav-bar.component';
import { MovementsHistoryComponent } from './movements-history/movements-history.component';
import { TotalFuelComponent } from './total-fuel/total-fuel.component';
import { BalanceComponent } from './balance/balance.component';
import { PayButtonComponent } from './main-menu/pay-button/pay-button.component';
import { OperationsComponent } from './operations/operations.component';
import { FuelRegisterComponent } from './fuel-register/fuel-register.component';
import { SelectedOperationsComponent } from './operations/selected-operations/selected-operations.component';
import { SavedOperationsComponent } from './operations/selected-operations/saved-operations/saved-operations.component';
import { ModifyComponent } from './operations/modify/modify.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    InFuelButtonComponent,
    OutFuelButtonComponent,
    NavBarComponent,
    MovementsHistoryComponent,
    TotalFuelComponent,
    BalanceComponent,
    PayButtonComponent,
    OperationsComponent,
    FuelRegisterComponent,
    SelectedOperationsComponent,
    SavedOperationsComponent,
    ModifyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
