import { AppAction } from "../../../../Models/Actions/Actions";
import { AppState } from "../../../../Models/Entity/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { Helper } from "../../../../Models/BL/Helper";
import { LoadStockEventForProjectActionName } from "../Actions/StockEventActions";
import { StockEvent } from "../Entity/State/StockEvent";




export function FinancialAssistantStockEventReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case LoadStockEventForProjectActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as StockEvent[];
                newState.FinancialAssistantApp.CurrentPortfolioEvents = [...payload];
                return newState;
            }


        default:
            return state;
    }

    return state;
}