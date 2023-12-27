import { Component, OnInit } from '@angular/core';
import { operation } from '../models/operation';
import { payment } from '../models/payment';
import { GlobalFunctions } from '../models/GlobalFunctions';
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  movements: Array<string> = [];
  totalPayments: Array<payment> = [];
  ngOnInit(): void {
    GlobalFunctions.getTotalFuel();
    GlobalFunctions.getTotalAmount();
    GlobalFunctions.getAmountSells();
    this.movements = GlobalFunctions.getMovements();
    this.totalPayments = GlobalFunctions.getPayments();
  }
  resetAll(){
    const result = confirm("Borrar todo?");
    if(result){
      GlobalFunctions.resetAll();
      location.reload();
    }
  }
  changeWindow(name: string){
    window.location.href = name;
  }
  formatNumber(number: number): string {
    return number.toLocaleString(); // Esto añadirá separadores de miles
  }
}
