import { verifyHostBindings } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { GlobalFunctions } from 'src/app/models/GlobalFunctions';
import { payment } from 'src/app/models/payment';

@Component({
  selector: 'app-pay-button',
  templateUrl: './pay-button.component.html',
  styleUrls: ['./pay-button.component.css']
})
export class PayButtonComponent implements OnInit{
  totalAmount: number = 0;
  totalPayments: Array<payment> = [];
  amountSells: number = 0;
  ngOnInit(): void {
    this.totalAmount = GlobalFunctions.getTotalAmount();
    this.amountSells = GlobalFunctions.getAmountSells();
  }
  pay(){
    let type = this.getType();
    let amount = this.getAmount();    
    let reason = this.getReason();
    let access = this.verifyAmount(amount);
    if(access == 1){
      this.totalAmount -= amount;
      this.amountSells -= amount;
      let newPay = new payment(type, amount, reason);
      this.totalPayments = GlobalFunctions.getPayments();
      this.totalPayments.unshift(newPay);
      localStorage.setItem("totalPayments", JSON.stringify(this.totalPayments));
      localStorage.setItem("totalAmount", JSON.stringify(this.totalAmount));
      localStorage.setItem("amountSells", JSON.stringify(this.amountSells));
      let message = this.getLocalDate() + " | Pago de $" +GlobalFunctions.formatNumber(amount)+ " realizado en concepto de " +reason;
      this.historialUpdate(message);
      window.location.href = '';
    }else{
      if(access == 0){
        alert("El monto ingresado es mayor al total a pagar");
        location.reload();
      }else{
        if(access == -1){
          alert("El monto ingresado es mayor al total recaudado hasta el momento");
          location.reload();
        }else{
          if(access == -2){
            alert("No podes dejar el espacio en blanco o poner $0");
            location.reload();
          }
        }
      }
    }
  }
  getType(): string{
    let input = document.getElementById("typeInp") as HTMLInputElement;
    let type: string = "";
    if(input){
        type = input.value;
    }
    return type;
  }
  getAmount(): number{
    let input = document.getElementById("amountInp") as HTMLInputElement;
    let amount: number = 0;
    if(input){
        let amountValue = input.value;
        amount = parseFloat(amountValue);
    }    
    return amount;
  }
  getReason(): string {
    let input = document.getElementById("reasonInp") as HTMLInputElement;
    let reason: string = "";
    if(input){
        reason = input.value;
    }
    return reason;
  }
  verifyAmount(amount: any): number{
    let number = -2;    
    if(amount!=null){
      if(amount<=this.amountSells){        
        if(amount>0){
          if(amount <= this.totalAmount){
            number = 1; ///TODO BIEN
          }else{
            number = 0 ///EL MONTO INGRESADO ES MAYOR AL TOTAL A PAGAR
          }
        }else{
          number = -2; ///EL MONTO ES 0 O ESTA EN BLANCO
        }
      }else{
        number = -1; /// EL MONTO INGRESADO SUPERA EL TOTAL RECAUDADO EN LAS VENTAS
      }
  }
    return number;
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
  historialUpdate(message: string){
    let historial = localStorage.getItem("movements");
    let movements: Array<string> = [];
    if(historial){
      movements = JSON.parse(historial);
    }
    movements.unshift(message);
    localStorage.setItem("movements", JSON.stringify(movements));
  }
  resetPayments(){
    const result = confirm("Borrar pagos realizados?");
    if(result){
      GlobalFunctions.resetPayments();
      location.reload();
    }
  }
  changeWindow(name: string){
    window.location.href = name;
  }
  formatNumber(number: number): string {
    return number.toLocaleString(); // Esto añadirá separadores de miles
  }
  changeInput(){
    let miInp = document.getElementById("amountInp") as HTMLInputElement;
    if(miInp){
      miInp.value = "" + this.formatNumber(this.totalAmount);
      miInp.placeholder = "" + this.formatNumber(this.totalAmount);
    }
  }
  displayAdd(name: string, type: string){
    if(type == 'block'){
      GlobalFunctions.displayBlock(name);
    }else{
      if(type == 'none'){
        GlobalFunctions.displayNone(name);
      }
    }
  }
  addCash(){
    let inputMoney = document.getElementById("addAmountInp") as HTMLInputElement;
    let moneyToAdd = 0;
    if(inputMoney){
      moneyToAdd = parseFloat(inputMoney.value);
      let totalAmountAux = GlobalFunctions.getAmountSells();
      totalAmountAux += moneyToAdd;
      localStorage.removeItem("amountSells");
      localStorage.setItem("amountSells", JSON.stringify(totalAmountAux));
      alert("Se agregaron $"+this.formatNumber(moneyToAdd)+" a la cuenta");
      this.displayAdd("addMoney", "none");
      location.reload();
    }
  }
}