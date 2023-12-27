export class payment {
    type: string;
    amount: number;
    reason: string;
    constructor(type: string, amount: number, reason: string){
        this.type = type;
        this.amount = amount;
        this.reason = reason;
    }
}