import { StockEventEnum } from "../State/Enum/StockEventEnum";
import { StockType } from "../State/Enum/StockType";



export class CreateStockEventRequest {
    Id: number;
    Date: string;
    StockId: number;
    Count: number;
    PortfolioId: number;
    Type: StockEventEnum;
    Price: number;
    CurrencyId: number;

    constructor() {
    }


}
