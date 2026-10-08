import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { StockEvent } from "../../Models/Entity/State/StockEvent";
import { LoadStockEventForProjectActionCreator, StockEventForPortfolioFilterPageActionCreator, StockEventForPortfolioFilterTypeActionCreator } from "../../Models/Actions/StockEventActions";
import { StockEventEnum } from "../../Models/Entity/State/Enum/StockEventEnum";
import { ServerResult } from "../../../../Models/AjaxLogic";
import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";



interface IPortfolioEventsOwnProps {
}


interface IPortfolioEventsStateToProps {
    Events: StockEvent[];
    PortfolioId: number;
    TotalEvents: number;
    PageNumber: number;
    TypeEvents: StockEventEnum | null;
}

interface IPortfolioEventsDispatchToProps {
    LoadPortfolioEvents: (portfolioId: number, pageSize: number, page: number, type: StockEventEnum | null) => void;
    // ClearPortfolioEvents: (id: number) => void;
    SetPagePortfolioEvents: (page: number) => void;
    SetTypePortfolioEvents: (type: number) => void;
    DeleteEvent: (id: number) => Promise<ServerResult<BoolResultBackNew>>;
}

export interface IPortfolioEventsProps extends IPortfolioEventsStateToProps, IPortfolioEventsOwnProps, IPortfolioEventsDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IPortfolioEventsOwnProps) => {
    let res = {} as IPortfolioEventsStateToProps;
    res.Events = state.FinancialAssistantApp.CurrentPortfolioEvents;
    res.PortfolioId = state.FinancialAssistantApp.CurrentPortfolioId;
    res.TotalEvents = state.FinancialAssistantApp.CurrentPortfolioEventsTotal;
    res.PageNumber = state.FinancialAssistantApp.CurrentPortfolioEventsPage;
    res.TypeEvents = state.FinancialAssistantApp.CurrentPortfolioEventsTypeFilter;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IPortfolioEventsOwnProps) => {
    let res = {} as IPortfolioEventsDispatchToProps;
    res.LoadPortfolioEvents = (portfolioId: number, pageSize: number, page: number, type: StockEventEnum | null) => {
        dispatch(window.G_FinancialAssistantAppStockEventController.GetEventsRedux(portfolioId, pageSize, page, type));
    };
    // res.ClearPortfolioEvents = (id: number) => {
    //     dispatch(LoadStockEventForProjectActionCreator([]));
    // };
    res.SetPagePortfolioEvents = (page: number) => {
        dispatch(StockEventForPortfolioFilterPageActionCreator(page));
    };
    res.SetTypePortfolioEvents = (type: number) => {
        dispatch(StockEventForPortfolioFilterTypeActionCreator(type));
    };

    res.DeleteEvent = (id: number) => {
        return window.G_FinancialAssistantAppStockEventController.DeleteAsync(id);
    }
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);