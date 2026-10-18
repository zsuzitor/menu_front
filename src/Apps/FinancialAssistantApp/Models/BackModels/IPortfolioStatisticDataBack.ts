export interface IPortfolioStatisticCurrencyDataBack {
    StockId: number;
    StockName: string;
    Sum: number;
}

export interface IPortfolioStatisticDataBack {
    CashReplenishmentSum: number;
    ReplenishmentsByCurrency: IPortfolioStatisticCurrencyDataBack[];
    WithdrawalCashSum: number;
    WithdrawalCashByCurrency: IPortfolioStatisticCurrencyDataBack[];
    DividendsCashSum: number;
    DividendsCashByCurrency:  IPortfolioStatisticCurrencyDataBack[];
    SumNow: number;
    SumOnStartPeriod: number;
    SumOnEndPeriod: number;
    TotalStockCount:  IPortfolioStatisticCurrencyDataBack[];
}

// interface DictionaryNumber<T> {
//     [Key: number]: T;
// }