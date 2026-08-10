import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { ServerResult } from "../../../../Models/AjaxLogic";
import { FinancialAssistantApiPortfolioUrl, FinancialAssistantApiStockUrl, FinancialAssistantAppPreloader } from "../Consts";
import { CreateStockRequest } from "../Entity/DTO/CreateStockRequest";
import { IStockDataBack } from "../BackModels/IStockDataBack";
import { Stock } from "../Entity/State/Stock";
import { CreateCurrentStockHistoryActionCreator, CreateStockActionCreator, DeleteStockActionCreator, GetStockActionCreator, LoadCurrentStockActionCreator, LoadCurrentStockHistoryActionCreator, UpdateStockActionCreator } from "../Actions/StockActions";
import { IStockHistoryDataBack } from "../BackModels/IStockHistoryDataBack";
import { StockHistory } from "../Entity/State/StockHistory";


export interface IFinancialAssistantAppStockController {
    // UpdateGlobal: () => void;
    UpdateGlobalAsync: () => Promise<ServerResult<BoolResultBackNew>>;
    CreateRedux: (req: CreateStockRequest) => (dispatch: any, getState: any) => void;
    UpdateRedux: (req: CreateStockRequest) => (dispatch: any, getState: any) => void;
    DeleteRedux: (id: number) => (dispatch: any, getState: any) => void;
    FindRedux: (text: string) => (dispatch: any, getState: any) => void;
    GetRedux: () => (dispatch: any, getState: any) => void;
    GetCurrencyRedux: () => (dispatch: any, getState: any) => void;
    GetCurrencyAsync: () => Promise<ServerResult<IStockDataBack[]>>;
    GetByIdRedux: (id: number) => (dispatch: any, getState: any) => void;
    GetHistoryRedux: (id: number) => (dispatch: any, getState: any) => void;
    CreateHistoryRedux: (req: StockHistory) => (dispatch: any, getState: any) => void;
}


export class FinancialAssistantAppStockController implements IFinancialAssistantAppStockController {


    // UpdateGlobal = () => {
    //     return async (dispatch: any, getState: any) => {
    //         this.preloader(true);
    //         const backResult = await this.UpdateGlobalAsync();
    //         this.preloader(false);

    //         if (backResult.Error) {
    //             return;
    //         }

    //         if (backResult.Data?.Result) {
    //             let dt = backResult.Data.map(x => new Portfolio().FillByIProjectTaskDataBack(x));
    //             dispatch(GetPortfolioActionCreator(dt));
    //         }
    //     };
    // }

