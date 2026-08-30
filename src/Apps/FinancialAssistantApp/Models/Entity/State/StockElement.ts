import { IStockElementDataBack } from "../../BackModels/IStockElementDataBack";


export class StockElement {
    Id: number;
    StockId: number;
    StockName: string;
    Count: number;
    PortfolioId: number;

    constructor() {
    }

    FillByIStockElementDataBack(data: IStockElementDataBack): StockElement {
    this.Id = data.Id;
    this.StockId = data.StockId;
    this.StockName = data.StockName;
    this.Count = data.Count;
    this.PortfolioId = data.PortfolioId;

    return this;
}
}