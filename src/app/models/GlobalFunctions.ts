import { payment } from "./payment";

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
    static getTotalFuel(){
    let fuelLevel = localStorage.getItem("totalFuel");
    if(fuelLevel){
      let fuelDoc = document.getElementById("fuelCant");
      if(fuelDoc){
        fuelDoc.innerHTML = this.formatNumber(JSON.parse(fuelLevel)) + " Litros adquiridos";
      }
    }
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
  }
  static getMovements(): Array<string>{
    let movements: Array<string> = [];
    let historial = localStorage.getItem("movements");
    if(historial){
      movements = JSON.parse(historial);
    }
    return movements;
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
  static displayNone(name: string){
    let miDiv = document.getElementById(name);
    if(miDiv){
      miDiv.style.display = 'none';
    }
  }
}