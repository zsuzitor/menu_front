import { MainErrorObjectBack } from "../BackModel/ErrorBack";
// import { TaskManagementPreloader } from "../Consts";

export class ControllerHelper {
    static GetHttp = 'GET';
    static PostHttp = 'POST';
    static PatchHttp = 'PATCH';
    static DeleteHttp = 'DELETE';
    static PutHttp = 'PUT';

    //из локального времени делает +0
    ToZeroDate(localDate: Date): Date {
        // Получаем смещение в минутах и конвертируем в миллисекунды
        const offsetMs = localDate.getTimezoneOffset() * 60000;

        // Компенсируем смещение, чтобы получить "наивную" дату
        return new Date(localDate.getTime() - offsetMs);
    }

    Preloader(show: boolean, preloaderElementId: string, counter: number): number {
        if (!counter) {
            counter = 0;
        }

        var preloader = document.getElementById(preloaderElementId);
        if (!preloader) {
            return counter;
        }

        if (show) {
            counter++;
            preloader.style.display = 'block';
        }
        else {
            counter--;
            if (!counter) {
                preloader.style.display = 'none';
            }
        }

        return counter;
    }

    MapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return (xhr: any, status: any, jqXHR: any) => {
            let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
            if (resp.errors) {
                onSuccess(resp, null);
            }
            else {
                let dataBack = xhr as T;
                onSuccess(null, dataBack);

            }
        }
    }

    MapWithResultDataOnly<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return (data: any) => {
            let resp: MainErrorObjectBack = data as MainErrorObjectBack;
            if (resp.errors) {
                onSuccess(resp, null);
            }
            else {
                let dataBack = data as T;
                onSuccess(null, dataBack);

            }
        }
    }


    MapWithResultDataOnlyObject<T>(data: any) {
        let resp: MainErrorObjectBack = data as MainErrorObjectBack;
        if (resp.errors) {
            let result = new DataWithErrorBack<T>();
            result.Errors = resp;
            result.Data = null;
            return result;
        }
        else {
            let dataBack = data as T;
            let result = new DataWithErrorBack<T>();
            result.Errors = null;
            result.Data = dataBack;
            return result;
        }
    }

    // MapWithResultDataOnlyObject<T>() {
    //     return (data: any) => {
    //         let resp: MainErrorObjectBack = data as MainErrorObjectBack;
    //         if (resp.errors) {
    //             let result = new DataWithErrorBack<T>();
    //             result.Errors = resp;
    //             result.Data = null;
    //             return result;
    //         }
    //         else {
    //             let dataBack = data as T;
    //             let result = new DataWithErrorBack<T>();
    //             result.Errors = null;
    //             result.Data = dataBack;
    //             return result;
    //         }
    //     }
    // }
}

export class DataWithErrorBack<T> {
    Errors: MainErrorObjectBack;
    Data: T;
}
