import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { InFuelButtonComponent } from './main-menu/in-fuel-button/in-fuel-button.component';
import { OutFuelButtonComponent } from './main-menu/out-fuel-button/out-fuel-button.component';
import { PayButtonComponent } from './main-menu/pay-button/pay-button.component';
import { MovementsHistoryComponent } from './movements-history/movements-history.component';
import { OperationsComponent } from './operations/operations.component';
import { FuelRegisterComponent } from './fuel-register/fuel-register.component';
import { BalanceComponent } from './balance/balance.component';
import { SelectedOperationsComponent } from './operations/selected-operations/selected-operations.component';
import { SavedOperationsComponent } from './operations/selected-operations/saved-operations/saved-operations.component';
import { ModifyComponent } from './operations/modify/modify.component';

const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent
  },{
    path: 'inFuel',
    component: InFuelButtonComponent
  },{
    path: 'outFuel',
    component: OutFuelButtonComponent
  },{
    path: 'payment',
    component: PayButtonComponent
  },{
    path: 'movements',
    component: MovementsHistoryComponent
  },{
    path: 'operations',
    component: OperationsComponent
  },{
    path: 'fuelRegister',
    component: FuelRegisterComponent
  },{
    path: 'balance',
    component: BalanceComponent
  },{
    path: 'selectedOperations',
    component: SelectedOperationsComponent
  },{
    path: 'savedSelectedOperations',
    component: SavedOperationsComponent
  },{
    path: 'modifyOp',
    component: ModifyComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
