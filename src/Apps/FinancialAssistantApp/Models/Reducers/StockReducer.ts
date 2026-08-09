import { AppAction } from "../../../../Models/Actions/Actions";
import { AppState } from "../../../../Models/Entity/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { Helper } from "../../../../Models/BL/Helper";
import { CreatePortfolioActionName, DeletePortfolioActionName, GetPortfolioActionName, SetCurrentPortfolioIdActionName, UpdatePortfolioActionName } from "../Actions/PortfolioActions";
import { Portfolio } from "../Entity/State/Portfolio";
import { CreateStockActionName, DeleteStockActionName, GetStockActionName, LoadCurrentStockActionName, SetCurrentStockIdActionName, UpdateStockActionName } from "../Actions/StockActions";
import { Stock } from "../Entity/State/Stock";




export function FinancialAssistantStockReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case GetStockActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as Stock[];
                newState.FinancialAssistantApp.StockList = [...payload];
                return newState;
            }
        case CreateStockActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as Stock;
                newState.FinancialAssistantApp.StockList.push(payload);
                return newState;
            }
        case UpdateStockActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as Stock;
                var dt = newState.FinancialAssistantApp.StockList.find(x => x.Id == payload.Id);
                if (dt) {
                    dt.Name = payload.Name;
                    dt.Code = payload.Code;
                    dt.Type = payload.Type;
                    dt.IsGlobal = payload.IsGlobal;
                }

                return newState;
            }

        case DeleteStockActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.FinancialAssistantApp.StockList =
                    newState.FinancialAssistantApp.StockList.filter(x => x.Id != payload);

                return newState;
            }

        case SetCurrentStockIdActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.FinancialAssistantApp.CurrentStockId = payload;

                return newState;
            }

        case LoadCurrentStockActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as Stock;
                newState.FinancialAssistantApp.CurrentStock = payload;

                return newState;
            }



        default:
            return state;
    }

    return state;
}