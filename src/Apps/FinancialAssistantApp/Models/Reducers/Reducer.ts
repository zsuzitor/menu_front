
import { AppAction } from '../../../../Models/Actions/Actions';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { FinancialAssistantPortfolioReducer } from '../../../FinancialAssistantApp/Models/Reducers/PortfolioReducer';
import { FinancialAssistantStockEventReducer } from './StockEventReducer';
import { FinancialAssistantStockReducer } from './StockReducer';



export function FinancialAssistantAppReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {

    let st = FinancialAssistantPortfolioReducer(state, action);
    st = FinancialAssistantStockReducer(st, action);
    st = FinancialAssistantStockEventReducer(st, action);



    //...
    return st;
    switch (action.type) {

        case "test":
            let str = action.payload as string;
            return Object.assign({}, state, { TestMessage: str });
        default:
            return state;
    }
}