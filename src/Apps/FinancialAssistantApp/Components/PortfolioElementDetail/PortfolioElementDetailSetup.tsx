// import { connect } from "react-redux";
// import { AppState } from "../../../../Models/Entity/State/AppState";
// import { Portfolio } from "../../Models/Entity/State/Portfolio";
// import { SetCurrentPortfolioActionCreator, SetCurrentPortfolioElementsActionCreator, SetCurrentPortfolioIdActionCreator } from "../../Models/Actions/PortfolioActions";
// import { StockElement } from "../../Models/Entity/State/StockElement";
// import { ServerResult } from "../../../../Models/AjaxLogic";
// import { IStockDataBack } from "../../Models/BackModels/IStockDataBack";



// interface IPortfolioElementDetailOwnProps {
// }


// interface IPortfolioElementDetailStateToProps {
//     PortfolioId: number;
// }

// interface IPortfolioElementDetailDispatchToProps {
// }

// export interface IPortfolioElementDetailProps extends IPortfolioElementDetailStateToProps, IPortfolioElementDetailOwnProps, IPortfolioElementDetailDispatchToProps {
// }


// const mapStateToProps = (state: AppState, ownProps: IPortfolioElementDetailOwnProps) => {
//     let res = {} as IPortfolioElementDetailStateToProps;
//     res.PortfolioId = state.FinancialAssistantApp.CurrentPortfolioId;
//     return res;
// }

// const mapDispatchToProps = (dispatch: any, ownProps: IPortfolioElementDetailOwnProps) => {
//     let res = {} as IPortfolioElementDetailDispatchToProps;


//     return res;
// };


// export default connect(mapStateToProps, mapDispatchToProps);