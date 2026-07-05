

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
import { VaultPreloader } from "../Consts";
import { ServerResult } from "../../../../Models/AjaxLogic";
// import { IUpdateSecretReturn } from "../BackModels/IUpdateSecretReturn";




export interface IVaultController {
    RouteUrlVaultApp: string;
    RouteUrlVaultsList: string;
    RouteUrlOneVault: string;
    RouteUrlOneSecret: string;


    GetVaultsRedux: () => (dispatch: any, getState: any) => Promise<void>;
    GetVaultSecretsRedux: (vaultId: number) => (dispatch: any, getState: any) => Promise<void>;
    GetCurrentVaultRedux: (vaultId: number) => (dispatch: any, getState: any) => Promise<void>;
    LoadVaultPeopleRedux: (vaultId: number) => (dispatch: any, getState: any) => Promise<void>;
    DeleteSecretRedux: (secretId: number, vaultId: number) => (dispatch: any, getState: any) => Promise<void>;
    CreateSecretRedux: (secret: IUpdateSecretEntity, successCallBack?: () => void) => (dispatch: any, getState: any) => Promise<void>;
    UpdateSecretRedux: (secret: IUpdateSecretEntity) => (dispatch: any, getState: any) => Promise<void>;
    VaultAuthorizeRedux: (vaultId: number, password: string) => (dispatch: any, getState: any) => Promise<void>;
    GetSingleSecretRedux: (secretId: number) => (dispatch: any, getState: any) => Promise<void>;
    UpdateVaultRedux: (vault: UpdateVaultEntity, successCallBack?: () => void) => (dispatch: any, getState: any) => Promise<void>;
    CreateVaultRedux: (vault: UpdateVaultEntity, successCallBack?: () => void) => (dispatch: any, getState: any) => Promise<void>;
    DeleteVaultRedux: (vaultId: number) => (dispatch: any, getState: any) => Promise<void>;
    UpdateVaultPasswordRedux: (vaultId: number, password: string) => (dispatch: any, getState: any) => Promise<void>;
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
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            try {
                const backResult = await this.GetVaultsAsync();
                this.preloader(false);
                if (backResult.Data) {
                    let newData = backResult.Data.map(x => {
                        let us = new OneVaultInList();
                        us.FillByBackModel(x);
                        return us;
                    });
                    dispatch(SetVaultsListActionCreator(newData));
                }
            } catch (error) {
                this.preloader(false);
                console.error("GetVaultsRedux error:", error);
            }
        };
    }

    async GetVaultsAsync(): Promise<ServerResult<IOneVaultListReturn[]>> {
        return await G_AjaxHelper.GoAjaxRequest<IOneVaultListReturn[]>({
            Data: {},
            Type: ControllerHelper.GetHttp,
            Url: G_PathToServer + 'api/vault/get-my-vaults',
        });
    }

    GetVaultSecretsRedux(vaultId: number) {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            try {
                const backResult = await this.GetVaultSecretsAsync(vaultId);
                this.preloader(false);
                if (backResult.Data) {
                    let newData = backResult.Data.map(x => {
                        let us = new OneVaultSecret();
                        us.FillByBackModel(x);
                        return us;
                    });
                    dispatch(SetVaultsSecretsActionCreator({ VaultId: vaultId, Secrets: newData }));
                }
            } catch (error) {
                this.preloader(false);
                console.error("GetVaultSecretsRedux error:", error);
            }
        };
    }

    async GetVaultSecretsAsync(vaultId: number): Promise<ServerResult<IOneVaultSecretReturn[]>> {
        return await G_AjaxHelper.GoAjaxRequest<IOneVaultSecretReturn[]>({
            Data: { vaultId: vaultId },
            Type: ControllerHelper.GetHttp,
            Url: G_PathToServer + 'api/VaultSecret/get-vault-secrets',
        });
    }

    GetCurrentVaultRedux(vaultId: number) {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            try {
                const backResult = await this.GetVaultAsync(vaultId);
                this.preloader(false);
                if (backResult.Data) {
                    let newData = new OneVault();
                    newData.FillByBackModel(backResult.Data);
                    dispatch(SetCurrentVaultActionCreator(newData));
                }
            } catch (error) {
                this.preloader(false);
                console.error("GetCurrentVaultRedux error:", error);
            }
        };
    }

    async GetVaultAsync(vaultId: number): Promise<ServerResult<IOneVaultReturn>> {
        return await G_AjaxHelper.GoAjaxRequest<IOneVaultReturn>({
            Data: { vaultId: vaultId },
            Type: ControllerHelper.GetHttp,
            Url: G_PathToServer + 'api/vault/get-vault',
        });
    }

    LoadVaultPeopleRedux(vaultId: number) {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            try {
                const backResult = await this.LoadVaultPeopleAsync(vaultId);
                this.preloader(false);
                if (backResult.Data) {
                    let newData = backResult.Data.map(x => {
                        let us = new VaultUser();
                        us.FillByBackModel(x);
                        return us;
                    });
                    dispatch(SetVaultsPeopleActionCreator({ VaultId: vaultId, People: newData }));
                }
            } catch (error) {
                this.preloader(false);
                console.error("LoadVaultPeopleRedux error:", error);
            }
        };
    }

    async LoadVaultPeopleAsync(vaultId: number): Promise<ServerResult<IVaultUserReturn[]>> {
        return await G_AjaxHelper.GoAjaxRequest<IVaultUserReturn[]>({
            Data: { vaultId: vaultId },
            Type: ControllerHelper.GetHttp,
            Url: G_PathToServer + 'api/vault/get-vault-people',
        });
    }


    DeleteSecretRedux(secretId: number) {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            try {
                const backResult = await this.DeleteSecretAsync(secretId);
                this.preloader(false);
                if (backResult.Data?.result) {
                    dispatch(DeleteSecretActionCreator({ SecretId: secretId }));
                }
            } catch (error) {
                this.preloader(false);
                console.error("DeleteSecretRedux error:", error);
            }
        };
    }

    async DeleteSecretAsync(secretId: number): Promise<ServerResult<BoolResultBack>> {
        return await G_AjaxHelper.GoAjaxRequest<BoolResultBack>({
            Data: { secretId: secretId },
            Type: ControllerHelper.DeleteHttp,
            Url: G_PathToServer + 'api/VaultSecret/delete-secret',
        });
    }

    CreateSecretRedux(secret: IUpdateSecretEntity, successCallBack?: () => void) {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            try {
                const backResult = await this.CreateSecretAsync(secret);
                this.preloader(false);
                if (backResult.Data) {
                    let newData = new OneVaultSecret();
                    newData.FillByBackModel(backResult.Data);
                    dispatch(CreateSecretActionCreator(newData));
                    if (successCallBack) {
                        successCallBack();
                    }
                }
            } catch (error) {
                this.preloader(false);
                console.error("CreateSecretRedux error:", error);
            }
        };
    }

    async CreateSecretAsync(secret: IUpdateSecretEntity): Promise<ServerResult<IOneVaultSecretReturn>> {
        let data = {
            VaultId: secret.VaultId,
            Key: secret.Key,
            Value: secret.Value,
            IsCoded: secret.IsCoded,
            IsPublic: secret.IsPublic,
        } as any;
        if (secret.DieDate) {
            data.DieDate = secret.DieDate.toJSON();
        }

        return await G_AjaxHelper.GoAjaxRequest<IOneVaultSecretReturn>({
            Data: data,
            Type: "PUT",
            Url: G_PathToServer + 'api/VaultSecret/create-secret',
        });
    }

    UpdateSecretRedux(secret: IUpdateSecretEntity) {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            try {
                const backResult = await this.UpdateSecretAsync(secret);
                this.preloader(false);
                if (backResult.Data) {
                    let newData = new OneVaultSecret();
                    newData.FillByBackModel(backResult.Data);
                    dispatch(UpdateSecretActionCreator(newData));
                }
            } catch (error) {
                this.preloader(false);
                console.error("UpdateSecretRedux error:", error);
            }
        };
    }

    async UpdateSecretAsync(secret: IUpdateSecretEntity): Promise<ServerResult<IOneVaultSecretReturn>> {
        let data = {
            Id: secret.Id,
            VaultId: secret.VaultId,
            Key: secret.Key,
            Value: secret.Value,
            IsCoded: secret.IsCoded,
            IsPublic: secret.IsPublic,
        } as any;
        if (secret.DieDate) {
            data.DieDate = secret.DieDate.toJSON();
        }

        return await G_AjaxHelper.GoAjaxRequest<IOneVaultSecretReturn>({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            Url: G_PathToServer + 'api/VaultSecret/update-secret',
        });
    }

    GetSingleSecretRedux(secretId: number) {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            try {
                const backResult = await this.GetOneSecretAsync(secretId);
                this.preloader(false);
                if (backResult.Data) {
                    let newData = new OneVaultSecret();
                    newData.FillByBackModel(backResult.Data);
                    dispatch(SetSingleSecretActionCreator(newData));
                }
            } catch (error) {
                this.preloader(false);
                console.error("GetSingleSecretRedux error:", error);
            }
        };
    }

    async GetOneSecretAsync(secretId: number): Promise<ServerResult<IOneVaultSecretReturn>> {
        return await G_AjaxHelper.GoAjaxRequest<IOneVaultSecretReturn>({
            Data: { secretId: secretId },
            Type: ControllerHelper.GetHttp,
            Url: G_PathToServer + 'api/VaultSecret/get-secret',
        });
    }


    UpdateVaultRedux(vault: UpdateVaultEntity, successCallBack?: () => void) {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            try {
                const backResult = await this.UpdateVaultAsync(vault);
                this.preloader(false);
                if (backResult.Data) {
                    let newData = {} as IUpdateVaultActionPayload;
                    newData.Id = backResult.Data.id;
                    newData.Name = backResult.Data.name;
                    newData.IsPublic = backResult.Data.is_public;
                    dispatch(UpdateVaultActionCreator(newData));
                    if (successCallBack) {
                        successCallBack();
                    }
                }
            } catch (error) {
                this.preloader(false);
                console.error("UpdateVaultRedux error:", error);
            }
        };
    }

    async UpdateVaultAsync(vault: UpdateVaultEntity): Promise<ServerResult<ICreateVaultReturn>> {
        let data = new FormData();
        data.append('Id', vault.Id + '');
        data.append('Name', vault.Name);
        data.append('IsPublic', vault.IsPublic + '');

        if (vault.UsersForDelete) {
            vault.UsersForDelete.forEach((item) => {
                data.append('UsersForDelete', item + '');
            });
        }

        if (vault.UsersForAdd) {
            vault.UsersForAdd.forEach((item) => {
                data.append('UsersForAdd', item + '');
            });
        }

        return await G_AjaxHelper.GoAjaxRequest<ICreateVaultReturn>({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            Url: G_PathToServer + 'api/vault/update-vault',
        });
    }

    CreateVaultRedux(vault: UpdateVaultEntity, successCallBack?: () => void) {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            try {
                const backResult = await this.CreateVaultAsync(vault);
                this.preloader(false);
                if (backResult.Data?.id) {
                    let newData = {} as ICreateVaultActionPayload;
                    newData.Id = backResult.Data.id;
                    newData.IsPublic = backResult.Data.is_public;
                    newData.Name = backResult.Data.name;
                    dispatch(CreateVaultActionCreator(newData));
                    if (successCallBack) {
                        successCallBack();
                    }
                }
            } catch (error) {
                this.preloader(false);
                console.error("CreateVaultRedux error:", error);
            }
        };
    }

    async CreateVaultAsync(vault: UpdateVaultEntity): Promise<ServerResult<ICreateVaultReturn>> {
        return await G_AjaxHelper.GoAjaxRequest<ICreateVaultReturn>({
            Data: {
                Name: vault.Name,
                IsPublic: vault.IsPublic,
                Password: vault.Password
            },
            Type: "PUT",
            Url: G_PathToServer + 'api/vault/create-vault',
        });
    }

    DeleteVaultRedux(vaultId: number) {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            try {
                const backResult = await this.DeleteVaultAsync(vaultId);
                this.preloader(false);
                if (backResult.Data?.result) {
                    dispatch(DeleteVaultActionCreator(vaultId));
                }
            } catch (error) {
                this.preloader(false);
                console.error("DeleteVaultRedux error:", error);
            }
        };
    }

    async DeleteVaultAsync(vaultId: number): Promise<ServerResult<BoolResultBack>> {
        return await G_AjaxHelper.GoAjaxRequest<BoolResultBack>({
            Data: { vaultId: vaultId },
            Type: ControllerHelper.DeleteHttp,
            Url: G_PathToServer + 'api/vault/delete-vault',
        });
    }

    UpdateVaultPasswordRedux(vaultId: number, password: string) {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            try {
                await this.UpdateVaultPasswordAsync(vaultId, password);
                this.preloader(false);
            } catch (error) {
                this.preloader(false);
                console.error("UpdateVaultPasswordRedux error:", error);
            }
        };
    }

    async UpdateVaultPasswordAsync(vaultId: number, password: string): Promise<ServerResult<BoolResultBack>> {
        return await G_AjaxHelper.GoAjaxRequest<BoolResultBack>({
            Data: {
                vaultId: vaultId,
                password: password
            },
            Type: ControllerHelper.PatchHttp,
            Url: G_PathToServer + 'api/vault/change-password',
        });
    }

    VaultAuthorizeRedux(vaultId: number, password: string) {
        return async (dispatch: any, getState: any) => {
            this.preloader(true);
            try {
                const backResult = await this.VaultAuthorizeAsync(vaultId, password);
                this.preloader(false);
                if (backResult.Data?.result) {
                    dispatch(VaultAuthorizeActionCreator(true));
                } else {
                    let alertFactory = new AlertData();
                    let alert = alertFactory.GetDefaultError("Не удалось, проверьте пароль");
                    window.G_AddAbsoluteAlertToState(alert);
                }
            } catch (error) {
                this.preloader(false);
                console.error("VaultAuthorizeRedux error:", error);
            }
        };
    }

    async VaultAuthorizeAsync(vaultId: number, password: string): Promise<ServerResult<BoolResultBack>> {
        return await G_AjaxHelper.GoAjaxRequest<BoolResultBack>({
            Data: {
                password: password,
                vaultId: vaultId
            },
            Type: ControllerHelper.PostHttp,
            Url: G_PathToServer + 'api/vault/authorize',
        });
    }

    //
    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);
    }


    preloader(show: boolean) {
        window.VaultCounter = new ControllerHelper()
            .Preloader(show, VaultPreloader, window.VaultCounter);
    }

}



