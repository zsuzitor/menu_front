

import { CreateSecretActionCreator, CreateVaultActionCreator, DeleteSecretActionCreator, DeleteVaultActionCreator, ICreateVaultActionPayload, IUpdateVaultActionPayload, SetCurrentVaultActionCreator, SetSingleSecretActionCreator, SetVaultsListActionCreator, SetVaultsPeopleActionCreator, SetVaultsSecretsActionCreator, UpdateSecretActionCreator, UpdateVaultActionCreator, VaultAuthorizeActionCreator } from "../Actions/VaultActions";
import { BoolResultBack, StringResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ICreateVaultReturn } from "../BackModels/ICreateVaultReturn";
import { UpdateVaultEntity } from "../Entity/UpdateVaultEntity";
import { OneVault } from "../Entity/State/OneVault";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { IOneVaultListReturn } from "../BackModels/IOneVaultListReturn";
import { IOneVaultReturn } from "../BackModels/IOneVaultReturn";
import { IOneVaultSecretReturn } from "../BackModels/IOneVaultSecretReturn";
import { IVaultUserReturn } from "../BackModels/IVaultUserReturn";
import { OneVaultInList } from "../Entity/State/OneVaultInList";
import { OneVaultSecret } from "../Entity/State/OneVaultSecret";
import { VaultUser } from "../Entity/State/VaultUser";
import { IUpdateSecretEntity } from "../Entity/UpdateSecretEntity";
import { AlertData } from "../../../../Models/Entity/AlertData";
// import { IUpdateSecretReturn } from "../BackModels/IUpdateSecretReturn";



type SetVaultsReturn = (error: MainErrorObjectBack, data: IOneVaultListReturn[]) => void;
type SetVaultSecretsReturn = (error: MainErrorObjectBack, data: IOneVaultSecretReturn[]) => void;
type SetVaultPeopleReturn = (error: MainErrorObjectBack, data: IVaultUserReturn[]) => void;
type DeleteSecretReturn = (error: MainErrorObjectBack, data: BoolResultBack) => void;
type GetOneSecretReturn = (error: MainErrorObjectBack, data: IOneVaultSecretReturn) => void;
type GetOneVaultReturn = (error: MainErrorObjectBack, data: IOneVaultReturn) => void;
type CreateVaultReturn = (error: MainErrorObjectBack, data: ICreateVaultReturn) => void;
type UpdateVaultReturn = (error: MainErrorObjectBack, data: ICreateVaultReturn) => void;
type DeleteVaultReturn = (error: MainErrorObjectBack, data: BoolResultBack) => void;
type UpdateVaultPasswordReturn = (error: MainErrorObjectBack, data: BoolResultBack) => void;
type UpdateSecretReturn = (error: MainErrorObjectBack, data: IOneVaultSecretReturn) => void;
type VaultAuthorizeReturn = (error: MainErrorObjectBack, data: BoolResultBack) => void;




export interface IVaultController {
    RouteUrlVaultApp: string;
    RouteUrlVaultsList: string;
    RouteUrlOneVault: string;
    RouteUrlOneSecret: string;


    GetVaultsRedux: () => void;
    GetVaultSecretsRedux: (vaultId: number) => void;
    GetCurrentVaultRedux: (vaultId: number) => void;
    LoadVaultPeopleRedux: (vaultId: number) => void;
    DeleteSecretRedux: (secretId: number, vaultId: number) => void;
    CreateSecretRedux: (secret: IUpdateSecretEntity, successCallBack: () => void) => void;
    UpdateSecretRedux: (secret: IUpdateSecretEntity) => void;
    VaultAuthorizeRedux: (vaultId: number, password: string) => void;


    GetSingleSecretRedux: (secretId: number) => void;
    UpdateVaultRedux: (vault: UpdateVaultEntity, successCallBack?: () => void) => void;
    CreateVaultRedux: (vault: UpdateVaultEntity, successCallBack?: () => void) => void;
    DeleteVaultRedux: (vaultId: number) => void;
    UpdateVaultPasswordRedux: (vaultId: number, password: string) => void;
    // GetOneSecretAsync: (secretId: number) => IOneVaultSecretReturn;
}



export class VaultController implements IVaultController {
    RouteUrlVaultApp: string = "/vault-app";
    RouteUrlVaultsList: string = "/";
    RouteUrlOneVault: string = "/vault/";
    RouteUrlOneSecret: string = "/secret/";

    constructor() {
    }


