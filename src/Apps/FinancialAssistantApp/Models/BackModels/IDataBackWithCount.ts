import { StockTypeEnum } from "../Entity/State/Enum/StockTypeEnum";


export interface IDataBackWithCount<T> {
    Data: T;
    CountTotal: number;
}