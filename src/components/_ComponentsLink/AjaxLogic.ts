

export declare interface IAjaxInputObject {
    Type?: string;
    Data: any;//generic?
    Url: string;
    DataType?: string;
    FuncSuccess?: (xhr: any, status: JQuery.Ajax.SuccessTextStatus, jqXHR: JQuery.jqXHR) => void;
    FuncError?: (xhr: any, status: JQuery.Ajax.ErrorTextStatus, error: string) => void;
    FuncBeforeSend?: () => void;
    FuncComplete?: (jqxhr: JQuery.jqXHR, textStatus: JQuery.Ajax.TextStatus) => void;
}

export interface IAjaxHelper {
    TryRefreshToken(): void;
    GoAjaxRequest(obj: IAjaxInputObject, fileLoad?: boolean): Promise<any>;
    TrySend(ajaxObj: JQuery.AjaxSettings): void;
}



export class AjaxHelper implements IAjaxHelper {

    public TryRefreshToken(): void {

    }

    public async GoAjaxRequest(obj: IAjaxInputObject, fileLoad: boolean = false): Promise<any> {
        let thisRef = this;

        if (!obj.Type)
            obj.Type = 'GET';
        if (!obj.DataType)
            obj.DataType = 'json';//html

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
            headers: { 'Authorization_Access_Token': localStorage.getItem('access_token') },
            // hides the loader after completion of request, whether successfull or failor.
            complete: function (jqXHR, status) {
                if (jqXHR.status == 401) {
                    thisRef.TryRefreshToken();
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

        try {
            await this.TrySend(ajaxObj);
        }
        catch { }

    }

    public async TrySend(ajaxObj: JQuery.AjaxSettings): Promise<any> {//async       : Promise<any>
        // if (tokenRequested) {//TODO
        //     setTimeout(function () {
        //         trySend(ajaxObj);
        //     }, 50);
        // }
        // else {
        await $.ajax(ajaxObj);//await

        // }
    }
}











