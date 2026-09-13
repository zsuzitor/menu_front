import { StockTypeEnum } from "../State/Enum/StockType";



export class CreateStockRequest {
    Id: number;
    Name: string;
    Code: string;
    Type: StockTypeEnum;
    IsGlobal: boolean;

    constructor() {
    }


}
