import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { ServerResult } from "../../../../Models/AjaxLogic";
import { FinancialAssistantApiStockEventUrl, FinancialAssistantAppPreloader } from "../Consts";
import { CreateStockEventRequest } from "../Entity/DTO/CreateStockEventRequest";
import { IStockEventDataBack } from "../BackModels/IStockEventDataBack";
import { StockEvent } from "../Entity/State/StockEvent";
import { LoadStockEventForProjectActionCreator } from "../Actions/StockEventActions";


export interface IFinancialAssistantAppStockEventController {
    CreateAsync: (req: CreateStockEventRequest) => void;
    GetEventsRedux: (portfolioId: number) => void;

}


export class FinancialAssistantAppStockEventController implements IFinancialAssistantAppStockEventController {



    // CreateRedux = (req:CreateStockEventRequest) => {
    //     return async (dispatch: any, getState: any) => {
    //         this.preloader(true);
    //         const backResult = await this.CreateAsync(req);
    //         this.preloader(false);

    //         if (backResult.Error) {
    //             return;
    //         }

    //         if (backResult.Data) {
    //             let dt = new StockEvent().FillByIProjectTaskDataBack(backResult.Data);
    //             // let dt = backResult.Data.map(x => new StockEvent().FillByIProjectTaskDataBack(x));
    //             dispatch(GetPortfolioActionCreator1(dt));
    //         }
    //     };
    // }

    CreateAsync = async (req: CreateStockEventRequest): Promise<ServerResult<IStockEventDataBack>> => {
        let data = {
            "Date": req.Date,
            "Count": req.Count,
            "Type": req.Type,
            "StockId": req.StockId,
            "Price": req.Price,
            "CurrencyId": req.CurrencyId,
            "PortfolioId": req.PortfolioId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IStockEventDataBack>({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${FinancialAssistantApiStockEventUrl}/create`,
            ContentType: 'body'
        });

        return backResult;
    }



    GetEventsRedux = (portfolioId: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.GetEventsAsync(portfolioId);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = backResult.Data.map(x => new StockEvent().FillByIStockEventDataBack(x));
                dispatch(LoadStockEventForProjectActionCreator(dt));
            }
        };
    }

    GetEventsAsync = async (portfolioId: number): Promise<ServerResult<IStockEventDataBack[]>> => {
        let data = {
            "PortfolioId": portfolioId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IStockEventDataBack[]>({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${FinancialAssistantApiStockEventUrl}/get-events-for-portfolio`,
            ContentType: 'body'
        });

        return backResult;
    }





    preloader(show: boolean) {
        window.FinancialAssistantAppCounter = new ControllerHelper()
            .Preloader(show, FinancialAssistantAppPreloader, window.FinancialAssistantAppCounter);

    }

}