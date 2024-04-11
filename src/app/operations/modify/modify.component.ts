import { Component, OnInit } from '@angular/core';
import { GlobalFunctions } from 'src/app/models/GlobalFunctions';
import { operation } from 'src/app/models/operation';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit{
  operationsValues: Array<operation> = [];
  fuelRegister: Array<operation> = [];
  operationToModify: operation = new operation(0,0,'',new Date());
  ngOnInit(): void {
      this.operationsValues = GlobalFunctions.getOperations();
      this.fuelRegister = GlobalFunctions.getFuelRegister();
      let opAux = localStorage.getItem('itemToModify');
      if(opAux){
        this.operationToModify = JSON.parse(opAux);
      }
  }
  modifyOp(type: string){ ///A MODIFICAR
    switch(type){
      case "amount":
        this.displayChange("modifyAmount", "modifyDate", "modifyPrice")
        break;
      case "price":
        this.displayChange("modifyPrice", "modifyAmount", "modifyDate")
        break;
      case "date":
        this.displayChange("modifyDate", "modifyPrice", "modifyAmount")
        break;
    }
  }
  changeData(type: string, idInput: string){
    let miInp = document.getElementById(idInput) as HTMLInputElement;
    let inputValueString = new Date();
    let inputValueNumber = 0;
    if(miInp){
      if(!isNaN(parseFloat(miInp.value))){
        inputValueNumber = parseFloat(miInp.value);
      }else{
        inputValueString = new Date(miInp.value);
      }
    }
    switch(type){
      case 'amount':
        this.operationToModify.fuelAmount = inputValueNumber;
        this.operationToModify.totalPrice = (inputValueNumber * this.operationToModify.fuelPrice);
        break;
      case 'price':
        this.operationToModify.fuelPrice = inputValueNumber;
        break;
      case 'date':
        this.operationToModify.actualDate = inputValueString;
        break;
    }
    this.operationsValues[this.operationToModify.id] = this.operationToModify;
    localStorage.setItem("operations", JSON.stringify(this.operationsValues));
    window.location.href = 'operations';
  }
  displayChange(nameBlock: string, nameNone1: string, nameNone2: string){
    GlobalFunctions.displayBlock(nameBlock);
    GlobalFunctions.displayNone(nameNone1);
    GlobalFunctions.displayNone(nameNone2);
  }
}
