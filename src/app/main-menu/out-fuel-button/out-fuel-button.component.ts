import { ParseFlags } from '@angular/compiler';
import { Component } from '@angular/core';
import { GlobalFunctions } from 'src/app/models/GlobalFunctions';
import { fuelXprice } from 'src/app/models/fuelXprice';
import { message } from 'src/app/models/message';
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
    let costPrice = this.searchOldestPrice();
    let dateAux = document.getElementById("dateInp") as HTMLInputElement;
    let dateInput: Date = new Date();
    if(dateAux){
      dateInput = new Date(dateAux.value);
    }
    let mediaCostPrice = 0;
    let costPriceArray: Array<number> = [];
    mediaCostPrice = this.checkOldestPriceAmount(costPrice, amount, costPriceArray);
    if(mediaCostPrice != 0){
      let price = this.actualizeTotalAmount(amount, "priceInp");
      let messageAux = new message(` | Venta de ${this.formatNumber(amount)} litros al precio de $${this.formatNumber(price)}`, dateInput);
      this.historialUpdate(messageAux);
      let newOperation = new operation(amount, price, "venta", dateInput);
      newOperation.profit = this.calculateProFit(amount, price, mediaCostPrice);
      newOperation.id = operations.length;
      let totalProfit = GlobalFunctions.getTotalProfit();    
      totalProfit += newOperation.profit;
      localStorage.setItem("profit", JSON.stringify(totalProfit));
      operations.unshift(newOperation);
      localStorage.setItem("operations", JSON.stringify(operations));
    }
    window.location.href = '';
  }
  checkOldestPriceAmount(costPrice: number, fuelAmount: number, costPriceArray: Array<number>){
    let operations: Array<operation> = [];
    let opAux = localStorage.getItem("fuelXprice");
    if(opAux){
      operations = JSON.parse(opAux);
    }
    let position = -1;
    for(let i=0; i<operations.length; i++){
      if(operations[i].fuelPrice == costPrice){
        position = i;
      }
    }
    if(position>=0){
      if(operations[position].fuelAmount >= fuelAmount){
        let totalOperationPrice = (fuelAmount*costPrice);
        costPriceArray.push(totalOperationPrice);
        this.fuelXpriceActualize(costPrice, fuelAmount);
        this.actualizeFuel(fuelAmount);
        let allCostPrices = 0;
        for(let i=0; i<costPriceArray.length; i++){
          allCostPrices += costPriceArray[i];
        }
        return allCostPrices;
      }else{
        let difference = fuelAmount-operations[position].fuelAmount;
        if(position>0){
          let newCostPrice = this.searchPriceBefore(position);
          let check: number = this.checkOldestPriceAmount(newCostPrice, difference, costPriceArray);
          if(check != 0){ 
            this.fuelXpriceActualize(costPrice, operations[position].fuelAmount);
            this.actualizeFuel(operations[position].fuelAmount);
            let fuelDifference = fuelAmount-difference;
            check += (fuelDifference*costPrice);
          }
          return check;
        }else{
          alert("No hay suficientes litros");
          return 0;
        }
      }
    }else{
      return 0;
    }
  }
  gasStationSells(){
    let operations: Array<operation> = [];
    let operationStorage = localStorage.getItem("operations");
    if(operationStorage){
      operations = JSON.parse(operationStorage);
    }
    let dateAux = document.getElementById("freightDateInp") as HTMLInputElement;
    let dateOp: Date = new Date();
    if(dateAux){
      dateOp = new Date(dateAux.value);
    }    
    let moneyXliter = this.getMoneyXliter();
    if(moneyXliter>0){
    let amount = this.readFuel("FreightamountInp"); /// CANTIDAD DE LITROS INGRESADOS POR USUARIO
    console.log("AMOUNT: "+ amount);
    let costPrice = this.searchOldestPrice(); /// COSTO DE CADA LITRO MAS VIEJO
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

    let message1 = new message(` | Venta para la estacion de ${this.formatNumber(amount)} litros al precio de $${this.formatNumber(price)}`, dateOp);
    this.historialUpdate(message1);

    let newOperation = new operation(amount, price, "venta", dateOp);

    newOperation.profit = currentProfit; ///GANANCIA DE LA OPERACION
    newOperation.id = operations.length;
    let totalProfit = GlobalFunctions.getTotalProfit();
    totalProfit += newOperation.profit;
    localStorage.setItem("profit", JSON.stringify(totalProfit));

    operations.unshift(newOperation);
    localStorage.setItem("operations", JSON.stringify(operations));
    this.fuelXpriceActualize(costPrice, amount);

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
  fuelXpriceActualize(costPrice: number, fuel:number){
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
      }
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
    let totalCostPrice = costPrice;
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
  searchOldestPrice(){
    let operations: Array<operation> = [];
    let opAux = localStorage.getItem("fuelXprice");
    if(opAux){
      operations = JSON.parse(opAux);
    }
    let costPrice = operations[operations.length-1].fuelPrice;
    return costPrice;
  }
  searchPriceBefore(position: number){
    let operations: Array<operation> = [];
    let opAux = localStorage.getItem("fuelXprice");
    if(opAux){
      operations = JSON.parse(opAux);
    }
    if(position<operations.length){
      let costPrice = operations[position-1].fuelPrice;
      return costPrice;
    }else{
      return 0;
    }
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
    return this.validators(i, fuelXprice, fuel);
  }
  historialUpdate(message: message){
    let historial = localStorage.getItem("movements");
    let movements: Array<message> = [];
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
  displayLabel(name: string, nameInp: string){
    let miInp = document.getElementById(nameInp) as HTMLInputElement;
    if(miInp){
      if(miInp.value && miInp.value.trim() !== ""){
        GlobalFunctions.displayBlock(name);
      }else{
        GlobalFunctions.displayNone(name);
      }
    }
  }
  mostrarOcultarLabel(name: string, nameInp: string) {
    var input = document.getElementById(nameInp) as HTMLInputElement;
    var labelResultado = document.getElementById(name);
    if(input){
      if(labelResultado){
        if (input.value && input.value.trim() !== "") {
          labelResultado.style.display = 'block';
        } else {
          labelResultado.style.display = 'none';
        }
      }
    }
  }
}
