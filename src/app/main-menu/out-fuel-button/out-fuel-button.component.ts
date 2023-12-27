import { ParseFlags } from '@angular/compiler';
import { Component } from '@angular/core';
import { GlobalFunctions } from 'src/app/models/GlobalFunctions';
import { operation } from 'src/app/models/operation';

@Component({
  selector: 'app-out-fuel-button',
  templateUrl: './out-fuel-button.component.html',
  styleUrls: ['./out-fuel-button.component.css']
})
export class OutFuelButtonComponent {
  SellLiters(block: string, none: string){
    GlobalFunctions.displayBlock(block);
    GlobalFunctions.displayNone(none);
    this.changeColors();
  }
  changeColors(){
    let personalDiv = document.getElementById("personalForm");
    let freightDiv = document.getElementById("FreightForm");
    let personalButton = document.getElementById("personal");
    if(personalButton){
    if(personalDiv){
      if(personalDiv.style.display == 'block'){
          personalButton.style.backgroundColor = 'white';
          personalButton.style.color = 'black';
      }else{
        personalButton.style.backgroundColor = 'green';
        personalButton.style.color = 'white';
      }
    }
  }
        if(freightDiv){
          let freightButton = document.getElementById("freight");
          if(freightButton){
          if(freightDiv.style.display == 'block'){
              freightButton.style.backgroundColor = 'white';
              freightButton.style.color = 'black';
          }else{
            freightButton.style.backgroundColor = 'green';
            freightButton.style.color = 'white';
          }
        }
      }
    }
  verifyChecked(): boolean{
    let checkBox = document.getElementById("checkFreightInp") as HTMLInputElement;
    if(checkBox.checked){
      return true;
    }else{
      return false;
    }
  }
  personalSells(){
    let operations: Array<operation> = [];
    let operationStorage = localStorage.getItem("operations");
    if(operationStorage){
      operations = JSON.parse(operationStorage);
    }
    let amount = this.readFuel("amountInp");
    let costPrice = this.inputCostPrice();
    let access = this.searchCostPrice(costPrice, amount);
    if(access == 0){      
      alert("Ingrese un costo que se encuentre registrado");
      location.reload();
    }else {
      if(access == -1){
      alert("No tiene suficientes litros a ese costo");
      location.reload();
      }else {
    this.actualizeFuel(amount);
    let price = this.actualizeTotalAmount(amount, "priceInp");
    let message = "venta de " + this.formatNumber(amount) + " litros al precio de $" + this.formatNumber(price) + "     " + this.getLocalDate();
    this.historialUpdate(message);
    let newOperation = new operation(amount, price, "venta");
    newOperation.profit = this.calculateProFit(amount, price, costPrice);
    let totalProfit = GlobalFunctions.getTotalProfit();    
    totalProfit += newOperation.profit;
    console.log("PROFIT TOTAL: "+totalProfit);
    localStorage.setItem("profit", JSON.stringify(totalProfit));
    operations.unshift(newOperation);
    localStorage.setItem("operations", JSON.stringify(operations));
    this.fuelXpriceActualize(costPrice, amount, newOperation);
    }
  }
  window.location.href = '';
  }
  gasStationSells(){
    let operations: Array<operation> = [];
    let operationStorage = localStorage.getItem("operations");
    if(operationStorage){
      operations = JSON.parse(operationStorage);
    }
    let moneyXliter = this.getMoneyXliter();
    if(moneyXliter>0){
    let amount = this.readFuel("FreightamountInp"); /// CANTIDAD DE LITROS INGRESADOS POR USUARIO
    console.log("AMOUNT: "+ amount);
    let costPrice = this.searchOldestPrice(operations); /// COSTO DE CADA LITRO MAS VIEJO
    console.log("COSTPRICE: "+ costPrice);
    let access = this.searchCostPrice(costPrice, amount); ///VERIFICA SI EL COSTO EXISTE
    if(access == 0){      
      alert("Ingrese un costo que se encuentre registrado");
      location.reload();
    }else {
      if(access == -1){
      alert("No tiene suficientes litros a ese costo");
      location.reload();
      }else {
        
    this.actualizeFuel(amount);
    let currentProfit = this.calculateProFitFreight(moneyXliter, amount);
    let price = this.actualizeTotalAmountFreight(amount, currentProfit); /// PRICE ES EL PRECIO DE VENTA INGRESADO POR EL USUARIO

    let message = "venta para la estacion de " + this.formatNumber(amount) + " litros al precio de $" + this.formatNumber(price) + "     " + this.getLocalDate();
    console.log("MESSAGE: "+ message);
    this.historialUpdate(message);

    let newOperation = new operation(amount, price, "venta");

    newOperation.profit = currentProfit; ///GANANCIA DE LA OPERACION
    let totalProfit = GlobalFunctions.getTotalProfit();
    totalProfit += newOperation.profit;
    localStorage.setItem("profit", JSON.stringify(totalProfit));

    operations.unshift(newOperation);
    localStorage.setItem("operations", JSON.stringify(operations));
    this.fuelXpriceActualize(costPrice, amount, newOperation);

    this.actualicePriceToPay(moneyXliter, amount, costPrice);
      }
    }
  }
    window.location.href = '';
  }
  getMoneyXliter(): number{
    let moneyXliterDoc = document.getElementById("moneyXliterInp") as HTMLInputElement;
    let moneyXliter = 0;
    if(moneyXliterDoc){
      let moneyXliterAux = moneyXliterDoc.value;
      moneyXliter = parseFloat(moneyXliterAux);
    }
    return moneyXliter;
  }
  fuelXpriceActualize(costPrice: number, fuel:number, newOperation: operation){
    let fuelXprice: Array<operation> = [];
    let fuelXpriceStorage = localStorage.getItem("fuelXprice");
    if(fuelXpriceStorage){
      fuelXprice = JSON.parse(fuelXpriceStorage);
      let i=0;
      let access = false;
      while(i<fuelXprice.length && !access){
        if(fuelXprice[i].fuelPrice == costPrice){
          access = true;
        }else{
          i++;
        }
      }
      if(i<fuelXprice.length){
        fuelXprice[i].fuelAmount -= fuel;
        fuelXprice[i].totalPrice = (fuelXprice[i].fuelAmount * fuelXprice[i].fuelPrice);
        if(fuelXprice[i].fuelAmount == 0){
          fuelXprice.splice(i, 1);
        }
      }else{
        fuelXprice.unshift(newOperation);
      }
    }else {
      fuelXprice.unshift(newOperation);
    }
    localStorage.setItem("fuelXprice", JSON.stringify(fuelXprice));
  }
  calculateProFitFreight(moneyXliter: number, fuel: number){
    let currentProfit = moneyXliter * fuel;
    return currentProfit;
  }
  actualicePriceToPay(moneyXliter: number, fuel: number, oldestOperationPrice: number){
    let currentProfit = this.calculateProFitFreight(moneyXliter, fuel);
    let changeOperation = (fuel * oldestOperationPrice);
    let totalAmount = localStorage.getItem("totalAmount");
    let amount = 0;
    if(totalAmount){
      let amountParsed = JSON.parse(totalAmount);
      amount = parseFloat(amountParsed);
      amount -= changeOperation;
      ///amount += totalToPay;
      localStorage.setItem("totalAmount", JSON.stringify(amount));
    }
  }
  calculateProFit(fuel: number, price: number, costPrice: number): number{
    let totalPrice = (fuel*price);
    let totalCostPrice = (fuel*costPrice);
    let finalProFit = totalPrice - totalCostPrice;
    return finalProFit;
  }
  getLocalDate(): string {
    let fechaActual: Date = new Date();
    console.log(fechaActual);
    
    let year = fechaActual.getFullYear();
    let month = fechaActual.getMonth() + 1;
    let date = fechaActual.getDate();    
    let message = date + "/" + month + "/" + year;
    return message;
  }
  readFuel(name: string): number{
    let amountInput = document.getElementById(name) as HTMLInputElement;
    let amount = 0;
    if(amountInput){
      let amountValue = amountInput.value;
      amount = parseFloat(amountValue);
    }
    return amount;
  }
  actualizeFuel(amount: number){
    let totalFuel = localStorage.getItem("totalFuel");
    if(totalFuel){
      let totalFuelAux = JSON.parse(totalFuel)
      let totalFuelInt = parseFloat(totalFuelAux);
      totalFuelInt -= amount;    
      localStorage.setItem("totalFuel", JSON.stringify(totalFuelInt));
    }else {
    }
    console.log("fuel actualized");
   }
  actualizeTotalAmount(fuel: number, name: string): number{
    let priceInput = document.getElementById(name) as HTMLInputElement;
    let price = 0;
    if(priceInput){
      let priceValue = priceInput.value;
      price = parseInt(priceValue);
    }
    let totalAmount = localStorage.getItem("amountSells");
    if(totalAmount){
      let totalAmountInt = parseFloat(totalAmount);
      totalAmountInt += (fuel*price);
      localStorage.setItem("amountSells", JSON.stringify(totalAmountInt));
    }else{
      let amount = (fuel*price);
      localStorage.setItem("amountSells", JSON.stringify(amount));
    }
    return price;
  }
  actualizeTotalAmountFreight(fuel: number, profit: number){
    let priceInput = document.getElementById("FreightpriceInp") as HTMLInputElement;
    let price = 0;
    if(priceInput){
      let priceValue = priceInput.value;
      price = parseFloat(priceValue);
    }
    let totalAmount = localStorage.getItem("amountSells");
    if(totalAmount){
      let totalAmountInt = parseFloat(totalAmount);
      totalAmountInt += profit;
      localStorage.setItem("amountSells", JSON.stringify(totalAmountInt));
    }else{
      let amount = profit;
      localStorage.setItem("amountSells", JSON.stringify(amount));
    }
    return price;
  }
  inputCostPrice(): number{
    let costPriceInput = document.getElementById("costPriceInp") as HTMLInputElement;
    let costPrice = 0;
    if(costPriceInput){
      let costPriceAux = costPriceInput.value;
      costPrice = parseFloat(costPriceAux);
    }
    return costPrice;
  }
  searchOldestPrice(operations: Array<operation>){
    let costPrice = operations[0].fuelPrice;
    let index = 0;
    for(let i=0; i<operations.length; i++){
      if(operations[i].fuelPrice < costPrice){
        costPrice = operations[i].fuelPrice;
        index = i;
      }
    }
    return costPrice;
  }
  validators(index: number, operations: Array<operation>, fuel: number): number{
    if(index<operations.length){
      console.log("VALIDATORS INDEX FUEL AMOUNT: "+ operations[index].fuelAmount);
      
      if(fuel <= operations[index].fuelAmount){
        return 1;
      }else{
        return -1;
      }
    }else{
      return 0;
    }
  }
  searchCostPrice(costPrice: number, fuel: number): number{
    let fuelXpriceStorage = localStorage.getItem("fuelXprice");
    let fuelXprice: Array<operation> = [];
    if(fuelXpriceStorage){
      fuelXprice = JSON.parse(fuelXpriceStorage);
    }
    let i = 0;
    let access = false;
    while(i<fuelXprice.length && !access){
      if(fuelXprice[i].fuelPrice == costPrice) {
        access = true;
      }else{
        i++;
      }
    }
    console.log("OPERATION TYPE: "+fuelXprice[i].type);
    return this.validators(i, fuelXprice, fuel);
  }
  historialUpdate(message: string){
    let historial = localStorage.getItem("movements");
    let movements: Array<string> = [];
    if(historial){
      movements = JSON.parse(historial);
    }
    movements.unshift(message);
    localStorage.setItem("movements", JSON.stringify(movements));
  }
  resetSellsAmount(){
    const result = confirm("Borrar dinero de ventas?");
    if(result){
      GlobalFunctions.resetAmountSells();
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
