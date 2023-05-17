

import { CreateVaultActionCreator, DeleteSecretActionCreator, ICreateVaultActionPayload, SetCurrentVaultActionCreator, SetSingleSecretActionCreator, SetVaultsListActionCreator, SetVaultsPeopleActionCreator, SetVaultsSecretsActionCreator, UpdateVaultActionCreator } from "../../Actions/VaultApp/VaultActions";
import { BoolResultBack, StringResultBack } from "../../BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../BackModel/ErrorBack";
import { ICreateVaultReturn } from "../../BackModel/Vault/ICreateVaultReturn";
import { IOneVaultListReturn } from "../../BackModel/Vault/IOneVaultListReturn";
import { IOneVaultReturn } from "../../BackModel/Vault/IOneVaultReturn";
import { IOneVaultSecretReturn } from "../../BackModel/Vault/IOneVaultSecretReturn";
import { IVaultUserReturn } from "../../BackModel/Vault/IVaultUserReturn";
import { AlertData } from "../../Models/AlertData";
import { AppState } from "../../Models/State/AppState";
import { UpdateVaultEntity } from "../../Models/VaultApp/Entity/UpdateVaultEntity";
import { OneVault } from "../../Models/VaultApp/State/OneVault";
import { OneVaultInList } from "../../Models/VaultApp/State/OneVaultInList";
import { OneVaultSecret } from "../../Models/VaultApp/State/OneVaultSecret";
import { VaultUser } from "../../Models/VaultApp/State/VaultUser";
import { ControllerHelper } from "../ControllerHelper";



type SetVaultsReturn = (error: MainErrorObjectBack, data: IOneVaultListReturn[]) => void;
type SetVaultSecretsReturn = (error: MainErrorObjectBack, data: IOneVaultSecretReturn[]) => void;
type SetVaultPeopleReturn = (error: MainErrorObjectBack, data: IVaultUserReturn[]) => void;
type DeleteSecretReturn = (error: MainErrorObjectBack, data: BoolResultBack) => void;
type GetOneSecretReturn = (error: MainErrorObjectBack, data: IOneVaultSecretReturn) => void;
type GetOneVaultReturn = (error: MainErrorObjectBack, data: IOneVaultReturn) => void;
type CreateVaultReturn = (error: MainErrorObjectBack, data: ICreateVaultReturn) => void;
type UpdateVaultReturn = (error: MainErrorObjectBack, data: BoolResultBack) => void;




export interface IVaultController {

    GetVaultsRedux: () => void;
    GetVaultSecretsRedux: (vaultId: number) => void;
    GetCurrentVaultRedux: (vaultId: number) => void;
    LoadVaultPeopleRedux: (vaultId: number) => void;
    DeleteSecretRedux: (secretId: number, vaultId: number) => void;
    CreateSecretRedux: (secretId: number) => void;
    UpdateSecretRedux: (secretId: number) => void;

    GetSingleSecretRedux: (secretId: number) => void;
    UpdateVaultRedux: (vault: UpdateVaultEntity) => void;
    CreateVaultRedux: (vault: UpdateVaultEntity) => void;
    // GetOneSecretAsync: (secretId: number) => IOneVaultSecretReturn;
}



export class VaultController implements IVaultController {

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

    CreateSecretRedux(secretId: number) {
        return (dispatch: any, getState: any) => {
            // this.DeleteSecret(secretId, vaultId,
            //     (error: MainErrorObjectBack, data: BoolResultBack) => {
            //         if (data?.result) {
            //             dispatch(DeleteSecretActionCreator({ VaultId: vaultId, SecretId: secretId }));
            //         }
            //     });
        };
    }

    UpdateSecretRedux(secretId: number) {
        return (dispatch: any, getState: any) => {
            // this.DeleteSecret(secretId, vaultId,
            //     (error: MainErrorObjectBack, data: BoolResultBack) => {
            //         if (data?.result) {
            //             dispatch(DeleteSecretActionCreator({ VaultId: vaultId, SecretId: secretId }));
            //         }
            //     });
        };
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


    UpdateVaultRedux(vault: UpdateVaultEntity) {
        return (dispatch: any, getState: any) => {
            this.UpdateVault(vault,
                (error: MainErrorObjectBack, data: BoolResultBack) => {
                    if (data?.result) {
                        dispatch(UpdateVaultActionCreator({}));
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

    CreateVaultRedux(vault: UpdateVaultEntity) {
        return (dispatch: any, getState: any) => {
            this.CreateVault(vault,
                (error: MainErrorObjectBack, data: ICreateVaultReturn) => {
                    if (data?.id) {
                        let newdata = {} as ICreateVaultActionPayload;
                        newdata.Id = data.id;
                        newdata.IsPublic = data.isPublic;
                        newdata.Name = data.name;
                        dispatch(CreateVaultActionCreator(newdata));
                    }
                });
        };
    }

    CreateVault(vault: UpdateVaultEntity, onSuccess: CreateVaultReturn) {
        let newData = {} as ICreateVaultReturn;
        newData.id = vault.Id;
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

    //
    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);
    }

}



