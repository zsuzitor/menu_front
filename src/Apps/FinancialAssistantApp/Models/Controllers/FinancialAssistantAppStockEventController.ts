import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { ServerResult } from "../../../../Models/AjaxLogic";
import { FinancialAssistantApiPortfolioUrl, FinancialAssistantAppPreloader } from "../Consts";
import { IPortfolioDataBack } from "../BackModels/IPortfolioDataBack";
import { Portfolio } from "../Entity/State/Portfolio";
import { CreatePortfolioActionCreator, DeletePortfolioActionCreator, GetPortfolioActionCreator, UpdatePortfolioActionCreator } from "../Actions/PortfolioActions";


export interface IFinancialAssistantAppStockEventController {
    GetForUserRedux: () => void;

}


export class FinancialAssistantAppStockEventController implements IFinancialAssistantAppStockEventController {



    GetForUserRedux = () => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.GetForUserAsync();
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = backResult.Data.map(x => new Portfolio().FillByIProjectTaskDataBack(x));
                dispatch(GetPortfolioActionCreator(dt));
            }
        };
    }

    GetForUserAsync = async (): Promise<ServerResult<IPortfolioDataBack[]>> => {
        let data = {
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IPortfolioDataBack[]>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${FinancialAssistantApiPortfolioUrl}/get-for-user`
        });

        return backResult;
    }





    preloader(show: boolean) {
        window.FinancialAssistantAppCounter = new ControllerHelper()
            .Preloader(show, FinancialAssistantAppPreloader, window.FinancialAssistantAppCounter);

    }

}