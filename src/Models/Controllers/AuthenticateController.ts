import { MainErrorObjectBack } from "../BackModel/ErrorBack";
import { OnlyError } from "./BO/ControllersOutput";
import { ControllerHelper } from "./ControllerHelper";




export interface IAuthenticateController {
    Login: (model: LoginModel, onSuccess: OnlyError) => void;//(success: OnlyError) => void;
    Register: (model: RegisterModel, onSuccess: OnlyError) => void;
    Logout: () => void;
    RefreshAccessToken: (notRedirectWhenNotAuth: boolean, callBack?: () => void) => void;
    SendMessageForgotPassword: (login: string, onSuccess: OnlyError) => void;
    CheckRecoverPasswordCode: (code: string, onSuccess: OnlyError) => void;
    RecoverPassword: (code: string, password: string, onSuccess: OnlyError) => void;
}

export class LoginModel {
    Email: string;
    Password: string;
}

export class RegisterModel {
    Email: string;
    Password: string;
    ConfirmPassword: string;
}


export class AuthenticateController implements IAuthenticateController {


    Login(model: LoginModel, onSuccess: OnlyError): void {

        let data = {
            'email': model.Email,
            'password': model.Password,
        };

        // let ajx: AjaxHelper.IAjaxHelper = new AjaxHelper.AjaxHelper();
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "POST",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/authenticate/login',

        });

    }



    Register(model: RegisterModel, onSuccess: OnlyError) {
        let data = {
            'email': model.Email,
            'password': model.Password,
            "password_confirm": model.ConfirmPassword,
        };

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            Url: G_PathToServer + 'api/authenticate/register',

        });
    }

    SendMessageForgotPassword(login: string, onSuccess: OnlyError): void {

        let data = {
            'email': login,
        };

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "POST",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/authenticate/SendMessageForgotPassword',

        });

    }

    CheckRecoverPasswordCode(code: string, onSuccess: OnlyError): void {

        let data = {
            'code': code,
        };

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "POST",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/authenticate/CheckRecoverPasswordCode',
        });
    }

    RecoverPassword(code: string, password: string, onSuccess: OnlyError): void {

        let data = {
            'code': code,
            'password': password,
        };

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "POST",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/authenticate/RecoverPassword',
        });
    }


    Logout() {
        alert('not inplemented');
        return;
        let data = {
        };

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "GET",
            FuncSuccess: (xhr, status, jqXHR) => {
                
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                // if (resp.errors) {
                //     onSuccess(resp);
                // }
                // else {
                //     onSuccess(null);
                // }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/authenticate/logout',

        });
    }

    RefreshAccessToken(notRedirectWhenNotAuth: boolean, callBack?: () => void) {
        G_AjaxHelper.TryRefreshToken(notRedirectWhenNotAuth, callBack);
    }




    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

    }
}




