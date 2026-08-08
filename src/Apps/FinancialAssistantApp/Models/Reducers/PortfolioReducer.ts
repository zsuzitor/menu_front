import { AppAction } from "../../../../Models/Actions/Actions";
import { AppState } from "../../../../Models/Entity/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { Helper } from "../../../../Models/BL/Helper";
import { CreatePortfolioActionName, DeletePortfolioActionName, GetPortfolioActionName, UpdatePortfolioActionName } from "../Actions/PortfolioActions";
import { Portfolio } from "../Entity/State/Portfolio";




export function FinancialAssistantPortfolioReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case GetPortfolioActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as Portfolio[];
                newState.FinancialAssistantApp.Portfolio = [...payload];
                return newState;
            }
        case CreatePortfolioActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as Portfolio;
                newState.FinancialAssistantApp.Portfolio.push(payload);
                return newState;
            }
        case UpdatePortfolioActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as Portfolio;
                var dt = newState.FinancialAssistantApp.Portfolio.find(x => x.Id == payload.Id);
                if (dt) {
                    dt.Name = payload.Name;
                    dt.CurrencyId = payload.CurrencyId;
                }

                return newState;
            }

        case DeletePortfolioActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.FinancialAssistantApp.Portfolio = 
                newState.FinancialAssistantApp.Portfolio.filter(x => x.Id != payload);

                return newState;
            }

        default:
            return state;
    }

    return state;
}