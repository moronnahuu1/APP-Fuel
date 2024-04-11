import { Component, OnInit } from '@angular/core';
import { GlobalFunctions } from 'src/app/models/GlobalFunctions';
import { operation } from 'src/app/models/operation';
import { selectedOperations } from 'src/app/models/selectedOperations';

@Component({
  selector: 'app-saved-operations',
  templateUrl: './saved-operations.component.html',
  styleUrls: ['./saved-operations.component.css']
})
export class SavedOperationsComponent implements OnInit{
  storagedOperations: Array<selectedOperations> = [];
  selectedToSee: selectedOperations | undefined;
  totalFuelMoved: number = 0;
  marginFuel: number = 0;
  totalFuelSold: number = 0;
  totalFuelBought: number = 0;
  totalAmount: number = 0;
  totalProfit: number = 0;
  type: string = '';
  sellCount: number = 0;
  buyCount: number = 0;
  totalCount: number = 0;
  bestSell: operation = new operation(0,0,'',new Date());
  worstSell: operation = new operation(0,0,'',new Date());
  biggestBuy: operation = new operation(0,0,'',new Date());
  lowestBuy: operation = new operation(0,0,'',new Date());
  biggestProfit: number = 0;
  lowestProfit: number = 0;
  mediaProfit: number = 0;
  operationValues: Array<operation> = [];
  ngOnInit(): void {
      this.storagedOperations = GlobalFunctions.getSelectedOperations();
  }
  watch(selected: selectedOperations){
    this.selectedToSee = selected;
    this.operationValues = this.selectedToSee.operations;
    let typeStoraged = localStorage.getItem("typeSelected");
      if(typeStoraged){
        this.type = JSON.parse(typeStoraged);
      }
      this.getTotalFuel();
      if(this.type == "compra"){
      }else{
        this.getTotalProfit();
      }
    this.getCounts();
    GlobalFunctions.displayGrid("selectedToSee");
    GlobalFunctions.displayFlex("information");
    GlobalFunctions.displayBlock("resume");
    this.displayChange("selectTitle", "none");
    this.displayChange("select", "none");
    this.displayChange("titleSelected", "block");
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
  reload(){
    location.reload();
  }
}
