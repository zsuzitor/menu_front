import { StockEventEnum } from "../State/Enum/StockEventEnum";
import { StockTypeEnum } from "../State/Enum/StockTypeEnum";



export class CreateStockEventRequest {
    Id: number;
    Date: string;
    StockId: number;
    Count: number;
    PortfolioId: number;
    Type: StockEventEnum;
    Price: number;
    CurrencyId: number;
    CurrencyActions: boolean;
    OutdateForce: boolean;

    constructor() {
    }


}
