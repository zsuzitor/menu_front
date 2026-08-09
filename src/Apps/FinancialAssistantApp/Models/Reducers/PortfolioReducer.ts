import { AppAction } from "../../../../Models/Actions/Actions";
import { AppState } from "../../../../Models/Entity/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { Helper } from "../../../../Models/BL/Helper";
import { CreatePortfolioActionName, DeletePortfolioActionName, GetPortfolioActionName, SetCurrentPortfolioActionName, SetCurrentPortfolioElementsActionName, SetCurrentPortfolioIdActionName, UpdatePortfolioActionName } from "../Actions/PortfolioActions";
import { Portfolio } from "../Entity/State/Portfolio";
import { StockElement } from "../Entity/State/StockElement";




export function FinancialAssistantPortfolioReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {
        case GetPortfolioActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as Portfolio[];
                newState.FinancialAssistantApp.PortfolioList = [...payload];
                return newState;
            }
        case CreatePortfolioActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as Portfolio;
                newState.FinancialAssistantApp.PortfolioList.push(payload);
                return newState;
            }
        case UpdatePortfolioActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as Portfolio;
                var dt = newState.FinancialAssistantApp.PortfolioList.find(x => x.Id == payload.Id);
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
                newState.FinancialAssistantApp.PortfolioList =
                    newState.FinancialAssistantApp.PortfolioList.filter(x => x.Id != payload);

                return newState;
            }

        case SetCurrentPortfolioIdActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as number;
                newState.FinancialAssistantApp.CurrentPortfolioId = payload;

                return newState;
            }

        case SetCurrentPortfolioElementsActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as StockElement[];
                newState.FinancialAssistantApp.CurrentPortfolioElements = payload;

                return newState;
            }
        case SetCurrentPortfolioActionName:
            {
                let newState = cloneDeep(state);
                let payload = action.payload as Portfolio;
                newState.FinancialAssistantApp.CurrentPortfolio = payload;

                return newState;
            }



        default:
            return state;
    }

    return state;
}