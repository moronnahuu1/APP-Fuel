import { Component, OnInit } from '@angular/core';
import { GlobalFunctions } from '../models/GlobalFunctions';
import { message } from '../models/message';

@Component({
  selector: 'app-movements-history',
  templateUrl: './movements-history.component.html',
  styleUrls: ['./movements-history.component.css']
})
export class MovementsHistoryComponent implements OnInit{
  movements: Array<message> = [];
  ngOnInit(): void {
    let historial = localStorage.getItem("movements");
    if(historial){
      this.movements = JSON.parse(historial);
      this.ordenacionPorInsercion()
    }
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
  resetMovements(){
    const result = confirm("Borrar movimientos?");
    if(result){
      GlobalFunctions.resetMovements();
      location.reload();
    }
  }
  changeWindow(name: string){
    window.location.href = name;
  }
  formatNumber(number: number): string {
    return number.toLocaleString(); // Esto añadirá separadores de miles
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
