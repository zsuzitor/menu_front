

export declare  interface IAjaxInputObject {
    Type?: string;
    Data: any;//generic?
    Url: string;
    DataType?: string;
    FuncSuccess?: (xhr: any, status: JQuery.Ajax.SuccessTextStatus, jqXHR: JQuery.jqXHR) => void;
    FuncError?: (xhr: any, status: JQuery.Ajax.ErrorTextStatus, jqXHR: string) => void;
    FuncBeforeSend?: () => void;
    FuncComplete?: (jqxhr: JQuery.jqXHR, textStatus: JQuery.Ajax.TextStatus) => void;
}

export interface IAjaxHelper {
    TryRefreshToken(): void;
    GoAjaxRequest(obj: IAjaxInputObject, fileLoad?: boolean): void;
    TrySend(ajaxObj: JQuery.AjaxSettings): void;
}



export class AjaxHelper implements IAjaxHelper {

    public TryRefreshToken(): void {

    }

    public GoAjaxRequest(obj: IAjaxInputObject, fileLoad: boolean = false): void {
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
                    this.TryRefreshToken();
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

        this.TrySend(ajaxObj);


    }

    public TrySend(ajaxObj: JQuery.AjaxSettings): void {
        // if (tokenRequested) {//TODO
        //     setTimeout(function () {
        //         trySend(ajaxObj);
        //     }, 50);
        // }
        // else {
        $.ajax(ajaxObj);
        // }
    }
}











