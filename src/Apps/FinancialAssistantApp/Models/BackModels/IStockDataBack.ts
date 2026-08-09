import { StockType } from "../Entity/State/Enum/StockType";


export interface IStockDataBack {
    Id: number;
    Name: string;
    Code: string;
    ActualizationTime: string | null;
    LastPrice: number | null;
    Type: StockType;
    IsGlobal: boolean;
    PortfolioId: number | null;
    CurrencyId: number | null;
}