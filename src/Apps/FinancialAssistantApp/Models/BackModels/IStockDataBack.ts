import { StockTypeEnum } from "../Entity/State/Enum/StockTypeEnum";


export interface IStockDataBack {
    Id: number;
    Name: string;
    Code: string;
    ActualizationTime: string | null;
    LastPrice: number | null;
    Type: StockTypeEnum;
    IsGlobal: boolean;
    PortfolioId: number | null;
    CurrencyId: number | null;
}