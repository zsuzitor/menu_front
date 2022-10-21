import { BoolResultBack, StringResultBack } from "../BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../BackModel/ErrorBack";
import { UserShortBack } from "../BackModel/UserShort";
import { ControllerHelper } from "./ControllerHelper";


export type GetUserShort = (error: MainErrorObjectBack, data: UserShortBack) => void;
export type ChangePassword = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type ChangeName = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type ImageChanged = (error: MainErrorObjectBack, data: StringResultBack) => void;



export interface IUsersController {
    GetShortestUserInfo: (onSuccess: GetUserShort) => void;
    ChangePassword: (oldPassword: string, newPassword: string, onSuccess: ChangePassword) => void;
    ChangeName: (newName: string, onSuccess: ChangeName) => void;
    UpdateImage: (mainImageSave: File, onSuccess: ImageChanged) => void;
}


export class UsersController implements IUsersController {
    GetShortestUserInfo(onSuccess: GetUserShort) {
        G_AjaxHelper.GoAjaxRequest({
            Data: {},
            Type: "GET",
            NotRedirectWhenNotAuth: true,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

                // let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                // if (resp.errors) {
                //     //TODO ошибка
                //     onSuccess(resp, null);

                // }
                // else {
                //     let dataBack = xhr as UserShortBack;

                //     if (!dataBack.id) {
                //         //TODO какая то ошибка
                //         alert('что то сломалось-1');
                //         return;
                //     }
                //     onSuccess(null, dataBack);

                // }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/users/get-shortest-user-info',

        });
    }




    ChangePassword = (oldPassword: string, newPassword: string, onSuccess: ChangePassword) => {
        let data = {
            "oldPassword": oldPassword,
            "newPassword": newPassword,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PATCH",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/users/change-user-password'

        });
    }

    ChangeName = (newName: string, onSuccess: ChangeName) => {
        let data = {
            "newName": newName,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PATCH",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/users/change-user-name'

        });
    }



    UpdateImage(mainImageSave: File, onSuccess: ImageChanged) {
        let data = new FormData();
        if (mainImageSave) {
            data.append('image', mainImageSave);
        }

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PATCH",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/users/change-user-image',

        }, true);
    }


    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);
    }
}



