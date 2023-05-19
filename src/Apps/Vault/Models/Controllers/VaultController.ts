

import { CreateSecretActionCreator, CreateVaultActionCreator, DeleteSecretActionCreator, DeleteVaultActionCreator, ICreateVaultActionPayload, IUpdateVaultActionPayload, SetCurrentVaultActionCreator, SetSingleSecretActionCreator, SetVaultsListActionCreator, SetVaultsPeopleActionCreator, SetVaultsSecretsActionCreator, UpdateSecretActionCreator, UpdateVaultActionCreator } from "../Actions/VaultActions";
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
// import { IUpdateSecretReturn } from "../BackModels/IUpdateSecretReturn";



type SetVaultsReturn = (error: MainErrorObjectBack, data: IOneVaultListReturn[]) => void;
type SetVaultSecretsReturn = (error: MainErrorObjectBack, data: IOneVaultSecretReturn[]) => void;
type SetVaultPeopleReturn = (error: MainErrorObjectBack, data: IVaultUserReturn[]) => void;
type DeleteSecretReturn = (error: MainErrorObjectBack, data: BoolResultBack) => void;
type GetOneSecretReturn = (error: MainErrorObjectBack, data: IOneVaultSecretReturn) => void;
type GetOneVaultReturn = (error: MainErrorObjectBack, data: IOneVaultReturn) => void;
type CreateVaultReturn = (error: MainErrorObjectBack, data: ICreateVaultReturn) => void;
type UpdateVaultReturn = (error: MainErrorObjectBack, data: BoolResultBack) => void;
type DeleteVaultReturn = (error: MainErrorObjectBack, data: BoolResultBack) => void;
type UpdateSecretReturn = (error: MainErrorObjectBack, data: IOneVaultSecretReturn) => void;




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
    CreateSecretRedux: (secret: IUpdateSecretEntity) => void;
    UpdateSecretRedux: (secret: IUpdateSecretEntity) => void;

    GetSingleSecretRedux: (secretId: number) => void;
    UpdateVaultRedux: (vault: UpdateVaultEntity, successCallBack?: () => void) => void;
    CreateVaultRedux: (vault: UpdateVaultEntity, successCallBack?: () => void) => void;
    DeleteVaultRedux: (vaultId: number) => void;
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
            this.GetVaults(
                (error: MainErrorObjectBack, data: IOneVaultListReturn[]) => {
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
        let resMoq = [];
        resMoq.push({ id: 1, name: "11111" });
        resMoq.push({ id: 2, name: "22" });
        resMoq.push({ id: 3, name: "33" });
        resMoq.push({ id: 4, name: "44" });
        onSuccess(null, resMoq);
        // G_AjaxHelper.GoAjaxRequest({
        //     Data: {
        //         'roomname': roomname,
        //         'userConnectionId': userId
        //     },
        //     Type: "GET",
        //     FuncSuccess: (xhr, status, jqXHR) => {
        //         this.mapWithResult(onSuccess)(xhr, status, jqXHR);
        //     },
        //     FuncError: (xhr, status, error) => { },
        //     Url: G_PathToServer + 'api/PlanitPoker/get-users-in-room',

        // });
    }

    GetVaultSecretsRedux(vaultId: number) {
        return (dispatch: any, getState: any) => {
            this.GetVaultSecrets(vaultId,
                (error: MainErrorObjectBack, data: IOneVaultSecretReturn[]) => {
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
        let resMoq = [];

        // isCoded: boolean;
        // isPublic: boolean;
        // dieDate: Date;
        resMoq.push({ vaultId: vaultId, id: 1, key: "111111", value: "val11", isCoded: false, isPublic: true, dieDate: null });
        resMoq.push({ vaultId: vaultId, id: 2, key: "111112", value: "val12", isCoded: false, isPublic: true, dieDate: null });
        resMoq.push({ vaultId: vaultId, id: 3, key: "111113", value: "val13", isCoded: false, isPublic: false, dieDate: null });
        resMoq.push({ vaultId: vaultId, id: 4, key: "111114", value: "val14", isCoded: false, isPublic: false, dieDate: null });
        resMoq.push({ vaultId: vaultId, id: 5, key: "111115", value: "val15", isCoded: true, isPublic: true, dieDate: null });
        onSuccess(null, resMoq);
        // G_AjaxHelper.GoAjaxRequest({
        //     Data: {
        //         'roomname': roomname,
        //         'userConnectionId': userId
        //     },
        //     Type: "GET",
        //     FuncSuccess: (xhr, status, jqXHR) => {
        //         this.mapWithResult(onSuccess)(xhr, status, jqXHR);
        //     },
        //     FuncError: (xhr, status, error) => { },
        //     Url: G_PathToServer + 'api/PlanitPoker/get-users-in-room',

        // });
    }

    GetCurrentVaultRedux(vaultId: number) {
        return (dispatch: any, getState: any) => {
            this.GetCurrentVault(vaultId,
                (error: MainErrorObjectBack, data: IOneVaultReturn) => {
                    if (data) {
                        let newData = new OneVault();
                        newData.FillByBackModel(data);
                        dispatch(SetCurrentVaultActionCreator(newData));
                    }
                });
        };
    }

    GetCurrentVault(vaultId: number, onSuccess: GetOneVaultReturn) {
        let resMoq = {} as IOneVaultReturn;
        resMoq.id = vaultId;
        resMoq.isPublic = true;
        resMoq.name = 'nametest';
        resMoq.secrets
        this.GetVaultSecrets(vaultId, (error: MainErrorObjectBack, data: IOneVaultSecretReturn[]) => {
            resMoq.secrets = data;
        });
        onSuccess(null, resMoq);
        // G_AjaxHelper.GoAjaxRequest({
        //     Data: {
        //         'roomname': roomname,
        //         'userConnectionId': userId
        //     },
        //     Type: "GET",
        //     FuncSuccess: (xhr, status, jqXHR) => {
        //         this.mapWithResult(onSuccess)(xhr, status, jqXHR);
        //     },
        //     FuncError: (xhr, status, error) => { },
        //     Url: G_PathToServer + 'api/PlanitPoker/get-users-in-room',

        // });
    }


    LoadVaultPeopleRedux(vaultId: number) {
        return (dispatch: any, getState: any) => {
            this.LoadVaultPeople(vaultId,
                (error: MainErrorObjectBack, data: IVaultUserReturn[]) => {
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
        let resMoq = [];

        // isCoded: boolean;
        // isPublic: boolean;
        // dieDate: Date;
        resMoq.push({ id: 1, email: 'userMail1@vvv.vv' });
        resMoq.push({ id: 2, email: 'userMail2@vvv.vv' });
        resMoq.push({ id: 3, email: 'userMail3@vvv.vv' });
        resMoq.push({ id: 4, email: 'userMail4@vvv.vv' });
        resMoq.push({ id: 5, email: 'userMail5@vvv.vv' });
        onSuccess(null, resMoq);
        // G_AjaxHelper.GoAjaxRequest({
        //     Data: {
        //         'roomname': roomname,
        //         'userConnectionId': userId
        //     },
        //     Type: "GET",
        //     FuncSuccess: (xhr, status, jqXHR) => {
        //         this.mapWithResult(onSuccess)(xhr, status, jqXHR);
        //     },
        //     FuncError: (xhr, status, error) => { },
        //     Url: G_PathToServer + 'api/PlanitPoker/get-users-in-room',

        // });
    }


    DeleteSecretRedux(secretId: number, vaultId: number) {
        return (dispatch: any, getState: any) => {
            this.DeleteSecret(secretId, vaultId,
                (error: MainErrorObjectBack, data: BoolResultBack) => {
                    if (data?.result) {
                        dispatch(DeleteSecretActionCreator({ VaultId: vaultId, SecretId: secretId }));
                    }
                });
        };
    }

    DeleteSecret(secretId: number, vaultId: number, onSuccess: DeleteSecretReturn) {

        onSuccess(null, { result: true });
        // G_AjaxHelper.GoAjaxRequest({
        //     Data: {
        //         'roomname': roomname,
        //         'userConnectionId': userId
        //     },
        //     Type: "GET",
        //     FuncSuccess: (xhr, status, jqXHR) => {
        //         this.mapWithResult(onSuccess)(xhr, status, jqXHR);
        //     },
        //     FuncError: (xhr, status, error) => { },
        //     Url: G_PathToServer + 'api/PlanitPoker/get-users-in-room',

        // });
    }

    CreateSecretRedux(secret: IUpdateSecretEntity) {
        return (dispatch: any, getState: any) => {
            this.CreateSecret(secret,
                (error: MainErrorObjectBack, data: IOneVaultSecretReturn) => {
                    if (data) {
                        let newData = new OneVaultSecret();
                        newData.FillByBackModel(data);
                        dispatch(CreateSecretActionCreator(newData));
                    }
                });
        };
    }

    CreateSecret(secret: IUpdateSecretEntity, onSuccess: UpdateSecretReturn) {
        let newData = {} as IOneVaultSecretReturn;
        newData.id = Math.floor(Math.random() * 9999);
        newData.dieDate = secret.DieDate;
        newData.isCoded = secret.IsCoded;
        newData.isPublic = secret.IsPublic;
        newData.key = secret.Key;
        newData.value = secret.Value;
        newData.vaultId = secret.VaultId;
        onSuccess(null, newData);
        //G_AjaxHelper.GoAjaxRequest({
        //     Data: {
        //         'roomname': roomname,
        //         'userConnectionId': userId
        //     },
        //     Type: "GET",
        //     FuncSuccess: (xhr, status, jqXHR) => {
        //         this.mapWithResult(onSuccess)(xhr, status, jqXHR);
        //     },
        //     FuncError: (xhr, status, error) => { },
        //     Url: G_PathToServer + 'api/PlanitPoker/get-users-in-room',

        // });
    }

    UpdateSecretRedux(secret: IUpdateSecretEntity) {
        return (dispatch: any, getState: any) => {
            this.UpdateSecret(secret,
                (error: MainErrorObjectBack, data: IOneVaultSecretReturn) => {
                    if (data) {//todo закидывать secret? тогде поменять на bool result
                        let newData = new OneVaultSecret();
                        newData.FillByBackModel(data);
                        dispatch(UpdateSecretActionCreator(newData));
                    }
                });
        };
    }

    UpdateSecret(secret: IUpdateSecretEntity, onSuccess: UpdateSecretReturn) {
        let newData = {} as IOneVaultSecretReturn;
        newData.id = secret.Id;
        newData.dieDate = secret.DieDate;
        newData.isCoded = secret.IsCoded;
        newData.isPublic = secret.IsPublic;
        newData.key = secret.Key;
        newData.value = secret.Value;
        newData.vaultId = secret.VaultId;
        // newData.id = Math.floor(Math.random() * 9999);
        onSuccess(null, newData);
        //G_AjaxHelper.GoAjaxRequest({
        //     Data: {
        //         'roomname': roomname,
        //         'userConnectionId': userId
        //     },
        //     Type: "GET",
        //     FuncSuccess: (xhr, status, jqXHR) => {
        //         this.mapWithResult(onSuccess)(xhr, status, jqXHR);
        //     },
        //     FuncError: (xhr, status, error) => { },
        //     Url: G_PathToServer + 'api/PlanitPoker/get-users-in-room',

        // });
    }

    GetSingleSecretRedux(secretId: number) {
        return (dispatch: any, getState: any) => {
            this.GetOneSecret(secretId,
                (error: MainErrorObjectBack, data: IOneVaultSecretReturn) => {
                    if (data) {
                        let newData = new OneVaultSecret();
                        newData.FillByBackModel(data);

                        dispatch(SetSingleSecretActionCreator(newData));
                    }
                });
        };
    }

    GetOneSecret(secretId: number, onSuccess: GetOneSecretReturn) {
        let rs = {} as IOneVaultSecretReturn;
        rs.id = secretId;
        rs.isCoded = true;
        rs.isPublic = true;
        rs.key = 'test1';
        rs.value = 'val1';
        rs.vaultId = 1;
        onSuccess(null, rs);
        //G_AjaxHelper.GoAjaxRequest({
        //     Data: {
        //         'roomname': roomname,
        //         'userConnectionId': userId
        //     },
        //     Type: "GET",
        //     FuncSuccess: (xhr, status, jqXHR) => {
        //         this.mapWithResult(onSuccess)(xhr, status, jqXHR);
        //     },
        //     FuncError: (xhr, status, error) => { },
        //     Url: G_PathToServer + 'api/PlanitPoker/get-users-in-room',

        // });
    }


    UpdateVaultRedux(vault: UpdateVaultEntity, successCallBack?: () => void) {
        return (dispatch: any, getState: any) => {
            this.UpdateVault(vault,
                (error: MainErrorObjectBack, data: BoolResultBack) => {
                    if (data?.result) {
                        let newData = {} as IUpdateVaultActionPayload;
                        newData.Id = vault.Id;
                        newData.Name = vault.Name;
                        newData.IsPublic = vault.IsPublic;
                        dispatch(UpdateVaultActionCreator(newData));
                        successCallBack();
                    }
                });
        };
    }

    UpdateVault(vault: UpdateVaultEntity, onSuccess: UpdateVaultReturn) {

        onSuccess(null, BoolResultBack.GetTrue());
        //G_AjaxHelper.GoAjaxRequest({
        //     Data: {
        //         'roomname': roomname,
        //         'userConnectionId': userId
        //     },
        //     Type: "GET",
        //     FuncSuccess: (xhr, status, jqXHR) => {
        //         this.mapWithResult(onSuccess)(xhr, status, jqXHR);
        //     },
        //     FuncError: (xhr, status, error) => { },
        //     Url: G_PathToServer + 'api/PlanitPoker/get-users-in-room',

        // });
    }

    CreateVaultRedux(vault: UpdateVaultEntity, successCallBack?: () => void) {
        return (dispatch: any, getState: any) => {
            this.CreateVault(vault,
                (error: MainErrorObjectBack, data: ICreateVaultReturn) => {
                    if (data?.id) {
                        let newdata = {} as ICreateVaultActionPayload;
                        newdata.Id = data.id;
                        newdata.IsPublic = data.isPublic;
                        newdata.Name = data.name;
                        dispatch(CreateVaultActionCreator(newdata));
                        successCallBack();
                    }
                });
        };
    }

    CreateVault(vault: UpdateVaultEntity, onSuccess: CreateVaultReturn) {
        let newData = {} as ICreateVaultReturn;
        // newData.id = vault.Id;
        newData.id = Math.floor(Math.random() * 9999);
        newData.name = vault.Name;
        newData.isPublic = vault.IsPublic;
        onSuccess(null, newData);
        //G_AjaxHelper.GoAjaxRequest({
        //     Data: {
        //         'roomname': roomname,
        //         'userConnectionId': userId
        //     },
        //     Type: "GET",
        //     FuncSuccess: (xhr, status, jqXHR) => {
        //         this.mapWithResult(onSuccess)(xhr, status, jqXHR);
        //     },
        //     FuncError: (xhr, status, error) => { },
        //     Url: G_PathToServer + 'api/PlanitPoker/get-users-in-room',

        // });
    }

    DeleteVaultRedux(vaultId: number) {
        return (dispatch: any, getState: any) => {
            this.DeleteVault(vaultId,
                (error: MainErrorObjectBack, data: BoolResultBack) => {
                    if (data?.result) {
                        dispatch(DeleteVaultActionCreator(vaultId));
                    }
                });
        };
    }

    DeleteVault(vaultId: number, onSuccess: DeleteVaultReturn) {

        onSuccess(null, BoolResultBack.GetTrue());
        //G_AjaxHelper.GoAjaxRequest({
        //     Data: {
        //         'roomname': roomname,
        //         'userConnectionId': userId
        //     },
        //     Type: "GET",
        //     FuncSuccess: (xhr, status, jqXHR) => {
        //         this.mapWithResult(onSuccess)(xhr, status, jqXHR);
        //     },
        //     FuncError: (xhr, status, error) => { },
        //     Url: G_PathToServer + 'api/PlanitPoker/get-users-in-room',

        // });
    }

    //
    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);
    }

}



