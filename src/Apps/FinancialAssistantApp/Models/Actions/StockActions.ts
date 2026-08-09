import { AppAction } from "../../../../Models/Actions/Actions";
import { Stock } from "../Entity/State/Stock";



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
