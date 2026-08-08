import { AppAction } from "../../../../Models/Actions/Actions";
import { Portfolio } from "../Entity/State/Portfolio";



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

