import { connect } from "react-redux";
import { IAuthState } from "../../../../Models/Entity/AuthState";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { Portfolio } from "../../Models/Entity/State/Portfolio";



interface IPortfolioListOwnProps {
}


interface IPortfolioListStateToProps {
    PortfolioList: Portfolio[];
}

interface IPortfolioListDispatchToProps {
    LoadPortfolioList: () => void;
    Create: (name: string) => void;
    Delete: (id: number) => void;
    Update: (id: number, name: string, currencyId: number | null) => void;
}

export interface IPortfolioListProps extends IPortfolioListStateToProps, IPortfolioListOwnProps, IPortfolioListDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IPortfolioListOwnProps) => {
    let res = {} as IPortfolioListStateToProps;
    res.PortfolioList = state.FinancialAssistantApp.Portfolio;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IPortfolioListOwnProps) => {
    let res = {} as IPortfolioListDispatchToProps;
    res.LoadPortfolioList = () => {
        dispatch(window.G_FinancialAssistantAppPortfolioController.GetForUserRedux());
    };
    res.Create = (name: string) => {
        dispatch(window.G_FinancialAssistantAppPortfolioController.CreateRedux(name));
    };
    res.Delete = (id: number) => {
        dispatch(window.G_FinancialAssistantAppPortfolioController.DeleteRedux(id));
    };

    res.Update = (id: number, name: string, currencyId: number | null) => {
        dispatch(window.G_FinancialAssistantAppPortfolioController.UpdateRedux(id, name, currencyId));
    };
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);