import { AppAction } from "../../../../Models/Actions/Actions";
import { AppState } from "../../../../Models/Entity/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { Helper } from "../../../../Models/BL/Helper";
import { LoadStockEventForProjectActionDataType, LoadStockEventForProjectActionName, StockEventForPortfolioFilterPageActionName, StockEventForPortfolioFilterTypeActionName } from "../Actions/StockEventActions";
import { StockEvent } from "../Entity/State/StockEvent";




export function FinancialAssistantStockEventReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case LoadStockEventForProjectActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as LoadStockEventForProjectActionDataType;
                newState.FinancialAssistantApp.CurrentPortfolioEvents = [...payload.Events];
                newState.FinancialAssistantApp.CurrentPortfolioEventsTotal = payload.TotalCount;
                return newState;
            }

        case StockEventForPortfolioFilterPageActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.FinancialAssistantApp.CurrentPortfolioEventsPage = payload;
                return newState;
            }
        case StockEventForPortfolioFilterTypeActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.FinancialAssistantApp.CurrentPortfolioEventsTypeFilter = payload;
                return newState;
            }


        default:
            return state;
    }

    return state;
}