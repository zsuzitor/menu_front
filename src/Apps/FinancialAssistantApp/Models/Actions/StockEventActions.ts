import { AppAction } from "../../../../Models/Actions/Actions";
import { Stock } from "../Entity/State/Stock";
import { StockEvent } from "../Entity/State/StockEvent";



export const LoadStockEventForProjectActionName: string = 'LoadStockEventForProjectAction';
export function LoadStockEventForProjectActionCreator(data: StockEvent[]): AppAction<StockEvent[]> {
    return { type: LoadStockEventForProjectActionName, payload: data };
};

