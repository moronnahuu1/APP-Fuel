import { numberAttribute } from "@angular/core";
import { payment } from "./payment";
import { operation } from "./operation";
import { count } from "rxjs";
import { selectedOperations } from "./selectedOperations";
import { message } from "./message";

export class GlobalFunctions{
    static getTotalProfit() {
        let profitStorage = localStorage.getItem("profit");
        let profit = 0;
        if(profitStorage){
          let profitAux = JSON.parse(profitStorage);
          if(profitAux!=null){
            profit = parseFloat(profitAux);
            console.log("PROFIT FROM GET TOTAL PROFIT: "+ profitAux);
          }          
          let profitDoc = document.getElementById("profit") as HTMLInputElement;
          if(profitDoc){
            profitDoc.innerHTML = "GANANCIA TOTAL: $" + this.formatNumber(profit); 
          }
        }
        console.log("PROFIT FROM GET TOTAL PROFIT: "+ profit);
        return profit;
      }
    static getTotalFuel(): number{
    let fuelLevel = localStorage.getItem("totalFuel");
    if(fuelLevel){
      let fuelLevelAux: number = parseInt(fuelLevel);
      return fuelLevelAux;
    }else{
      return 0;
    }
  }
  static getOperations(): Array<operation>{
    let operationsValues: Array<operation> = [];
    let operations = localStorage.getItem("operations");
    console.log(operations);
    if(operations){
      operationsValues = JSON.parse(operations);
    }
    return operationsValues;
  }

  static getSelectedOperations():  Array<selectedOperations>{
    let selectedOperations: Array<selectedOperations> = [];
    let selectedOpAux = localStorage.getItem("selectedOperations");
    if(selectedOpAux){
      selectedOperations = JSON.parse(selectedOpAux);
    }
    return selectedOperations;
  }

  static getSpecificOperations(type: string): Array<operation>{
    let operations = this.getOperations();
    let specificOperations: Array<operation> = [];

    let firstOpStoraged = localStorage.getItem("firstOperationSelected");
    let firstOperation: operation = new operation(0,0,',', new Date());

    let lastOpSelected = localStorage.getItem("lastOperationSelected");
    let lastOperation: operation = new operation(0,0,',',new Date());

    if(firstOpStoraged){
      firstOperation = JSON.parse(firstOpStoraged);
    }
    if(lastOpSelected){
      lastOperation = JSON.parse(lastOpSelected);
    }
    if(operations.length>0){
      if(firstOperation.id > lastOperation.id){ ///INVIERTO EL LUGAR PARA EL FOR
        let operationAux = firstOperation;
        firstOperation = lastOperation;
        lastOperation = operationAux;
      }
      for(let i=0; i<operations.length; i++){
        if(operations[i].id>=firstOperation.id && operations[i].id<=lastOperation.id){
          if(type == "all"){
            specificOperations.unshift(operations[i]);
          }else{
            if(operations[i].type == type){
              specificOperations.unshift(operations[i]);
            }
          }
        }
      }
    }
    return specificOperations;
  }

