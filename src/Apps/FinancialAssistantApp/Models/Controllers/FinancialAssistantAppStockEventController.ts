import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { ServerResult } from "../../../../Models/AjaxLogic";
import { FinancialAssistantApiStockEventUrl, FinancialAssistantAppPreloader } from "../Consts";
import { CreateStockEventRequest } from "../Entity/DTO/CreateStockEventRequest";
import { IStockEventDataBack } from "../BackModels/IStockEventDataBack";
import { StockEvent } from "../Entity/State/StockEvent";
import { LoadStockEventForProjectActionCreator, LoadStockEventForProjectActionDataType } from "../Actions/StockEventActions";
import { IDataBackWithCount } from "../BackModels/IDataBackWithCount";
import { StockEventEnum } from "../Entity/State/Enum/StockEventEnum";


export interface IFinancialAssistantAppStockEventController {
    CreateAsync: (req: CreateStockEventRequest) => Promise<ServerResult<IStockEventDataBack>>;
    GetEventsRedux: (portfolioId: number, pageSize: number, page: number, type: StockEventEnum | null) => void;
    GetEventsForStockAsync: (portfolioId: number, stockId: number, pageSize: number, pageNumber: number) => Promise<ServerResult<IDataBackWithCount<IStockEventDataBack[]>>>;

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
            "Type": +req.Type,
            "StockId": req.StockId,
            "Price": req.Price,
            "CurrencyId": req.CurrencyId,
            "CurrencyActions": req.CurrencyActions,
            "PortfolioId": req.PortfolioId,
            "OutdateForce": req.OutdateForce,
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



    GetEventsRedux = (portfolioId: number, pageSize: number, page: number, type: StockEventEnum | null) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.GetEventsAsync(portfolioId, pageSize, page, type);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let events = backResult.Data.Data.map(x => new StockEvent().FillByIStockEventDataBack(x));
                let dt = new LoadStockEventForProjectActionDataType();
                dt.Events = events;
                dt.TotalCount = backResult.Data.CountTotal;
                dispatch(LoadStockEventForProjectActionCreator(dt));
            }
        };
    }

    GetEventsAsync = async (portfolioId: number, pageSize: number, page: number, type: StockEventEnum | null): Promise<ServerResult<IDataBackWithCount<IStockEventDataBack[]>>> => {
        let data = {
            "PortfolioId": portfolioId,
            "PageSize": pageSize,
            "Page": page,
            "Type": type,

        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IDataBackWithCount<IStockEventDataBack[]>>({
            Data: data,
            Type: ControllerHelper.PostHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${FinancialAssistantApiStockEventUrl}/get-events-for-portfolio`,
            ContentType: 'body'
        });

        return backResult;
    }

    GetEventsForStockAsync = async (portfolioId: number, stockId: number, pageSize: number, pageNumber: number): Promise<ServerResult<IDataBackWithCount<IStockEventDataBack[]>>> => {
        let data = {
            "PortfolioId": portfolioId,
            "StockId": stockId,
            "PageSize": pageSize,
            "Page": pageNumber,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IDataBackWithCount<IStockEventDataBack[]>>({
            Data: data,
            Type: ControllerHelper.PostHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${FinancialAssistantApiStockEventUrl}/get-events-for-stock`,
            ContentType: 'body'
        });

        return backResult;
    }



    preloader(show: boolean) {
        window.FinancialAssistantAppCounter = new ControllerHelper()
            .Preloader(show, FinancialAssistantAppPreloader, window.FinancialAssistantAppCounter);

    }

}