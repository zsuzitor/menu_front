import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { Portfolio } from "../../Models/Entity/State/Portfolio";
import { IStockDataBack } from "../../Models/BackModels/IStockDataBack";
import { ServerResult } from "../../../../Models/AjaxLogic";
import { IPortfolioStatisticDataBack } from "../../Models/BackModels/IPortfolioStatisticDataBack";



interface IStatisticPageOwnProps {
}


interface IStatisticPageStateToProps {
    PortfolioList: Portfolio[];
}

interface IStatisticPageDispatchToProps {
    LoadPortfolioList: () => void;
    GetCurrency: () => Promise<ServerResult<IStockDataBack[]>>;
    GetStatistic: (id: number[], start: Date, end: Date, currencyId: number) => Promise<ServerResult<IPortfolioStatisticDataBack>>;
}

export interface IStatisticPageProps extends IStatisticPageStateToProps, IStatisticPageOwnProps, IStatisticPageDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IStatisticPageOwnProps) => {
    let res = {} as IStatisticPageStateToProps;
    res.PortfolioList = state.FinancialAssistantApp.PortfolioList;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IStatisticPageOwnProps) => {
    let res = {} as IStatisticPageDispatchToProps;

    res.LoadPortfolioList = () => {
        dispatch(window.G_FinancialAssistantAppPortfolioController.GetForUserRedux());
    };

    res.GetStatistic = async (id: number[], start: Date, end: Date, currencyId: number) => {
        return await window.G_FinancialAssistantAppPortfolioController.GetStatisticAsync(id, start, end, currencyId);
    };

    res.GetCurrency = async () => {
        return await window.G_FinancialAssistantAppStockController.GetCurrencyAsync();
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);