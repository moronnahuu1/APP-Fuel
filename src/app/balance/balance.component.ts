import { Component, OnInit } from '@angular/core';
import { GlobalFunctions } from '../models/GlobalFunctions';
import { operation } from '../models/operation';
import { first } from 'rxjs';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit{
  totalProfit: number = 0;
  totalFuel: number = 0;
  totalCash: number = 0;
  totalDebt: number = 0;
  totalOperations: number = 0;
  totalSells: number = 0;
  totalBuys: number = 0;
  fuelXprice: Array<operation> = [];
  biggestSell: operation | undefined;
  biggestBuy: operation | undefined;
  currentDate: Date = new Date();
  currentMonth = this.currentDate.getMonth()+1;
  profitMessages: Array<String> = [];
  ngOnInit(): void {
    let fuelXpriceStorage = localStorage.getItem("fuelXprice");
    if(fuelXpriceStorage){
      this.fuelXprice = JSON.parse(fuelXpriceStorage);
    }
    this.totalProfit = GlobalFunctions.getTotalProfit();
    this.totalFuel = GlobalFunctions.getTotalFuel();
    this.totalCash = GlobalFunctions.getAmountSells();
    this.totalDebt = GlobalFunctions.getTotalAmount();
    this.totalOperations = GlobalFunctions.countTypeOperations("venta")+GlobalFunctions.countTypeOperations("compra");
    this.totalSells = GlobalFunctions.countTypeOperations("venta");
    this.totalBuys = GlobalFunctions.countTypeOperations("compra");
    this.biggestBuy = GlobalFunctions.biggestOperationType("compra");
    this.biggestSell = GlobalFunctions.biggestOperationType("venta");
    this.profitMessages = GlobalFunctions.getProfitMessages();
    ///const myDate = new Date(2023, 11, 19);
    ///localStorage.setItem("lastDayProfit", myDate.toISOString());
  }
  resetProfit(){
    const result = confirm("Borrar ganancias?");
    if(result){
      let firstDayProfitAux = localStorage.getItem("lastDayProfit");
      let messages: Array<String> = GlobalFunctions.getProfitMessages();
      if(firstDayProfitAux){
        let firstDayProfit: Date = new Date(firstDayProfitAux);
        let firstDayMonth = firstDayProfit.getMonth()+1;
        let message = "Se obtuvo $" + this.formatNumber(GlobalFunctions.getTotalProfit())+" de ganancia entre el dia "+firstDayProfit.getDate()+"/"+firstDayMonth + "/"+firstDayProfit.getFullYear() + " y el dia "+this.currentDate.getDate()+"/"+this.currentMonth + "/"+this.currentDate.getFullYear();
        messages.push(message);
        localStorage.setItem("profitMessages", JSON.stringify(messages));
        localStorage.setItem("lastDayProfit", JSON.stringify(this.currentDate));
      }
      GlobalFunctions.resetTotalProfit();
      location.reload();
    }
  }
  changeWindow(name: string){
    window.location.href = name;
  }
  formatNumber(number: number): string {
    return number.toLocaleString(); // Esto añadirá separadores de miles
  }
  changeDisplay(name: string, type: string){
    if(type == "block"){
      GlobalFunctions.displayBlock(name);
    }else{
      if(type == "none"){
        GlobalFunctions.displayNone(name);
      }
    }
  }
}
