export class operation {
     fuelAmount: number;
     fuelPrice: number;
     actualDate: string;
     type: string;
     totalPrice: number;
     profit: number | undefined;
    constructor(fuelAmount: number, fuelPrice: number, type: string){
        this.fuelAmount = fuelAmount;
        this.fuelPrice = fuelPrice;
        this.actualDate = this.getDate();
        this.type = type;
        this.totalPrice = (fuelAmount*fuelPrice);
    }
    getAmount(): number {
        return this.fuelAmount;
    }
    getPrice(): number {
        return this.fuelPrice;
    }
    getDate(): string {
        let fechaActual: Date = new Date();
        console.log(fechaActual);
        let year = fechaActual.getFullYear();
        let month = fechaActual.getMonth() + 1;
        let date = fechaActual.getDate();    
        let message = date + "/" + month + "/" + year;
        return message;
    }
}