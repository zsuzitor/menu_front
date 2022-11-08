
import { BoolResultBack } from "./BackModel/BoolResultBack";
import { MainErrorObjectBack } from "./BackModel/ErrorBack";
import { BoolWithError } from "./Controllers/BO/ControllersOutput";
import { ControllerHelper, DataWithErrorBack } from "./Controllers/ControllerHelper";
import { AlertData } from "./Models/AlertData";



////
// let data = new FormData();

//когда принимаем просто массив [FromForm] List<string> word
// data.append('word[0]', "");
// data.append('word', "");

//когда принимаем объект который содержит массив [FromForm] test newData
//то либо все поля указываем вот так  data.append('word', "");
//либо все поля указываем вот так  data.append('newData.description',
//если их перемешать( и тот и тот способ) то там не понятно как все запишется

//когда принимаем [FromForm] List<WordCardInputModelApi> newData
// то опять же все должно передаваться единообразно, пример
// data.append('newData[0].word',
// а вот так уже нельзя // data.append('newData.word',

//что бы работало без флага fileLoad == true
//надо что бы data был обычный объект js -- {a:123}

///



export declare interface IAjaxInputObject {
    Type?: string;
    Data: any;//generic?
    Url: string;
    DataType?: string;
    NeedTryRefreshToken?: boolean;
    NotGlobalError?: boolean;
    NotRedirectWhenNotAuth?: boolean;
    FuncSuccess?: (xhr: any, status: JQuery.Ajax.SuccessTextStatus, jqXHR: JQuery.jqXHR) => void;
    FuncError?: (xhr: any, status: JQuery.Ajax.ErrorTextStatus, error: string) => void;
    FuncBeforeSend?: () => void;
    FuncComplete?: (jqxhr: JQuery.jqXHR, textStatus: JQuery.Ajax.TextStatus) => void;
}

export interface IAjaxHelper {
    TryRefreshToken(notRedirectWhenNotAuth: boolean, callBack?: () => void): Promise<any>;//тут вообще токены возвращаются как минимум
    GoAjaxRequest(obj: IAjaxInputObject, fileLoad?: boolean): Promise<any>;
    TrySend(ajaxObj: JQuery.AjaxSettings): void;
}


export class FetchHelper implements IAjaxHelper {


    async TryRefreshToken(notRedirectWhenNotAuth: boolean, callBack?: () => void): Promise<any> {
        // await this.GoAjaxRequest({
        //     Type: 'POST', Data: {},
        //     Url: G_PathToServer + 'api/authenticate/refresh-access-token',
        //     NeedTryRefreshToken: false, NotGlobalError: true
        // }, false);
        let response = await fetch(G_PathToServer + 'api/authenticate/refresh-access-token', {
            method: 'POST',
            body: ''
        });

        let responseResult = await response.json();//todo а если тут что то другое? например файл

        let resp: MainErrorObjectBack = responseResult as MainErrorObjectBack;
        if (resp.errors) {
            //есть кейс когда сразу уходит 2 запроса, оба падают с просроченным токеном
            //и 1 из просов его уже обновил, второй пытается но падает тк прошлый токены уже все
            //в таком случае надо сходить и посмотреть а может уже все в порядке?
            //есть еще 2 вариант фикса, если с этим будут траблы, то надо рефрешить строго по очереди
            //тоесть если хотя бы 1 рефреш ушел, второй ждет и потом уже думать, можно его просто отпускать всегда
            //а можно проверять ответ первого(сложнее)
            let checkAuthResult = await this.CheckAuth();
            if (!checkAuthResult.Errors && checkAuthResult?.Data?.result) {
                var eventTokensRefresh = new CustomEvent("tokens_was_refreshed", {});
                window.dispatchEvent(eventTokensRefresh);
                return true;
            }
            else {
                localStorage.removeItem("header_auth");
                var eventLogOut = new CustomEvent("logout", {});
                window.dispatchEvent(eventLogOut);
                if (!notRedirectWhenNotAuth) {
                    location.href = '/menu/auth/login/';
                }

                return false;
            }

        }
        else {
            var eventTokensRefresh = new CustomEvent("tokens_was_refreshed", {});
            window.dispatchEvent(eventTokensRefresh);
        }


        return response.ok;
    }



