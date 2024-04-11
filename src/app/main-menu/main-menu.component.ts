import { Component, OnInit } from '@angular/core';
import { operation } from '../models/operation';
import { payment } from '../models/payment';
import { GlobalFunctions } from '../models/GlobalFunctions';
import { message } from '../models/message';
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  movements: Array<message> = [];
  totalPayments: Array<payment> = [];
  ngOnInit(): void {
    GlobalFunctions.getTotalFuel();
    GlobalFunctions.getTotalAmount();
    GlobalFunctions.getAmountSells();
    this.movements = GlobalFunctions.getMovements();
    this.ordenacionPorInsercion()
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
  getDayInfo(dateMessage: Date) {
    const dateNow = new Date(dateMessage);
    let day = dateNow.getDate() + 1;
    let month = dateNow.getMonth() + 1;
    if(day > 31) {
      day = 1;
      month = dateNow.getMonth() + 2;
    }
    const fullYear = dateNow.getFullYear();
    let string = day + '/' + month + '/' + fullYear;
    return string;
  }
  ordenacionPorInsercion() {
    const n = this.movements.length;
    for (let i = 1; i < n; i++) {
        const current = this.movements[i];
        let j = i - 1;

        while (j >= 0 && this.movements[j].currentDate < current.currentDate) {
            this.movements[j + 1] = this.movements[j];
            j--;
        }

        this.movements[j + 1] = current;
    }
  }
}
