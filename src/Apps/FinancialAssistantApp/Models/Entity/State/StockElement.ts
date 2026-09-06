import { IStockElementDataBack } from "../../BackModels/IStockElementDataBack";


export class StockElement {
    Id: number;
    StockId: number;
    StockName: string;
    Count: number;
    PortfolioId: number;
    Price: number;
    Sum: number;
    CurrencyId: number | null;
    CurrencyName: string;

    constructor() {
    }

    FillByIStockElementDataBack(data: IStockElementDataBack): StockElement {
        this.Id = data.Id;
        this.StockId = data.StockId;
        this.StockName = data.StockName;
        this.Count = data.Count;
        this.PortfolioId = data.PortfolioId;
        this.Price = data.Price;
        this.Sum = data.Sum;
        this.CurrencyId = data.CurrencyId;
        this.CurrencyName = data.CurrencyName;

        return this;
    }
}