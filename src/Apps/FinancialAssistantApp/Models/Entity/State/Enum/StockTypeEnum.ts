export enum StockTypeEnum { InvestmentFund = 1, InvestmentStock, InvestmentBond, Other, Currency };


export class StockTypeEnumToString {

    constructor() {
    }

    ToString(data: StockTypeEnum): string {
        switch (data) {
            case StockTypeEnum.InvestmentFund:
                return 'Фонд';
                break;
            case StockTypeEnum.InvestmentStock:
                return 'Ценная бумага';
                break;
            case StockTypeEnum.InvestmentBond:
                return 'Облигация';
                break;
            case StockTypeEnum.Other:
                return 'Другое';
                break;
            case StockTypeEnum.Currency:
                return 'Валюта';
                break;
        }
    }



}



}