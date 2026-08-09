import { AppAction } from "../../../../Models/Actions/Actions";
import { Portfolio } from "../Entity/State/Portfolio";
import { StockElement } from "../Entity/State/StockElement";



export const GetPortfolioActionName: string = 'GetPortfolioAction';
export function GetPortfolioActionCreator(data: Portfolio[]): AppAction<Portfolio[]> {
    return { type: GetPortfolioActionName, payload: data };
};



export const CreatePortfolioActionName: string = 'CreatePortfolioAction';
export function CreatePortfolioActionCreator(data: Portfolio): AppAction<Portfolio> {
    return { type: CreatePortfolioActionName, payload: data };
};

export const UpdatePortfolioActionName: string = 'UpdatePortfolioAction';
export function UpdatePortfolioActionCreator(data: Portfolio): AppAction<Portfolio> {
    return { type: UpdatePortfolioActionName, payload: data };
};

export const DeletePortfolioActionName: string = 'DeletePortfolioAction';
export function DeletePortfolioActionCreator(data: number): AppAction<number> {
    return { type: DeletePortfolioActionName, payload: data };
};

export const SetCurrentPortfolioIdActionName: string = 'SetCurrentPortfolioIdAction';
export function SetCurrentPortfolioIdActionCreator(data: number): AppAction<number> {
    return { type: SetCurrentPortfolioIdActionName, payload: data };
};

export const SetCurrentPortfolioActionName: string = 'SetCurrentPortfolioAction';
export function SetCurrentPortfolioActionCreator(data: Portfolio | null): AppAction<Portfolio | null> {
    return { type: SetCurrentPortfolioActionName, payload: data };
};

export const SetCurrentPortfolioElementsActionName: string = 'SetCurrentPortfolioElementsAction';
export function SetCurrentPortfolioElementsActionCreator(data: StockElement[]): AppAction<StockElement[]> {
    return { type: SetCurrentPortfolioElementsActionName, payload: data };
};