    GetVaultsRedux() {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.GetVaults(
                (error: MainErrorObjectBack, data: IOneVaultListReturn[]) => {
                    this.preloader(false);
                    if (data) {
                        let newData = data.map(x => {
                            let us = new OneVaultInList();
                            us.FillByBackModel(x);
                            return us;
                        });

                        dispatch(SetVaultsListActionCreator(newData));
                    }
                });
        };
    }

    GetVaults(onSuccess: SetVaultsReturn) {
        G_AjaxHelper.GoAjaxRequest({
            Data: {
            },
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/vault/get-my-vaults',
        });
    }

    GetVaultSecretsRedux(vaultId: number) {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.GetVaultSecrets(vaultId,
                (error: MainErrorObjectBack, data: IOneVaultSecretReturn[]) => {
                    this.preloader(false);
                    if (data) {
                        let newData = data.map(x => {
                            let us = new OneVaultSecret();
                            us.FillByBackModel(x);
                            return us;
                        });

                        dispatch(SetVaultsSecretsActionCreator({ VaultId: vaultId, Secrets: newData }));
                    }
                });
        };
    }

    GetVaultSecrets(vaultId: number, onSuccess: SetVaultSecretsReturn) {

        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'vaultId': vaultId
            },
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/VaultSecret/get-vault-secrets',
        });
    }

    GetCurrentVaultRedux(vaultId: number) {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.GetVault(vaultId,
                (error: MainErrorObjectBack, data: IOneVaultReturn) => {
                    this.preloader(false);
                    if (data) {
                        let newData = new OneVault();
                        newData.FillByBackModel(data);
                        dispatch(SetCurrentVaultActionCreator(newData));
                    }
                });
        };
    }

    GetVault(vaultId: number, onSuccess: GetOneVaultReturn) {
        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'vaultId': vaultId
            },
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/vault/get-vault',
        });
    }


    LoadVaultPeopleRedux(vaultId: number) {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.LoadVaultPeople(vaultId,
                (error: MainErrorObjectBack, data: IVaultUserReturn[]) => {
                    this.preloader(false);
                    if (data) {
                        let newData = data.map(x => {
                            let us = new VaultUser();
                            us.FillByBackModel(x);
                            return us;
                        });

                        dispatch(SetVaultsPeopleActionCreator({ VaultId: vaultId, People: newData }));
                    }
                });
        };
    }

    LoadVaultPeople(vaultId: number, onSuccess: SetVaultPeopleReturn) {

        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'vaultId': vaultId
            },
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/vault/get-vault-people',
        });
    }


    DeleteSecretRedux(secretId: number) {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.DeleteSecret(secretId,
                (error: MainErrorObjectBack, data: BoolResultBack) => {
                    this.preloader(false);
                    if (data?.result) {
                        dispatch(DeleteSecretActionCreator({ SecretId: secretId }));
                    }
                });
        };
    }

    DeleteSecret(secretId: number, onSuccess: DeleteSecretReturn) {

        // onSuccess(null, { result: true });
        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'secretId': secretId
            },
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/VaultSecret/delete-secret',
        });
    }

    CreateSecretRedux(secret: IUpdateSecretEntity, successCallBack: () => void) {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.CreateSecret(secret,
                (error: MainErrorObjectBack, data: IOneVaultSecretReturn) => {
                    this.preloader(false);
                    if (data) {
                        let newData = new OneVaultSecret();
                        newData.FillByBackModel(data);
                        dispatch(CreateSecretActionCreator(newData));
                        if (successCallBack) {
                            successCallBack();
                        }
                    }
                });
        };
    }

    CreateSecret(secret: IUpdateSecretEntity, onSuccess: UpdateSecretReturn) {
        let data = {
            'VaultId': secret.VaultId,
            'Key': secret.Key,
            'Value': secret.Value,
            'IsCoded': secret.IsCoded,
            'IsPublic': secret.IsPublic,
        } as any;
        if (secret.DieDate) {
            data.DieDate = secret.DieDate.toJSON();
        }

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/VaultSecret/create-secret',
        });
    }

    UpdateSecretRedux(secret: IUpdateSecretEntity) {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.UpdateSecret(secret,
                (error: MainErrorObjectBack, data: IOneVaultSecretReturn) => {
                    this.preloader(false);
                    if (data) {
                        let newData = new OneVaultSecret();
                        newData.FillByBackModel(data);
                        dispatch(UpdateSecretActionCreator(newData));
                    }
                });
        };
    }

    UpdateSecret(secret: IUpdateSecretEntity, onSuccess: UpdateSecretReturn) {
        let data = {
            'Id': secret.Id,
            'VaultId': secret.VaultId,
            'Key': secret.Key,
            'Value': secret.Value,
            'IsCoded': secret.IsCoded,
            'IsPublic': secret.IsPublic,
        } as any;
        if (secret.DieDate) {
            data.DieDate = secret.DieDate.toJSON();
        }

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/VaultSecret/update-secret',
        });
    }

    GetSingleSecretRedux(secretId: number) {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.GetOneSecret(secretId,
                (error: MainErrorObjectBack, data: IOneVaultSecretReturn) => {
                    this.preloader(false);
                    if (data) {
                        let newData = new OneVaultSecret();
                        newData.FillByBackModel(data);

                        dispatch(SetSingleSecretActionCreator(newData));
                    }
                });
        };
    }

    GetOneSecret(secretId: number, onSuccess: GetOneSecretReturn) {

        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'secretId': secretId
            },
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/VaultSecret/get-secret',
        });
    }


    UpdateVaultRedux(vault: UpdateVaultEntity, successCallBack?: () => void) {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.UpdateVault(vault,
                (error: MainErrorObjectBack, data: ICreateVaultReturn) => {
                    this.preloader(false);
                    if (data) {
                        let newData = {} as IUpdateVaultActionPayload;
                        newData.Id = data.id;
                        newData.Name = data.name;
                        newData.IsPublic = data.is_public;
                        dispatch(UpdateVaultActionCreator(newData));
                        successCallBack();
                    }
                });
        };
    }

    UpdateVault(vault: UpdateVaultEntity, onSuccess: UpdateVaultReturn) {
        let data = new FormData();
        data.append('Id', vault.Id + '');
        data.append('Name', vault.Name);
        data.append('IsPublic', vault.IsPublic + '');

        if (vault.UsersForDelete) {
            vault.UsersForDelete.forEach((item, index) => {
                data.append('UsersForDelete', item + '');
            });
        }

        if (vault.UsersForAdd) {
            vault.UsersForAdd.forEach((item, index) => {
                data.append('UsersForAdd', item + '');
            });
        }

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/vault/update-vault',
        });
    }

    CreateVaultRedux(vault: UpdateVaultEntity, successCallBack?: () => void) {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.CreateVault(vault,
                (error: MainErrorObjectBack, data: ICreateVaultReturn) => {
                    this.preloader(false);
                    if (data?.id) {
                        let newdata = {} as ICreateVaultActionPayload;
                        newdata.Id = data.id;
                        newdata.IsPublic = data.is_public;
                        newdata.Name = data.name;
                        dispatch(CreateVaultActionCreator(newdata));
                        successCallBack();
                    }
                });
        };
    }

    CreateVault(vault: UpdateVaultEntity, onSuccess: CreateVaultReturn) {

        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'Name': vault.Name,
                'IsPublic': vault.IsPublic,
                'Password': vault.Password
            },
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/vault/create-vault',
        });
    }

    DeleteVaultRedux(vaultId: number) {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.DeleteVault(vaultId,
                (error: MainErrorObjectBack, data: BoolResultBack) => {
                    this.preloader(false);
                    if (data?.result) {
                        dispatch(DeleteVaultActionCreator(vaultId));
                    }
                });
        };
    }

    DeleteVault(vaultId: number, onSuccess: DeleteVaultReturn) {

        // onSuccess(null, BoolResultBack.GetTrue());
        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'vaultId': vaultId
            },
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/vault/delete-vault',
        });
    }

    UpdateVaultPasswordRedux(vaultId: number, pwd: string) {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.UpdateVaultPassword(vaultId, pwd,
                (error: MainErrorObjectBack, data: BoolResultBack) => {
                    this.preloader(false);
                    // if (data?.result) {
                    //     dispatch(DeleteVaultActionCreator(vaultId));
                    // }
                });
        };
    }

    UpdateVaultPassword(vaultId: number, pwd: string, onSuccess: UpdateVaultPasswordReturn) {

        // onSuccess(null, BoolResultBack.GetTrue());
        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'vaultId': vaultId,
                'password': pwd
            },
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/vault/change-password',
        });
    }

    VaultAuthorizeRedux(vaultId: number, password: string) {
        return (dispatch: any, getState: any) => {
            this.preloader(true);
            this.VaultAuthorize(vaultId, password,
                (error: MainErrorObjectBack, data: BoolResultBack) => {
                    this.preloader(false);
                    if (data?.result) {
                        dispatch(VaultAuthorizeActionCreator(true));
                    }
                    else {
                        let alertFactory = new AlertData();
                        let alert = alertFactory.GetDefaultError("Не удалось, проверьте пароль");
                        window.G_AddAbsoluteAlertToState(alert);
                    }
                });
        };
    }

    VaultAuthorize(vaultId: number, password: string, onSuccess: VaultAuthorizeReturn) {

        // onSuccess(null, BoolResultBack.GetTrue());
        G_AjaxHelper.GoAjaxRequest({
            Data: {
                'password': password,
                'vaultId': vaultId
            },
            Type: ControllerHelper.PostHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/vault/authorize',
        });
    }

    //
    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);
    }


    preloader(show: boolean) {
        if (!window.TaskManagementCounter) {
            window.TaskManagementCounter = 0;
        }

        var preloader = document.getElementById('vault_preloader');
        if (!preloader) {
            return;
        }

        if (show) {
            window.TaskManagementCounter++;
            preloader.style.display = 'block';
        }
        else {
            window.TaskManagementCounter--;
            if (!window.TaskManagementCounter) {
                preloader.style.display = 'none';
            }
        }
    }

}



