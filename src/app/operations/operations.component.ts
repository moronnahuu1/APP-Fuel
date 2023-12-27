import { Component, OnInit } from '@angular/core';
import { operation } from '../models/operation';
import { GlobalFunctions } from '../models/GlobalFunctions';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit{
  operationsValues: Array<operation> = [];
  ngOnInit(): void {
    let operations = localStorage.getItem("operations");
    console.log(operations);
    if(operations){
      this.operationsValues = JSON.parse(operations);
    }
  }
  resetOperations(){
    const result = confirm("Borrar operaciones?");
    if(result){
      GlobalFunctions.resetOperations();
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
