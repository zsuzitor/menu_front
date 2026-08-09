import { StockEventEnum } from "../Entity/State/Enum/StockEventEnum";


export interface IStockEventDataBack {
    Id: number;
    Date: string;
    StockId: number;
    Count: number;
    PortfolioId: number;
    Type: StockEventEnum;
    Price: number;
    CurrencyId: number;

}