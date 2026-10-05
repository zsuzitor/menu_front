import { AppAction } from "../../../../Models/Actions/Actions";
import { Stock } from "../Entity/State/Stock";
import { StockHistory } from "../Entity/State/StockHistory";



export const GetStockActionName: string = 'GetStockAction';
export function GetStockActionCreator(data: Stock[]): AppAction<Stock[]> {
    return { type: GetStockActionName, payload: data };
};


export const CreateStockActionName: string = 'CreateStockAction';
export function CreateStockActionCreator(data: Stock): AppAction<Stock> {
    return { type: CreateStockActionName, payload: data };
};

export const UpdateStockActionName: string = 'UpdateStockAction';
export function UpdateStockActionCreator(data: Stock): AppAction<Stock> {
    return { type: UpdateStockActionName, payload: data };
};

export const DeleteStockActionName: string = 'DeleteStockAction';
export function DeleteStockActionCreator(data: number): AppAction<number> {
    return { type: DeleteStockActionName, payload: data };
};

export const SetCurrentStockIdActionName: string = 'SetCurrentStockIdAction';
export function SetCurrentStockIdActionCreator(data: number): AppAction<number> {
    return { type: SetCurrentStockIdActionName, payload: data };
};


export const LoadCurrentStockActionName: string = 'LoadCurrentStockAction';
export function LoadCurrentStockActionCreator(data: Stock): AppAction<Stock> {
    return { type: LoadCurrentStockActionName, payload: data };
};

export class LoadCurrentStockHistoryActionDataType {
    History: StockHistory[];
    TotalCount: number;
}
export const LoadCurrentStockHistoryActionName: string = 'LoadCurrentStockHistoryAction';
export function LoadCurrentStockHistoryActionCreator(data: LoadCurrentStockHistoryActionDataType): AppAction<LoadCurrentStockHistoryActionDataType> {
    return { type: LoadCurrentStockHistoryActionName, payload: data };
};

export const CreateCurrentStockHistoryActionName: string = 'CreateCurrentStockHistoryAction';
export function CreateCurrentStockHistoryActionCreator(data: StockHistory): AppAction<StockHistory> {
    return { type: CreateCurrentStockHistoryActionName, payload: data };
};


export const SetCurrentStockHistoryPageActionName: string = 'SetCurrentStockHistoryPageAction';
export function SetCurrentStockHistoryPageActionCreator(data: number): AppAction<number> {
    return { type: SetCurrentStockHistoryPageActionName, payload: data };
};
