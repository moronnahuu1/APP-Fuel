import { Component, OnInit } from '@angular/core';
import { GlobalFunctions } from '../models/GlobalFunctions';

@Component({
  selector: 'app-movements-history',
  templateUrl: './movements-history.component.html',
  styleUrls: ['./movements-history.component.css']
})
export class MovementsHistoryComponent implements OnInit{
  movements: Array<string> = [];
  ngOnInit(): void {
    let historial = localStorage.getItem("movements");
    if(historial){
      this.movements = JSON.parse(historial);
    }
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
}
