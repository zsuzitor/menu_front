import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { Stock } from "../../Models/Entity/State/Stock";
import { CreateStockRequest } from "../../Models/Entity/DTO/CreateStockRequest";
import { GetStockActionCreator } from "../../Models/Actions/StockActions";



interface IStockListOwnProps {
}


interface IStockListStateToProps {
    StockList: Stock[];
}

interface IStockListDispatchToProps {
    LoadStockList: () => void;
    ClearStockList: () => void;
    Create: (stock: CreateStockRequest) => void;
    Delete: (id: number) => void;
    Update: (stock: CreateStockRequest) => void;
}

export interface IStockListProps extends IStockListStateToProps, IStockListOwnProps, IStockListDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IStockListOwnProps) => {
    let res = {} as IStockListStateToProps;
    res.StockList = state.FinancialAssistantApp.StockList;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IStockListOwnProps) => {
    let res = {} as IStockListDispatchToProps;
    res.LoadStockList = () => {
        dispatch(window.G_FinancialAssistantAppStockController.GetRedux());
    };
    res.ClearStockList = () => {
        dispatch(GetStockActionCreator([]));
    };
    res.Create = (stock: CreateStockRequest) => {
        dispatch(window.G_FinancialAssistantAppStockController.CreateRedux(stock));
    };
    res.Delete = (id: number) => {
        dispatch(window.G_FinancialAssistantAppStockController.DeleteRedux(id));
    };

    res.Update = (stock: CreateStockRequest) => {
        dispatch(window.G_FinancialAssistantAppStockController.UpdateRedux(stock));
    };
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);