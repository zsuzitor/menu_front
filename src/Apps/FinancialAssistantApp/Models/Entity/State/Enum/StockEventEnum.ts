export enum StockEventEnum { CashReplenishment = 1, Buy, Sell, Dividends, WithdrawalCash, CountChange };


export class StockEventEnumToString {

    constructor() {
    }

    ToString(data: StockEventEnum): string {
        switch (data) {
            case StockEventEnum.Buy:
                return 'Покупка';
                break;
            case StockEventEnum.CashReplenishment:
                return 'Пополнение';
                break;
            case StockEventEnum.Dividends:
                return 'Дивиденды';
                break;
            case StockEventEnum.Sell:
                return 'Продажа';
                break;
            case StockEventEnum.WithdrawalCash:
                return 'Вывод средств';
                break;
            case StockEventEnum.CountChange:
                return 'Изменение количества';
                break;
        }
    }



}


