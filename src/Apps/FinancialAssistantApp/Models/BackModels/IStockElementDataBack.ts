

export interface IStockElementDataBack {
    Id: number;
    StockId: number;
    StockName: string;
    Count: number;
    PortfolioId: number;
    Price: number;
    Sum: number;
    CurrencyId: number | null;
    CurrencyName: string;
}