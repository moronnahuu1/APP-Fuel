/*const mysql = require ('mysql2/promise')

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'Bocajuniors10',
  database: 'camiondb'
}

const connection = await mysql.createConnection(config)*/
export class operation {
     fuelAmount: number;
     fuelPrice: number;
     actualDate: Date;
     type: string;
     totalPrice: number;
     id: number;
     profit: number | undefined;
    constructor(fuelAmount: number, fuelPrice: number, type: string, actualDate: Date){
        this.fuelAmount = fuelAmount;
        this.fuelPrice = fuelPrice;
        this.actualDate = actualDate;
        this.type = type;
        this.totalPrice = (fuelAmount*fuelPrice);
        this.id = 0;
    }
    getAmount(): number {
        return this.fuelAmount;
    }
    getPrice(): number {
        return this.fuelPrice;
    }
    /*static async getAll(){
        const [result] = await connection.query('SELECT *, BIN_TO_UUID(id) as id FROM operation');
        return result;
    }*/
}