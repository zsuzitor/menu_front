import { IPortfolioDataBack } from "../../BackModels/IPortfolioDataBack";

export class Portfolio {
    Id: number;
    Name: string;
    UserId: number;
    CurrencyId?: number;
    CurrencyName: string;

    constructor() {
    }



    FillByIPortfolioDataBack(data: IPortfolioDataBack): Portfolio {
        this.Id = data.Id;
        this.Name = data.Name;
        this.UserId = data.UserId;
        this.CurrencyId = data.CurrencyId;
        this.CurrencyName = data.CurrencyName;
        return this;
    }
}
