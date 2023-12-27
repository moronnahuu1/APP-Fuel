import { Component } from '@angular/core';
import { operation } from 'src/app/models/operation';

@Component({
  selector: 'app-in-fuel-button',
  templateUrl: './in-fuel-button.component.html',
  styleUrls: ['./in-fuel-button.component.css']
})
export class InFuelButtonComponent {
  addLiters(){
    let fuel = this.actualizeFuel();
    let price = this.actualizeTotalAmount(fuel);
    let message = "Compra de " + this.formatNumber(fuel) + " litros al precio de $" + this.formatNumber(price) + "     " + this.getLocalDate();
    this.historialUpdate(message);
    let newOperation = new operation(fuel, price, "compra");
    let operations: Array<operation> = [];
    let operationStorage = localStorage.getItem("operations");
    if(operationStorage){
      operations = JSON.parse(operationStorage);
    }
    operations.unshift(newOperation);
    localStorage.setItem("operations", JSON.stringify(operations));
    this.fuelXpriceActualize(price,fuel,newOperation);
    window.location.href = '';
  }
  fuelXpriceActualize(price: number, fuel: number, newOperation: operation){
    let fuelXprice: Array<operation> = [];
    let fuelXpriceStorage = localStorage.getItem("fuelXprice");
    if(fuelXpriceStorage){
      fuelXprice = JSON.parse(fuelXpriceStorage);
      let i=0;
      let access = false;
      while(i<fuelXprice.length && !access){
        if(fuelXprice[i].fuelPrice == price){
          access = true;
        }else{
          i++;
        }
      }
      if(i<fuelXprice.length){
        fuelXprice[i].fuelAmount += fuel;
        fuelXprice[i].totalPrice = (fuelXprice[i].fuelAmount * fuelXprice[i].fuelPrice)
      }else{
        fuelXprice.unshift(newOperation);
      }
    }else {
      fuelXprice.unshift(newOperation);
    }
    let totalPrice = 0;
    for(let i = 0; i<fuelXprice.length; i++){
      totalPrice += (fuelXprice[i].fuelAmount * fuelXprice[i].fuelPrice);
    }
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    localStorage.setItem("fuelXprice", JSON.stringify(fuelXprice));
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
  actualizeFuel(): number{
    let amountInput = document.getElementById("amountInp") as HTMLInputElement;
    let amount = 0;
    if(amountInput){
      let amountValue = amountInput.value;
      amount = parseFloat(amountValue);
    }
    let totalFuel = localStorage.getItem("totalFuel");
    if(totalFuel){
      let totalFuelInt = parseInt(totalFuel);
      totalFuelInt += amount;
      localStorage.setItem("totalFuel", JSON.stringify(totalFuelInt));
    }else {
      localStorage.setItem("totalFuel", JSON.stringify(amount));
    }
    console.log("fuel actualized");
    
    return amount;
  }
  actualizeTotalAmount(fuel: number): number{
    let priceInput = document.getElementById("priceInp") as HTMLInputElement;
    let price = 0;
    if(priceInput){
      let priceValue = priceInput.value;
      price = parseFloat(priceValue);
    }
    let totalAmount = localStorage.getItem("totalAmount");
    if(totalAmount){
      let totalAmountInt = parseFloat(totalAmount);
      totalAmountInt += (fuel*price);
      localStorage.setItem("totalAmount", JSON.stringify(totalAmountInt));
    }else{
      let amount = (fuel*price);
      localStorage.setItem("totalAmount", JSON.stringify(amount));
    }
    console.log("amount actualized");
    return price;
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
  changeWindow(name: string){
    window.location.href = name;
  }
  formatNumber(number: number): string {
    return number.toLocaleString(); // Esto añadirá separadores de miles
  }
}
