import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { Portfolio } from "../../Models/Entity/State/Portfolio";
import { ServerResult } from "../../../../Models/AjaxLogic";
import { Stock } from "../../Models/Entity/State/Stock";
import { IPortfolioDataBack } from "../../Models/BackModels/IPortfolioDataBack";



interface IPortfolioEditOwnProps {
    Portfolio?: Portfolio | null;
    Currency: Stock[];
}


interface IPortfolioEditStateToProps {
}

interface IPortfolioEditDispatchToProps {
    Update: (id: number, name: string, currencyId: number | null) => Promise<ServerResult<IPortfolioDataBack>>;
}

export interface IPortfolioEditProps extends IPortfolioEditStateToProps, IPortfolioEditOwnProps, IPortfolioEditDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IPortfolioEditOwnProps) => {
    let res = {} as IPortfolioEditStateToProps;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IPortfolioEditOwnProps) => {
    let res = {} as IPortfolioEditDispatchToProps;


    res.Update = (id: number, name: string, currencyId: number | null) => {
        return window.G_FinancialAssistantAppPortfolioController.UpdateAsync(id, name, currencyId);
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);