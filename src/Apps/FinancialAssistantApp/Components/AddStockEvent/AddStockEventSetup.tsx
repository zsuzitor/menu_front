import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { ServerResult } from "../../../../Models/AjaxLogic";
import { IStockDataBack } from "../../Models/BackModels/IStockDataBack";
import { CreateStockEventRequest } from "../../Models/Entity/DTO/CreateStockEventRequest";
import { IStockEventDataBack } from "../../Models/BackModels/IStockEventDataBack";



interface IAddStockEventOwnProps {
    EventAdded:() => void;
}


interface IAddStockEventStateToProps {
    PortfolioId: number;
}

interface IAddStockEventDispatchToProps {
    Create: (req: CreateStockEventRequest) => Promise<ServerResult<IStockEventDataBack>>;
    GetCurrency: () => Promise<ServerResult<IStockDataBack[]>>;
    FindStocks: (text: string) => Promise<ServerResult<IStockDataBack[]>>;
}

export interface IAddStockEventProps extends IAddStockEventStateToProps, IAddStockEventOwnProps, IAddStockEventDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IAddStockEventOwnProps) => {
    let res = {} as IAddStockEventStateToProps;
    res.PortfolioId = state.FinancialAssistantApp.CurrentPortfolioId;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IAddStockEventOwnProps) => {
    let res = {} as IAddStockEventDispatchToProps;




    res.GetCurrency = async () => {
        return await window.G_FinancialAssistantAppStockController.GetCurrencyAsync();
    };

    res.FindStocks = async (text: string) => {
        return await window.G_FinancialAssistantAppStockController.FindAsync(text);
    };

    res.Create = async (req: CreateStockEventRequest) => {
        return await window.G_FinancialAssistantAppStockEventController.CreateAsync(req);
    };



    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);