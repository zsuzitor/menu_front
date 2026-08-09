import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { Stock } from "../../Models/Entity/State/Stock";
import { CreateStockRequest } from "../../Models/Entity/DTO/CreateStockRequest";
import { GetStockActionCreator, LoadCurrentStockActionCreator, SetCurrentStockIdActionCreator } from "../../Models/Actions/StockActions";
import { StockHistory } from "../../Models/Entity/State/StockHistory";



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
    res.SetCurrentStockId = (id: number) => {
        dispatch(SetCurrentStockIdActionCreator(id));
    };
    res.ClearCurrentStock = () => {
        dispatch(LoadCurrentStockActionCreator(null));
    };



    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);