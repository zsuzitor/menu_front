
import { MainErrorObjectBack } from "./BackModel/ErrorBack";
import { AlertData } from "./Models/AlertData";


export declare interface IAjaxInputObject {
    Type?: string;
    Data: any;//generic?
    Url: string;
    DataType?: string;
    NeedTryRefreshToken?: boolean;
    NotGlobalError?: boolean;
    FuncSuccess?: (xhr: any, status: JQuery.Ajax.SuccessTextStatus, jqXHR: JQuery.jqXHR) => void;
    FuncError?: (xhr: any, status: JQuery.Ajax.ErrorTextStatus, error: string) => void;
    FuncBeforeSend?: () => void;
    FuncComplete?: (jqxhr: JQuery.jqXHR, textStatus: JQuery.Ajax.TextStatus) => void;
}

export interface IAjaxHelper {
    TryRefreshToken(callBack: any): void;
    GoAjaxRequest(obj: IAjaxInputObject, fileLoad?: boolean): Promise<any>;
    TrySend(ajaxObj: JQuery.AjaxSettings): void;
}



export class AjaxHelper implements IAjaxHelper {

    public TryRefreshToken(callBack?: any): void {
        this.GoAjaxRequest({
            Data: {},
            Type: "POST",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                    location.href = '/menu/auth/login/';
                }
                else {
                    //TODO записываем полученные токены
                    if (callBack) {
                        callBack();
                    }

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/authenticate/refresh-access-token',

        });
    }

    public async GoAjaxRequest(obj: IAjaxInputObject, fileLoad: boolean = false): Promise<any> {
        let thisRef = this;

        if (!obj.Type)
            obj.Type = 'GET';
        if (!obj.DataType)
            obj.DataType = 'json';//html

        if (obj.NeedTryRefreshToken !== false) {
            obj.NeedTryRefreshToken = true;
        }

        let ajaxObj: JQuery.AjaxSettings = {
            type: obj.Type,
            data: obj.Data,
            url: obj.Url,
            //processData: false, // Не обрабатываем файлы
            //contentType: false, // Так jQuery скажет серверу что это строковой запрос
            success: function (xhr, status, jqXHR) {
                //if(jqXHR.status==200){//EXAMPLE STATUS
                //DO SOMETHING
                //}
                if (obj.FuncSuccess) {
                    try {
                        obj.FuncSuccess(xhr, status, jqXHR);
                    }
                    catch (e) {
                        console.log('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);
                    }

                }
            },
            error: function (xhr, status, error) {
                //alert("ошибка загрузки");
                if (obj.FuncError)
                    obj.FuncError(xhr, status, error);
            },
            // shows the loader element before sending.
            beforeSend: function () {
                if (obj.FuncBeforeSend)
                    obj.FuncBeforeSend();
                //  PreloaderShowChange(true);
            },
            // hides the loader after completion of request, whether successfull or failor.
            complete: function (jqXHR, status) {
                if (jqXHR.status == 401) {
                    if (obj.NeedTryRefreshToken) {
                        thisRef.TryRefreshToken(
                            () => {
                                obj.NeedTryRefreshToken = false;
                                thisRef.GoAjaxRequest(obj, fileLoad);
                            }
                        );//TODO await или что то такое
                    }

                }
                else {
                    let resp: MainErrorObjectBack = jqXHR.responseJSON as MainErrorObjectBack;
                    if (resp.errors && Array.isArray(resp.errors)) {
                        //TODO ошибка
                        if (!obj.NotGlobalError && G_AddAbsoluteAlertToState) {
                            let alertLogic = new AlertData();
                            resp.errors.forEach(error => {
                                let errArr = alertLogic.GetByErrorBack(error);
                                errArr.forEach(alertForShow => {
                                    G_AddAbsoluteAlertToState(alertForShow);
                                });
                            });
                        }
                    }
                }
                if (obj.FuncComplete) {
                    try {
                        obj.FuncComplete(jqXHR, status);
                    }
                    catch (e) {
                        console.log('Ошибка ' + e.name + ":" + e.message + "\n" + e.stack);
                    }
                }

                //PreloaderShowChange(false);
                // console.log("ajax complete");
            },
            dataType: obj.DataType//'html'
        };
        // if(obj.dataType){
        //     ajaxObj.dataType=obj.dataType
        // }

        if (fileLoad) {
            //processData: false, // Не обрабатываем файлы
            //contentType: false,
            ajaxObj.processData = false;
            ajaxObj.contentType = false;
        }

        //TODO логику получения установки вынести в отдельный класс, встречается не только тут
        let haders: any = { 'Authorization_Access_Token': localStorage.getItem('access_token') };
        if (obj.NeedTryRefreshToken) {
            haders['Authorization_Refresh_Token'] = localStorage.getItem('refresh_token');
        }

        ajaxObj.headers = haders;

        try {
            await this.TrySend(ajaxObj);
        }
        catch { }

    }

    public async TrySend(ajaxObj: JQuery.AjaxSettings): Promise<any> {//async       : Promise<any>

        await $.ajax(ajaxObj);//await

    }
}











