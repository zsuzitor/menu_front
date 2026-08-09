import { IStockEventDataBack } from "../../BackModels/IStockEventDataBack";
import { StockEventEnum } from "./Enum/StockEventEnum";


export class StockEvent {

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

    FillByIProjectTaskDataBack(data: IStockEventDataBack): StockEvent {
        this.Id = data.Id;
        this.Date = data.Date;
        this.StockId = data.StockId;
        this.Count = data.Count;
        this.PortfolioId = data.PortfolioId;
        this.Type = data.Type;
        this.Price = data.Price;
        this.CurrencyId = data.CurrencyId;


        return this;
    }
}