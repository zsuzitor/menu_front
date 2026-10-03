export interface IPortfolioStatisticCurrencyDataBack {
    CurrencyId: number;
    CurrencyName: string;
    CurrencySum: number;
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
}

// interface DictionaryNumber<T> {
//     [Key: number]: T;
// }