import { Component, OnInit } from '@angular/core';
import { GlobalFunctions } from 'src/app/models/GlobalFunctions';
import { operation } from 'src/app/models/operation';
import { selectedOperations } from 'src/app/models/selectedOperations';

@Component({
  selector: 'app-selected-operations',
  templateUrl: './selected-operations.component.html',
  styleUrls: ['./selected-operations.component.css']
})
export class SelectedOperationsComponent implements OnInit{
  operationValues: Array<operation> = [];
  totalFuelMoved: number = 0;
  marginFuel: number = 0;
  totalFuelSold: number = 0;
  totalFuelBought: number = 0;
  totalSellsMoney: number = 0;
  totalAmount: number = 0;
  totalProfit: number = 0;
  type: string = '';
  sellCount: number = 0;
  buyCount: number = 0;
  totalCount: number = 0;
  localDate: Date = new Date();
  bestSell: operation = new operation(0,0,'',this.localDate);
  worstSell: operation = new operation(0,0,'',this.localDate);
  biggestBuy: operation = new operation(0,0,'',this.localDate);
  lowestBuy: operation = new operation(0,0,'',this.localDate);
  biggestProfit: number = 0;
  lowestProfit: number = 0;
  mediaProfit: number = 0;
  storagedOperations: Array<selectedOperations> = [];
  ngOnInit(): void {
    let typeStoraged = localStorage.getItem("typeSelected");
    if(typeStoraged){
      this.type = JSON.parse(typeStoraged);
    }
    this.operationValues = GlobalFunctions.getSpecificOperations(this.type);
    this.storagedOperations = GlobalFunctions.getSelectedOperations();
    this.getTotalFuel();
    this.getTotalMoney();
    if(this.type == "compra"){
    }else{
      this.getTotalProfit();
    }
    this.getCounts();
    ///localStorage.removeItem("selectedOperations");
  }
  getTotalProfit(){
    let count = 0;
    let i = 0;
    let access = false;
    while(i<this.operationValues.length && access == false){
      if(this.operationValues[i].type == "venta"){
        let profitAux = this.operationValues[i].profit;
        if(profitAux){
          this.biggestProfit = profitAux;
          this.lowestProfit = profitAux;
        }
        access = true;
      }
      i++;
    }
    for(let i=0; i<this.operationValues.length; i++){
      let profitAux = this.operationValues[i].profit;
      if(profitAux){
        count++;
        this.totalProfit += profitAux;
        if(profitAux > this.biggestProfit){
          this.biggestProfit = profitAux;
        }else{
          if(profitAux<this.lowestProfit){
            this.lowestProfit = profitAux;
          }
        }
      }
    }
    this.mediaProfit = this.totalProfit/count;
  }
  getTotalMoney(){
    for(let i=0; i<this.operationValues.length; i++){
      if(this.operationValues[i].type == 'venta'){
        this.totalSellsMoney += this.operationValues[i].totalPrice;
      }
    }
  }
  getTotalFuel(){
    let i=0;
    let access = false;
    while(i<this.operationValues.length && access == false){
      if(this.operationValues[i].type == "compra"){
        access = true;
        this.biggestBuy = this.operationValues[i];
        this.lowestBuy = this.operationValues[i];
      }
      i++;
    }
    i=0;
    while(i<this.operationValues.length && access == false){
      if(this.operationValues[i].type == "venta"){
        access = true;
        this.bestSell = this.operationValues[i];
        this.worstSell = this.operationValues[i];
      }
      i++;
    }
    for(let i=0; i<this.operationValues.length; i++){
      if(this.operationValues[i].type == "compra"){
        this.marginFuel += this.operationValues[i].fuelAmount;
        this.totalFuelBought += this.operationValues[i].fuelAmount;
        if(this.biggestBuy.fuelAmount < this.operationValues[i].fuelAmount){
          this.biggestBuy = this.operationValues[i];
        }else{
          if(this.lowestBuy.fuelAmount > this.operationValues[i].fuelAmount){
            this.lowestBuy = this.operationValues[i];
          }
        }
      }else{
        if(this.operationValues[i].type == "venta"){
          this.marginFuel -= this.operationValues[i].fuelAmount;
          this.totalFuelSold += this.operationValues[i].fuelAmount;
          if(this.bestSell.fuelAmount < this.operationValues[i].fuelAmount){
            this.bestSell = this.operationValues[i];
          }else{
            if(this.worstSell.fuelAmount > this.operationValues[i].fuelAmount){
              this.worstSell = this.operationValues[i];
            }
          }
        }
      }
      this.totalFuelMoved += this.operationValues[i].fuelAmount;
    }
  }
  getCounts(){
    this.totalCount = this.operationValues.length;
    for(let i=0; i<this.operationValues.length; i++){
      if(this.operationValues[i].type == "compra"){
        this.buyCount ++;
      }else{
        if(this.operationValues[i].type == "venta"){
          this.sellCount ++;
        }
      }
    }
  }
  formatNumber(number: number): string {
    return number.toLocaleString(); // Esto añadirá separadores de miles
  }
  changeWindow(name: string){
    window.location.href = name;
  }
  displayChange(name: string, type: string){
    if(type == "block"){
      GlobalFunctions.displayBlock(name);
    }else{
      if(type == "none"){
        GlobalFunctions.displayNone(name);
      }
    }
  }
  saveOperations(){
    this.displayChange("titleSave", "none");
    let miInp = document.getElementById("nameSaveInp") as HTMLInputElement;
    if(miInp){
      let titleSave = miInp.value;
      let operationSelected = new selectedOperations(titleSave, this.operationValues, this.operationValues[0].actualDate, this.operationValues[this.operationValues.length-1].actualDate);
      this.storagedOperations.unshift(operationSelected);
      localStorage.setItem("selectedOperations", JSON.stringify(this.storagedOperations));
      alert(operationSelected.nameSelected);
      alert(operationSelected.initialDate);
      alert(operationSelected.finishDate);
      alert(operationSelected.operations.length);
    }
  }
}
