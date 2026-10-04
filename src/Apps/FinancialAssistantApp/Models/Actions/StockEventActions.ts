import { AppAction } from "../../../../Models/Actions/Actions";
import { StockEventEnum } from "../Entity/State/Enum/StockEventEnum";
import { Stock } from "../Entity/State/Stock";
import { StockEvent } from "../Entity/State/StockEvent";



export class LoadStockEventForProjectActionDataType {
    Events: StockEvent[];
    TotalCount: number;
}
export const LoadStockEventForProjectActionName: string = 'LoadStockEventForProjectAction';
export function LoadStockEventForProjectActionCreator(data: LoadStockEventForProjectActionDataType): AppAction<LoadStockEventForProjectActionDataType> {
    return { type: LoadStockEventForProjectActionName, payload: data };
};

export const StockEventForPortfolioFilterPageActionName: string = 'StockEventForPortfolioFilterPageAction';
export function StockEventForPortfolioFilterPageActionCreator(data: number): AppAction<number> {
    return { type: StockEventForPortfolioFilterPageActionName, payload: data };
};
export const StockEventForPortfolioFilterTypeActionName: string = 'StockEventForPortfolioFilterTypeAction';
export function StockEventForPortfolioFilterTypeActionCreator(data: StockEventEnum | null): AppAction<StockEventEnum | null> {
    return { type: StockEventForPortfolioFilterTypeActionName, payload: data };
};