    async GoAjaxRequest(obj: IAjaxInputObject, fileLoad?: boolean): Promise<any> {

        if (!obj.Type)
            obj.Type = 'GET';
        if (!obj.DataType)
            obj.DataType = 'json';//html

        if (obj.NeedTryRefreshToken !== false) {
            obj.NeedTryRefreshToken = true;
        }


        // var data = new FormData()
        // for (const file of input.files) {
        //   data.append('files',file,file.name)
        // }

        let response: Response;
        if (obj.Type.toUpperCase() === 'GET') {
            let getUrl = obj.Url;
            if (getUrl.endsWith('/')) {
                getUrl = getUrl.slice(0, -1);
            }

            let urlParams = new URLSearchParams();
            var dataKeys = Object.keys(obj.Data);
            dataKeys.forEach(x => {
                urlParams.append(x, obj.Data[x]);
            });

            getUrl += '?' + urlParams;

            response = await fetch(getUrl, {
                method: obj.Type
            });
        }
        else {
            let formData = new FormData();
            if (obj.Data instanceof FormData) {
                formData = obj.Data;
            }
            else {
                var dataKeys = Object.keys(obj.Data);
                dataKeys.forEach(x => {
                    formData.append(x, obj.Data[x]);
                });
            }

            response = await fetch(obj.Url, {
                method: obj.Type,
                body: formData
            });
        }

        let responseResult = await response.json();//todo а если тут что то другое? например файл

        if (response.status === 401) {
            if (obj.NeedTryRefreshToken) {
                let successedRefresh = await this.TryRefreshToken(obj.NotRedirectWhenNotAuth, null) as boolean;
                if (successedRefresh) {
                    let newObj = { ...obj };
                    newObj.NeedTryRefreshToken = false;
                    await this.GoAjaxRequest(newObj);
                }
            }
        }
        else {
            let resp: MainErrorObjectBack = responseResult as MainErrorObjectBack;
            if (resp?.errors && Array.isArray(resp.errors)) {
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

        if (response.ok) {
            obj.FuncSuccess(responseResult, null, null);
        }

    }



    TrySend(ajaxObj: JQuery.AjaxSettings<any>): void {
    }


    public async CheckAuth(): Promise<DataWithErrorBack<BoolResultBack>> {
        let response = await fetch(G_PathToServer + 'api/authenticate/check-auth', {
            method: 'GET'
        });

        let responseResult = await response.json();//todo а если тут что то другое? например файл

        return this.MapWithResultDataOnlyObject<BoolResultBack>(responseResult);
    }


    // MapWithResultDataOnly<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
    //     return new ControllerHelper().MapWithResultDataOnly(onSuccess);
    // }

    MapWithResultDataOnlyObject<T>(data: any) {
        return new ControllerHelper().MapWithResultDataOnlyObject<T>(data);
    }

}


export class AjaxHelper implements IAjaxHelper {

    public TryRefreshToken(notRedirectWhenNotAuth: boolean, callBack?: () => void): Promise<any> {
        return this.GoAjaxRequest({
            Data: {},
            Type: "POST",
            NeedTryRefreshToken: false,
            NotRedirectWhenNotAuth: notRedirectWhenNotAuth,//по сути просто возвращаем обратно, это поле нужно только в TryRefreshToken, и она не вызовется внутри
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //есть кейс когда сразу уходит 2 запроса, оба падают с просроченным токеном
                    //и 1 из просов его уже обновил, второй пытается но падает тк прошлый токены уже все
                    //в таком случае надо сходить и посмотреть а может уже все в порядке?
                    //есть еще 2 вариант фикса, если с этим будут траблы, то надо рефрешить строго по очереди
                    //тоесть если хотя бы 1 рефреш ушел, второй ждет и потом уже думать, можно его просто отпускать всегда
                    //а можно проверять ответ первого(сложнее)
                    this.CheckAuth((error: MainErrorObjectBack, data: BoolResultBack) => {
                        if (data?.result) {
                            var eventTokensRefresh = new CustomEvent("tokens_was_refreshed", {});
                            window.dispatchEvent(eventTokensRefresh);
                            if (callBack) {
                                callBack();
                            }
                        }
                        else {
                            localStorage.removeItem("header_auth");
                            var eventLogOut = new CustomEvent("logout", {});
                            window.dispatchEvent(eventLogOut);
                            if (!notRedirectWhenNotAuth) {
                                location.href = '/menu/auth/login/';
                            }
                        }
                    });
                }
                else {
                    var eventTokensRefresh = new CustomEvent("tokens_was_refreshed", {});
                    window.dispatchEvent(eventTokensRefresh);
                    if (callBack) {
                        callBack();
                    }
                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/authenticate/refresh-access-token',
            NotGlobalError: true,
        });
    }


    public CheckAuth(onSuccess: BoolWithError): void {
        this.GoAjaxRequest({
            Data: {},
            Type: "GET",
            NeedTryRefreshToken: false,
            NotRedirectWhenNotAuth: true,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/authenticate/check-auth',
            NotGlobalError: true,
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
        //todo а если false то что делать? никакого ни редиректа ничего не будет

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
                        thisRef.TryRefreshToken(obj.NotRedirectWhenNotAuth,
                            () => {
                                obj.NeedTryRefreshToken = false;
                                thisRef.GoAjaxRequest(obj, fileLoad);
                            }
                        );//TODO await или что то такое
                    }

                }
                else {
                    let resp: MainErrorObjectBack = jqXHR.responseJSON as MainErrorObjectBack;
                    if (resp?.errors && Array.isArray(resp.errors)) {
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
        // let haders: any = { 'Authorization_Access_Token': localStorage.getItem('access_token') };
        // if (obj.NeedTryRefreshToken) {
        //     haders['Authorization_Refresh_Token'] = localStorage.getItem('refresh_token');
        // }

        // ajaxObj.headers = haders;

        try {
            await this.TrySend(ajaxObj);
        }
        catch { }

    }

    public async TrySend(ajaxObj: JQuery.AjaxSettings): Promise<any> {//async       : Promise<any>

        await $.ajax(ajaxObj);//await

    }

    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);
    }




}











