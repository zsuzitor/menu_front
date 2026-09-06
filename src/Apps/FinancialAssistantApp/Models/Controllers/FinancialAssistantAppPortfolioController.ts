import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { ServerResult } from "../../../../Models/AjaxLogic";
import { FinancialAssistantApiPortfolioUrl, FinancialAssistantAppPreloader } from "../Consts";
import { IPortfolioDataBack } from "../BackModels/IPortfolioDataBack";
import { Portfolio } from "../Entity/State/Portfolio";
import { CreatePortfolioActionCreator, DeletePortfolioActionCreator, GetPortfolioActionCreator, SetCurrentPortfolioActionCreator, UpdatePortfolioActionCreator } from "../Actions/PortfolioActions";


export interface IFinancialAssistantAppPortfolioController {
    GetForUserRedux: () => (dispatch: any, getState: any) => void;
    CreateRedux: (name: string) => (dispatch: any, getState: any) => void;
    UpdateRedux: (id: number, name: string, currencyId: number | null) => (dispatch: any, getState: any) => void;
    UpdateAsync: (id: number, name: string, currencyId: number | null) => Promise<ServerResult<IPortfolioDataBack>>;
    DeleteRedux: (id: number) => (dispatch: any, getState: any) => void;
    GetDetailRedux: (id: number) => (dispatch: any, getState: any) => void;

}


export class FinancialAssistantAppPortfolioController implements IFinancialAssistantAppPortfolioController {



    GetForUserRedux = () => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.GetForUserAsync();
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = backResult.Data.map(x => new Portfolio().FillByIPortfolioDataBack(x));
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


    CreateRedux = (name: string) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.CreateAsync(name);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = new Portfolio().FillByIPortfolioDataBack(backResult.Data);
                dispatch(CreatePortfolioActionCreator(dt));
            }
        };
    }

    CreateAsync = async (name: string): Promise<ServerResult<IPortfolioDataBack>> => {
        let data = {
            "Name": name
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IPortfolioDataBack>({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${FinancialAssistantApiPortfolioUrl}/create`,
            ContentType: 'body'
        });

        return backResult;
    }


    UpdateRedux = (id: number, name: string, currencyId: number | null) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.UpdateAsync(id, name, currencyId);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                let dt = new Portfolio().FillByIPortfolioDataBack(backResult.Data);
                dispatch(UpdatePortfolioActionCreator(dt));
            }
        };
    }

    UpdateAsync = async (id: number, name: string, currencyId: number | null): Promise<ServerResult<IPortfolioDataBack>> => {
        let data = {
            "Name": name,
            "CurrencyId": currencyId,
            "Id": id,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IPortfolioDataBack>({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${FinancialAssistantApiPortfolioUrl}/update`,
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
                dispatch(DeletePortfolioActionCreator(id));
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
            Url: `${G_PathToServer}${FinancialAssistantApiPortfolioUrl}/delete`,
            ContentType: 'body'
        });

        return backResult;
    }

    GetDetailRedux = (id: number) => {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            const backResult = await this.GetDetailAsync(id);
            this.preloader(false);

            if (backResult.Error) {
                return;
            }

            if (backResult.Data) {
                dispatch(SetCurrentPortfolioActionCreator(new Portfolio().FillByIPortfolioDataBack(backResult.Data)));
            }
        };
    }

    GetDetailAsync = async (id: number): Promise<ServerResult<IPortfolioDataBack>> => {
        let data = {
            "Id": id
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IPortfolioDataBack>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${FinancialAssistantApiPortfolioUrl}/get`,
        });

        return backResult;
    }


    preloader(show: boolean) {
        window.FinancialAssistantAppCounter = new ControllerHelper()
            .Preloader(show, FinancialAssistantAppPreloader, window.FinancialAssistantAppCounter);

    }

}