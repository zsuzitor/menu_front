import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { Stock } from "../../Models/Entity/State/Stock";
import { CreateStockRequest } from "../../Models/Entity/DTO/CreateStockRequest";
import { GetStockActionCreator, LoadCurrentStockActionCreator, LoadCurrentStockHistoryActionCreator, SetCurrentStockIdActionCreator } from "../../Models/Actions/StockActions";
import { StockHistory } from "../../Models/Entity/State/StockHistory";
import { ServerResult } from "../../../../Models/AjaxLogic";
import { IStockDataBack } from "../../Models/BackModels/IStockDataBack";



interface IStockDetailOwnProps {
}


interface IStockDetailStateToProps {
    Stock?: Stock | null;
    StockId: number;
    StockHistory: StockHistory[];
}

interface IStockDetailDispatchToProps {
    Delete: (id: number) => void;
    SetCurrentStockId: (id: number) => void;
    Update: (stock: CreateStockRequest) => void;
    GetDetail: (id: number) => void;
    ClearCurrentStock: () => void;
    GetHistory: (id: number) => void;
    CreateHistory: (req: StockHistory) => void;
    ClearCurrentHistory: () => void;
    GetCurrency: () => Promise<ServerResult<IStockDataBack[]>>;
}

export interface IStockDetailProps extends IStockDetailStateToProps, IStockDetailOwnProps, IStockDetailDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IStockDetailOwnProps) => {
    let res = {} as IStockDetailStateToProps;
    res.Stock = state.FinancialAssistantApp.CurrentStock;
    res.StockId = state.FinancialAssistantApp.CurrentStockId;
    res.StockHistory = state.FinancialAssistantApp.CurrentStockHistory;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IStockDetailOwnProps) => {
    let res = {} as IStockDetailDispatchToProps;

    res.Delete = (id: number) => {
        dispatch(window.G_FinancialAssistantAppStockController.DeleteRedux(id));
    };

    res.Update = (stock: CreateStockRequest) => {
        dispatch(window.G_FinancialAssistantAppStockController.UpdateRedux(stock));
    };
    res.GetDetail = (id: number) => {
        dispatch(window.G_FinancialAssistantAppStockController.GetByIdRedux(id));
    };
    res.GetHistory = (id: number) => {
        dispatch(window.G_FinancialAssistantAppStockController.GetHistoryRedux(id));
    };

    res.SetCurrentStockId = (id: number) => {
        dispatch(SetCurrentStockIdActionCreator(id));
    };
    res.ClearCurrentStock = () => {
        dispatch(LoadCurrentStockActionCreator(null));
    };

    res.ClearCurrentHistory = () => {
        dispatch(LoadCurrentStockHistoryActionCreator([]));
    };
    res.CreateHistory = (req: StockHistory) => {
        dispatch(window.G_FinancialAssistantAppStockController.CreateHistoryRedux(req));
    };

    res.GetCurrency = async () => {
        return await window.G_FinancialAssistantAppStockController.GetCurrencyAsync();
    };


    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);