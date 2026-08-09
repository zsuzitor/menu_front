import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { Portfolio } from "../../Models/Entity/State/Portfolio";
import { SetCurrentPortfolioActionCreator, SetCurrentPortfolioElementsActionCreator, SetCurrentPortfolioIdActionCreator } from "../../Models/Actions/PortfolioActions";



interface IPortfolioDetailOwnProps {
}


interface IPortfolioDetailStateToProps {
    Portfolio?: Portfolio | null;
    PortfolioId: number;
}

interface IPortfolioDetailDispatchToProps {
    Delete: (id: number) => void;
    LoadPortfolioElements: (id: number) => void;
    CrearPortfolioElements: () => void;
    ClearCurrentPortfolio: () => void;
    SetCurrentPortfolioId: (id: number) => void;
    GetDetail: (id: number) => void;
}

export interface IPortfolioDetailProps extends IPortfolioDetailStateToProps, IPortfolioDetailOwnProps, IPortfolioDetailDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IPortfolioDetailOwnProps) => {
    let res = {} as IPortfolioDetailStateToProps;
    res.Portfolio = state.FinancialAssistantApp.CurrentPortfolio;
    res.PortfolioId = state.FinancialAssistantApp.CurrentPortfolioId;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IPortfolioDetailOwnProps) => {
    let res = {} as IPortfolioDetailDispatchToProps;

    res.Delete = (id: number) => {
        dispatch(window.G_FinancialAssistantAppPortfolioController.DeleteRedux(id));
    };

    res.LoadPortfolioElements = (id: number) => {
        dispatch(window.G_FinancialAssistantAppStockElementController.GetRedux(id));
    };
    res.CrearPortfolioElements = () => {
        dispatch(SetCurrentPortfolioElementsActionCreator([]));
    };

    res.ClearCurrentPortfolio = () => {
        dispatch(SetCurrentPortfolioActionCreator(null));
    };

    res.GetDetail = (id: number) => {
        dispatch(window.G_FinancialAssistantAppPortfolioController.GetDetailRedux(id));
    };
    res.SetCurrentPortfolioId = (id: number) => {
        dispatch(SetCurrentPortfolioIdActionCreator(id));
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);