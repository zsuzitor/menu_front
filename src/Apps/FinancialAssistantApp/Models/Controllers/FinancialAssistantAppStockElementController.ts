import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { ServerResult } from "../../../../Models/AjaxLogic";
import { FinancialAssistantApiStockElementUrl, FinancialAssistantAppPreloader } from "../Consts";
import { IStockElementDataBack } from "../BackModels/IStockElementDataBack";
import { StockElement } from "../Entity/State/StockElement";
import { SetCurrentPortfolioElementsActionCreator } from "../Actions/PortfolioActions";


export interface IFinancialAssistantAppStockElementController {
    GetRedux: (portfolioId: number) => (dispatch: any, getState: any) => void;

}


export class FinancialAssistantAppStockElementController implements IFinancialAssistantAppStockElementController {

    GetRedux = (portfolioId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.GetAsync(portfolioId);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = backResult.Data.map(x => new StockElement().FillByIProjectTaskDataBack(x));
                dispatch(SetCurrentPortfolioElementsActionCreator(dt));
            }
        };
    }

    GetAsync = async (portfolioId: number): Promise<ServerResult<IStockElementDataBack[]>> => {
        let data = {
            "PortfolioId": portfolioId
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IStockElementDataBack[]>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${this.GetControllerApiUrl()}/get`,
        });

        return backResult;
    }




    GetControllerApiUrl = (): string => {
        return `${G_PathToServer}${FinancialAssistantApiStockElementUrl}`;
    }

    preloader(show: boolean) {
        window.FinancialAssistantAppCounter = new ControllerHelper()
            .Preloader(show, FinancialAssistantAppPreloader, window.FinancialAssistantAppCounter);

    }

}