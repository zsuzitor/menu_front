import { IStockDataBack } from "../../BackModels/IStockDataBack";
import { StockType } from "./Enum/StockType";

export class Stock {
    Id: number;
    Name: string;
    Code: string;
    ActualizationTime: string | null;
    LastPrice: number | null;
    Type: StockType;
    IsGlobal: boolean;
    PortfolioId: number | null;
    CurrencyId: number | null;

    constructor() {
    }





    FillByIStockDataBack(data: IStockDataBack): Stock {
        this.Id = data.Id;
        this.Name = data.Name;
        this.Code = data.Code;
        this.ActualizationTime = data.ActualizationTime;
        this.LastPrice = data.LastPrice;
        this.Type = data.Type;
        this.IsGlobal = data.IsGlobal;
        this.PortfolioId = data.PortfolioId;
        this.CurrencyId = data.CurrencyId;

        return this;
    }
}
