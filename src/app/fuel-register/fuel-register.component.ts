import { Component, OnInit } from '@angular/core';
import { operation } from '../models/operation';
import { GlobalFunctions } from '../models/GlobalFunctions';

@Component({
  selector: 'app-fuel-register',
  templateUrl: './fuel-register.component.html',
  styleUrls: ['./fuel-register.component.css']
})
export class FuelRegisterComponent implements OnInit{
  fuelXprice: Array<operation> = [];
  ngOnInit(): void {
    let fuelXpriceStorage = localStorage.getItem("fuelXprice");
    if(fuelXpriceStorage){
      this.fuelXprice = JSON.parse(fuelXpriceStorage);
    }
    this.actualizeTotalFuel();
    this.actualizeTotalPrice(this.fuelXprice);
  }
  actualizeTotalFuel(){
    let fuelLevel = localStorage.getItem("totalFuel");
    if(fuelLevel){
      let fuelDoc = document.getElementById("fuelCant");
      if(fuelDoc){
        fuelDoc.innerHTML = "Total: " + this.formatNumber(JSON.parse(fuelLevel)) + " Litros adquiridos";
      }
    }
  }
  actualizeTotalPrice(fuelXprice: Array<operation>){
    let totalPrice = 0;
    for(let i=0; i<fuelXprice.length; i++){
      let operationPrice = (fuelXprice[i].fuelAmount * fuelXprice[i].fuelPrice);
      totalPrice += operationPrice;
    }
      let fuelDoc = document.getElementById("totalPrice");
      if(fuelDoc){
        if(totalPrice>0){
          fuelDoc.innerHTML = "Precio total: $" + this.formatNumber(totalPrice);
        }
      }
  }
  changeWindow(name: string){
    window.location.href = name;
  }
  resetTotalFuel(){
    const result = confirm("Borrar total de litros?");
    if(result){
      GlobalFunctions.resetTotalFuel();
      location.reload();
    }
  }
  formatNumber(number: number): string {
    return number.toLocaleString(); // Esto añadirá separadores de miles
  }
}