  static countTypeOperations(type: string): number{
    let operationsValues: Array<operation> = this.getOperations();
    let counter: number = 0;
    if(operationsValues){
      for(let i=0; i<operationsValues.length; i++){
        if(operationsValues[i].type == type){
          counter += 1;
        }
      }
    }
    return counter;
  }
  static biggestOperationType(type: string): operation{
    let operationsValues: Array<operation> = this.getOperations();
    let biggestOp: operation = operationsValues[0];
    if(operationsValues){
      for(let i=0; i<operationsValues.length; i++){
        if(operationsValues[i].type == type){
          if(operationsValues[i].fuelAmount > biggestOp.fuelAmount){
            biggestOp = operationsValues[i];
          }
        }
      }
    }
    return biggestOp;
  }
  static getTotalAmount(){
    let totalAmount = localStorage.getItem("totalAmount");
    let amount = 0;
    if(totalAmount){
      amount = JSON.parse(totalAmount);
      let amountDoc = document.getElementById("amount");
      if(amountDoc){
        amountDoc.innerHTML = "Total a pagar: $"+this.formatNumber(amount);
      }
    }
    return amount;
  }
  static getAmountSells(){
    let sellsAmountStorage = localStorage.getItem("amountSells");    
    let sellsAmount: number = 0;
    if(sellsAmountStorage){
      let sellsAmountAux = JSON.parse(sellsAmountStorage);
      sellsAmount = parseFloat(sellsAmountAux);
      let amountSell = document.getElementById("sellsAmount");
      if(amountSell){
        amountSell.innerHTML = "Dinero en cuenta: $"+this.formatNumber(sellsAmount);
      }
    }
    return sellsAmount;
  }
  static getMovements(): Array<message>{
    let movements: Array<message> = [];
    let historial = localStorage.getItem("movements");
    if(historial){
      movements = JSON.parse(historial);
    }
    return movements;
  }
  static getFuelRegister(): Array<operation>{
    let fuelXprice: Array<operation> = [];
    let opAux = localStorage.getItem("fuelXprice");
    if(opAux){
      fuelXprice = JSON.parse(opAux);
    }
    return fuelXprice;
  }
  static getPayments(): Array<payment>{
    let totalPayments: Array<payment> = [];
    let totalPaymentsAux = localStorage.getItem("totalPayments");
    if(totalPaymentsAux){
      totalPayments = JSON.parse(totalPaymentsAux);
    }
    return totalPayments;
  }
  static resetTotalProfit(){
    localStorage.removeItem("profit");
  }
  static resetTotalFuel(){
    localStorage.removeItem("totalFuel");
  }
  static resetTotalAmount(){
    localStorage.removeItem("totalAmount");
  }
  static resetAmountSells(){
    localStorage.removeItem("amountSells");
  }
  static resetMovements(){
    localStorage.removeItem("movements");
  }
  static resetPayments(){
    localStorage.removeItem("totalPayments");
  }
  static resetOperations(){
    localStorage.removeItem("operations");
  }
  static resetFuelXprice(){
    localStorage.removeItem("fuelXprice");
  }
  static resetAll(){
    localStorage.removeItem("amountSells");
    localStorage.removeItem("totalAmount");
    localStorage.removeItem("operations");
    localStorage.removeItem("movements");
    localStorage.removeItem("totalFuel");
    localStorage.removeItem("fuelXprice");
    localStorage.removeItem("totalPayments");
    localStorage.removeItem("profit");
  }
  static changeWindow(name: string){
    window.location.href = name;
  }
    static formatNumber(number: number): string {
        return number.toLocaleString(); // Esto añadirá separadores de miles
    }
  static displayBlock(name: string){
    let miDiv = document.getElementById(name);
    if(miDiv){
      miDiv.style.display = 'block';
    }
  }
  static displayGrid(name: string){
    let miDiv = document.getElementById(name);
    if(miDiv){
      miDiv.style.display = 'grid';
    }
  }

  static displayFlex(name: string){
    let miDiv = document.getElementById(name);
    if(miDiv){
      miDiv.style.display = 'flex';
    }
  }

  static displayNone(name: string){
    let miDiv = document.getElementById(name);
    if(miDiv){
      miDiv.style.display = 'none';
    }
  }
  static changeButtonStyle(name: string, type: string){
    let miButton = document.getElementById(name);
    if(miButton){
      if(type == "selected"){
        miButton.style.backgroundColor = 'grey';
        miButton.style.color = 'black';
      }else{
        if(type == "reset"){
          miButton.style.backgroundColor = 'rgb(29, 157, 0)';
          miButton.style.color = 'white';
        }
      }
    }
  }
  static getProfitMessages(){
    let messageAux = localStorage.getItem("profitMessages");
    let messages: Array<String> = [];
    if(messageAux){
      messages = JSON.parse(messageAux);
    }
    return messages;
  }
}