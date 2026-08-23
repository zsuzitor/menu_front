import { IStockHistoryDataBack } from "../../BackModels/IStockHistoryDataBack";


export class StockHistory {

    Id: number;
    Date: string;
    Price: number;
    StockId: number;
    CurrencyId: number | null;
    CurrencyName: string;
    constructor() {
    }

    FillByIStockHistoryDataBack(data: IStockHistoryDataBack): StockHistory {
        this.Id = data.Id;
        this.Date = data.Date;
        this.StockId = data.StockId;
        this.Price = data.Price;
        this.CurrencyId = data.CurrencyId;
        this.CurrencyName = data.CurrencyName;

        return this;
    }
}