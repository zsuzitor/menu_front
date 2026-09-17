import { StockTypeEnum } from "../State/Enum/StockTypeEnum";



export class CreateStockRequest {
    Id: number;
    Name: string;
    Code: string;
    Type: StockTypeEnum;
    IsGlobal: boolean;

    constructor() {
    }


}
