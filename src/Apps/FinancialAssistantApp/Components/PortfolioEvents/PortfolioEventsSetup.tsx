import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { StockEvent } from "../../Models/Entity/State/StockEvent";
import { LoadStockEventForProjectActionCreator } from "../../Models/Actions/StockEventActions";



interface IPortfolioEventsOwnProps {
}


interface IPortfolioEventsStateToProps {
    Events: StockEvent[];
    PortfolioId: number;
}

interface IPortfolioEventsDispatchToProps {
    LoadPortfolioEvents: (id: number) => void;
    ClearPortfolioEvents: (id: number) => void;
}

export interface IPortfolioEventsProps extends IPortfolioEventsStateToProps, IPortfolioEventsOwnProps, IPortfolioEventsDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IPortfolioEventsOwnProps) => {
    let res = {} as IPortfolioEventsStateToProps;
    res.Events = state.FinancialAssistantApp.CurrentPortfolioEvents;
    res.PortfolioId = state.FinancialAssistantApp.CurrentPortfolioId;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IPortfolioEventsOwnProps) => {
    let res = {} as IPortfolioEventsDispatchToProps;
    res.LoadPortfolioEvents = (id: number) => {
        dispatch(window.G_FinancialAssistantAppStockEventController.GetEventsRedux(id));
    };
    res.ClearPortfolioEvents = (id: number) => {
        dispatch(LoadStockEventForProjectActionCreator([]));
    };
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);