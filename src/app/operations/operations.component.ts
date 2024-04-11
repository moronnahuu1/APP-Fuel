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
  selectFunction: boolean = false;
  selectedOperation: operation | undefined;
  storagedOperation: operation | undefined;
  ngOnInit(): void {
    this.operationsValues = GlobalFunctions.getOperations();
    this.ordenacionPorInsercion()
    let count: number = 0;
    
    /*for(let i=this.operationsValues.length-1; i>=0; i--){
      this.operationsValues[i].id = count;
      count++;
    }
    localStorage.setItem("operations", JSON.stringify(this.operationsValues));*/
    GlobalFunctions.changeButtonStyle("allButton", "selected");
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
  verifyType(type: string, operationAux: operation){
    if(operationAux.type == type){
      return true;
    }else{
      return false;
    }
  }
  displayChange(operationSelected: string){
    if(operationSelected == "venta"){
      GlobalFunctions.displayGrid("sellsOperations");
      GlobalFunctions.displayNone("boughtOperations");
      GlobalFunctions.displayNone("allOperations");
      GlobalFunctions.changeButtonStyle("sellsButton", "selected");
      GlobalFunctions.changeButtonStyle("boughtsButton", "reset");
      GlobalFunctions.changeButtonStyle("allButton", "reset");
    }else{
      if(operationSelected == "compra"){
        GlobalFunctions.displayGrid("boughtOperations");
        GlobalFunctions.displayNone("sellsOperations");
        GlobalFunctions.displayNone("allOperations");
        GlobalFunctions.changeButtonStyle("boughtsButton", "selected");
        GlobalFunctions.changeButtonStyle("sellsButton", "reset");
        GlobalFunctions.changeButtonStyle("allButton", "reset");
      }else{
        if(operationSelected == "all"){
          GlobalFunctions.displayGrid("allOperations");
          GlobalFunctions.displayNone("sellsOperations");
          GlobalFunctions.displayNone("boughtOperations");
          GlobalFunctions.changeButtonStyle("allButton", "selected");
          GlobalFunctions.changeButtonStyle("sellsButton", "reset");
          GlobalFunctions.changeButtonStyle("boughtsButton", "reset");

        }
      }
    }
  }
  displaySelection(nameBlock: string, nameNone: string){
    if(nameBlock == "start" || nameBlock == "modify"){
      this.selectFunction = true;
    }else{
      if(nameBlock == "end"){
        this.storagedOperation = this.selectedOperation;
      }
      if(nameBlock == "finish"){
        this.selectFunction = false;
        window.location.href = "selectedOperations";
      }
    }
    GlobalFunctions.displayBlock(nameBlock);
    GlobalFunctions.displayNone(nameNone);
  }
  selectOperation(operationAux: operation, type: string){
    if(this.selectFunction){
      if(operationAux == this.storagedOperation){
        alert("Esta operacion ya esta seleccionada");
      }else{
        this.selectedOperation = operationAux;
        if(this.checkDisplay("start")){
          localStorage.setItem("firstOperationSelected", JSON.stringify(operationAux));
          localStorage.setItem("typeSelected", JSON.stringify(type));
        }
        if(this.checkDisplay("end")){
          localStorage.setItem("lastOperationSelected", JSON.stringify(operationAux));
        }
        if(this.checkDisplay("modify")){
          localStorage.setItem("itemToModify", JSON.stringify(operationAux));
        }
      }
    }
  }
  checkDisplay(name: string){
    let div = document.getElementById(name);
    if(div){
      if(div.style.display == "block"){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  ordenacionPorInsercion() {
    const n = this.operationsValues.length;
    for (let i = 1; i < n; i++) {
        const current = this.operationsValues[i];
        let j = i - 1;

        while (j >= 0 && this.operationsValues[j].actualDate < current.actualDate) {
            this.operationsValues[j + 1] = this.operationsValues[j];
            j--;
        }

        this.operationsValues[j + 1] = current;
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
}