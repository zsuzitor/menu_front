import { IStockElementDataBack } from "../../BackModels/IStockElementDataBack";


export class StockElement {
    Id: number;
    StockId: number;
    Count: number;
    PortfolioId: number;

    constructor() {
    }

    FillByIProjectTaskDataBack(data: IStockElementDataBack): StockElement {
    this.Id = data.Id;
    this.StockId = data.StockId;
    this.Count = data.Count;
    this.PortfolioId = data.PortfolioId;

    return this;
}
}