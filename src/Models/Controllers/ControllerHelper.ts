import { MainErrorObjectBack } from "../BackModel/ErrorBack";

export class ControllerHelper {
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

export class DataWithErrorBack<T>{
    Errors: MainErrorObjectBack;
    Data: T;
}
