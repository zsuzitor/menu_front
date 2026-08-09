import { connect } from "react-redux";
import { IAuthState } from "../../../../Models/Entity/AuthState";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { ServerResult } from "../../../../Models/AjaxLogic";
import { SetCurrentPortfolioIdActionCreator } from "../../Models/Actions/PortfolioActions";



interface IFinancialAssistantMainOwnProps {
}


interface IFinancialAssistantMainStateToProps {
    CurrentPortfolioId: number;
}

interface IFinancialAssistantMainDispatchToProps {
    UpdateGlobal: () => void;
}

export interface IFinancialAssistantMainProps extends IFinancialAssistantMainStateToProps, IFinancialAssistantMainOwnProps, IFinancialAssistantMainDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IFinancialAssistantMainOwnProps) => {
    let res = {} as IFinancialAssistantMainStateToProps;
    res.CurrentPortfolioId = state.FinancialAssistantApp.CurrentPortfolioId;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IFinancialAssistantMainOwnProps) => {
    let res = {} as IFinancialAssistantMainDispatchToProps;
    res.UpdateGlobal = (): Promise<ServerResult<BoolResultBackNew>> => {
        return window.G_FinancialAssistantAppStockController.UpdateGlobalAsync();
    };


    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);