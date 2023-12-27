import { Component, OnInit } from '@angular/core';
import { GlobalFunctions } from '../models/GlobalFunctions';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit{
  ngOnInit(): void {
    GlobalFunctions.getTotalProfit();
    GlobalFunctions.getTotalFuel();
  }
  resetProfit(){
    const result = confirm("Borrar ganancias?");
    if(result){
      GlobalFunctions.resetTotalProfit();
      location.reload();
    }
  }
}
