import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { SetCurrentPortfolioIdActionCreator } from "../../Models/Actions/PortfolioActions";



interface IPortfolioRouteOwnProps {
}


interface IPortfolioRouteStateToProps {
    PortfolioId: number;
}

interface IPortfolioRouteDispatchToProps {
    SetCurrentPortfolioId: (id: number) => void;
}

export interface IPortfolioRouteProps extends IPortfolioRouteStateToProps, IPortfolioRouteOwnProps, IPortfolioRouteDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IPortfolioRouteOwnProps) => {
    let res = {} as IPortfolioRouteStateToProps;
    res.PortfolioId = state.FinancialAssistantApp.CurrentPortfolioId;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IPortfolioRouteOwnProps) => {
    let res = {} as IPortfolioRouteDispatchToProps;
    res.SetCurrentPortfolioId = (id: number) => {
        dispatch(SetCurrentPortfolioIdActionCreator(id));
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);