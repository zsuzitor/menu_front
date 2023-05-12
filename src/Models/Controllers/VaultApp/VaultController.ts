

import { SetVaultsListActionCreator, SetVaultsSecretsActionCreator } from "../../Actions/VaultApp/VaultActions";
import { BoolResultBack, StringResultBack } from "../../BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../BackModel/ErrorBack";
import { IOneVaultReturn } from "../../BackModel/Vault/IOneVaultReturn";
import { IOneVaultSecretReturn } from "../../BackModel/Vault/IOneVaultSecretReturn";
import { AlertData } from "../../Models/AlertData";
import { AppState } from "../../Models/State/AppState";
import { OneVault } from "../../Models/VaultApp/State/OneVault";
import { OneVaultSecret } from "../../Models/VaultApp/State/OneVaultSecret";
import { ControllerHelper } from "../ControllerHelper";



type SetVaultsReturn = (error: MainErrorObjectBack, data: IOneVaultReturn[]) => void;
type SetVaultSecretsReturn = (error: MainErrorObjectBack, data: IOneVaultSecretReturn[]) => void;



export interface IVaultController {

    GetVaultsRedux: () => void;
    GetVaultSecretsRedux: (vaultId: number) => void;
}



export class VaultController implements IVaultController {

    constructor() {
    }


    GetVaultsRedux() {
        return (dispatch: any, getState: any) => {
            this.GetVaults(
                (error: MainErrorObjectBack, data: IOneVaultReturn[]) => {
                    if (data) {
                        let newData = data.map(x => {
                            let us = new OneVault();
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
        resMoq.push({ id: 1, key: "11111", value: "val1", isCoded: false, isPublic: true, dieDate: null });
        resMoq.push({ id: 2, key: "111112", value: "val12", isCoded: false, isPublic: true, dieDate: null });
        resMoq.push({ id: 3, key: "111113", value: "val13", isCoded: false, isPublic: false, dieDate: null });
        resMoq.push({ id: 4, key: "111114", value: "val14", isCoded: false, isPublic: false, dieDate: null });
        resMoq.push({ id: 5, key: "111115", value: "val15", isCoded: true, isPublic: true, dieDate: null });
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

    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);
    }

}



