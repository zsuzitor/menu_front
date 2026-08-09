import { StockType } from "../State/Enum/StockType";



export class CreateStockRequest {
    Id: number;
    Name: string;
    Code: string;
    Type: StockType;
    IsGlobal: boolean;

    constructor() {
    }


}
