import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { Stock } from "../../Models/Entity/State/Stock";
import { CreateStockRequest } from "../../Models/Entity/DTO/CreateStockRequest";
import { LoadCurrentStockActionCreator, LoadCurrentStockHistoryActionCreator, LoadCurrentStockHistoryActionDataType, SetCurrentStockHistoryPageActionCreator, SetCurrentStockIdActionCreator } from "../../Models/Actions/StockActions";
import { StockHistory } from "../../Models/Entity/State/StockHistory";
import { ServerResult } from "../../../../Models/AjaxLogic";
import { IStockDataBack } from "../../Models/BackModels/IStockDataBack";
import { IStockEventDataBack } from "../../Models/BackModels/IStockEventDataBack";
import { IDataBackWithCount } from "../../Models/BackModels/IDataBackWithCount";



interface IStockDetailOwnProps {
}


interface IStockDetailStateToProps {
    Stock?: Stock | null;
    StockId: number;

    StockHistory: StockHistory[];
    HistoryPage: number;
    HistoryTotalCount: number;

    PortfolioId: number | null;
}

interface IStockDetailDispatchToProps {
    Delete: (id: number) => void;
    SetCurrentStockId: (id: number) => void;
    Update: (stock: CreateStockRequest) => void;
    GetDetail: (id: number) => void;
    ClearCurrentStock: () => void;
    GetHistory: (id: number, pageSize: number, pageNumber: number) => void;
    CreateHistory: (req: StockHistory) => void;
    ClearCurrentHistory: () => void;
    GetCurrency: () => Promise<ServerResult<IStockDataBack[]>>;
    GetStockEvents: (portfolioId: number, stockId: number, pageSize: number, pageNumber: number) => Promise<ServerResult<IDataBackWithCount<IStockEventDataBack[]>>>;
    SetHistoryPageNumber: (num: number) => void;
}

export interface IStockDetailProps extends IStockDetailStateToProps, IStockDetailOwnProps, IStockDetailDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IStockDetailOwnProps) => {
    let res = {} as IStockDetailStateToProps;
    res.Stock = state.FinancialAssistantApp.CurrentStock;
    res.StockId = state.FinancialAssistantApp.CurrentStockId;
    res.PortfolioId = state.FinancialAssistantApp.CurrentPortfolioId;
    res.StockHistory = state.FinancialAssistantApp.CurrentStockHistory;
    res.HistoryTotalCount = state.FinancialAssistantApp.CurrentStockHistoryTotal;
    res.HistoryPage = state.FinancialAssistantApp.CurrentStockHistoryPage;
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
    res.GetHistory = (id: number, pageSize: number, pageNumber: number) => {
        dispatch(window.G_FinancialAssistantAppStockController.GetHistoryRedux(id, pageSize, pageNumber));
    };

    res.SetCurrentStockId = (id: number) => {
        dispatch(SetCurrentStockIdActionCreator(id));
    };
    res.ClearCurrentStock = () => {
        dispatch(LoadCurrentStockActionCreator(null));
    };

    res.ClearCurrentHistory = () => {
        let dt = new LoadCurrentStockHistoryActionDataType();
        dt.History = [];
        dt.TotalCount = -1;
        dispatch(LoadCurrentStockHistoryActionCreator(dt));
    };
    res.CreateHistory = (req: StockHistory) => {
        dispatch(window.G_FinancialAssistantAppStockController.CreateHistoryRedux(req));
    };

    res.GetCurrency = async () => {
        return await window.G_FinancialAssistantAppStockController.GetCurrencyAsync();
    };
    res.GetStockEvents = async (portfolioId: number, stockId: number, pageSize: number, pageNumber: number) => {
        return await window.G_FinancialAssistantAppStockEventController.GetEventsForStockAsync(portfolioId, stockId, pageSize, pageNumber);
    };

    res.SetHistoryPageNumber = (num: number) => {
        dispatch(SetCurrentStockHistoryPageActionCreator(num));
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);