    UpdateGlobalAsync = async (): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.PostHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${FinancialAssistantApiPortfolioUrl}/update-global`
        });

        return backResult;
    }


    CreateRedux = (req: CreateStockRequest) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.CreateAsync(req);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = new Stock().FillByIProjectTaskDataBack(backResult.Data);
                // let dt = backResult.Data.map(x => new Stock().FillByIProjectTaskDataBack(x));
                dispatch(CreateStockActionCreator(dt));
            }
        };
    }

    CreateAsync = async (req: CreateStockRequest): Promise<ServerResult<IStockDataBack>> => {
        let data = {
            "Name": req.Name,
            "Code": req.Code,
            "Type": +req.Type,
            "IsGlobal": req.IsGlobal,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IStockDataBack>({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${this.GetControllerApiUrl()}/create`,
            ContentType: 'body'
        });

        return backResult;
    }


    UpdateRedux = (req: CreateStockRequest) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.UpdateAsync(req);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = new Stock().FillByIProjectTaskDataBack(backResult.Data);
                // let dt = backResult.Data.map(x => new Stock().FillByIProjectTaskDataBack(x));
                dispatch(UpdateStockActionCreator(dt));
            }
        };
    }

    UpdateAsync = async (req: CreateStockRequest): Promise<ServerResult<IStockDataBack>> => {
        let data = {
            "Id": req.Id,
            "Name": req.Name,
            "Code": req.Code,
            "Type": +req.Type,
            "IsGlobal": req.IsGlobal,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IStockDataBack>({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${this.GetControllerApiUrl()}/update`,
            ContentType: 'body'
        });

        return backResult;
    }


    DeleteRedux = (id: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.DeleteAsync(id);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data?.Result) {
                dispatch(DeleteStockActionCreator(id));
            }
        };
    }

    DeleteAsync = async (id: number): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "Id": id
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${this.GetControllerApiUrl()}/delete`,
            ContentType: 'body'
        });

        return backResult;
    }


    FindRedux = (text: string) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.FindAsync(text);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = backResult.Data.map(x => new Stock().FillByIProjectTaskDataBack(x));
                dispatch(GetStockActionCreator(dt));
            }
        };
    }

    FindAsync = async (text: string): Promise<ServerResult<Stock[]>> => {
        let data = {
            "Text": text
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<Stock[]>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${this.GetControllerApiUrl()}/find`,
        });

        return backResult;
    }

    GetRedux = () => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.GetAsync();
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = backResult.Data.map(x => new Stock().FillByIProjectTaskDataBack(x));
                dispatch(GetStockActionCreator(dt));
            }
        };
    }

    GetAsync = async (): Promise<ServerResult<IStockDataBack[]>> => {
        let data = {
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IStockDataBack[]>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${this.GetControllerApiUrl()}/get`,
        });

        return backResult;
    }


    GetCurrencyRedux = () => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.GetCurrencyAsync();
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = backResult.Data.map(x => new Stock().FillByIProjectTaskDataBack(x));
                dispatch(GetStockActionCreator(dt));
            }
        };
    }

    GetCurrencyAsync = async (): Promise<ServerResult<IStockDataBack[]>> => {
        let data = {
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IStockDataBack[]>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${this.GetControllerApiUrl()}/get-currency`,
        });

        return backResult;
    }



    GetByIdRedux = (id: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.GetByIdAsync(id);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = new Stock().FillByIProjectTaskDataBack(backResult.Data);
                dispatch(LoadCurrentStockActionCreator(dt));
            }
        };
    }

    GetByIdAsync = async (id: number): Promise<ServerResult<IStockDataBack>> => {
        let data = {
            "Id": id
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IStockDataBack>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${this.GetControllerApiUrl()}/get-by-id`,
        });

        return backResult;
    }



    GetHistoryRedux = (id: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.GetHistoryAsync(id);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }
            if (backResult.Data) {
                let dt = backResult.Data.map(x => new StockHistory().FillByIProjectTaskDataBack(x));
                dispatch(LoadCurrentStockHistoryActionCreator(dt));
            }
        };
    }

    GetHistoryAsync = async (id: number): Promise<ServerResult<IStockHistoryDataBack[]>> => {
        let data = {
            "Id": id
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IStockHistoryDataBack[]>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${this.GetControllerApiUrl()}/get-history`,
        });

        return backResult;
    }


    CreateHistoryRedux = (req: StockHistory) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.CreateHistoryAsync(req);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }
            if (backResult.Data) {
                let dt = new StockHistory().FillByIProjectTaskDataBack(backResult.Data);
                dispatch(CreateCurrentStockHistoryActionCreator(dt));
            }
        };
    }

    CreateHistoryAsync = async (req: StockHistory): Promise<ServerResult<IStockHistoryDataBack>> => {
        let data = {
            "Date": req.Date,
            "Price": req.Price,
            "StockId": req.StockId,
            "CurrencyId": req.CurrencyId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IStockHistoryDataBack>({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${this.GetControllerApiUrl()}/create-history`,
            ContentType: 'body'
        });

        return backResult;
    }



    GetControllerApiUrl = (): string => {
        return `${G_PathToServer}${FinancialAssistantApiStockUrl}`;
    }

    preloader(show: boolean) {
        window.FinancialAssistantAppCounter = new ControllerHelper()
            .Preloader(show, FinancialAssistantAppPreloader, window.FinancialAssistantAppCounter);

    }

}