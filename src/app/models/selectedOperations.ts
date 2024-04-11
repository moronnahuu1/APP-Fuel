import { operation } from "./operation";

export class selectedOperations{
    nameSelected: string;
    operations: Array<operation>
    initialDate: Date;
    finishDate: Date;
    constructor(nameSelected: string, operations: Array<operation>, initialDate: Date, finishDate: Date){
        this.nameSelected = nameSelected;
        this.operations = operations;
        this.initialDate = initialDate;
        this.finishDate = finishDate;
    }
}