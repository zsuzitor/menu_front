import { AppAction } from "../../Actions/Actions";
import { AppState } from "../../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { ChangeCurrentVaultIdActionName, CreateVaultActionName, DeleteSecretActionName, ICreateVaultActionPayload, IDeleteSecretActionPayload, ISetVaultsPeopleActionPayload, ISetVaultsSecretsActionPayload, IUpdateVaultActionPayload, SetCurrentVaultActionName, SetSingleSecretActionName, SetVaultsListActionName, SetVaultsPeopleActionName, SetVaultsSecretsActionName, UpdateVaultActionName } from "../../Actions/VaultApp/VaultActions";
import { OneVault } from "../../Models/VaultApp/State/OneVault";
import { OneVaultSecret } from "../../Models/VaultApp/State/OneVaultSecret";


export function VaultReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {

    switch (action.type) {
        case ChangeCurrentVaultIdActionName:
            {
                let newState = cloneDeep(state);
                newState.VaultApp.CurrentVaultId = action.payload.Id;
                return newState;
            }
        case SetVaultsListActionName:
            {
                let newState = cloneDeep(state);
                newState.VaultApp.VaultList = action.payload as OneVault[];
                return newState;
            }
        case SetVaultsSecretsActionName:
            {
                let newState = cloneDeep(state);
                let typedAction = action.payload as ISetVaultsSecretsActionPayload;
                // let vault = newState.VaultApp.VaultList.find(x => x.Id == typedAction.VaultId);
                let vault = newState.VaultApp.CurrentVault;

                vault.Secrets = typedAction.Secrets;
                return newState;
            }
        case SetVaultsPeopleActionName:
            {
                let newState = cloneDeep(state);
                let typedAction = action.payload as ISetVaultsPeopleActionPayload;
                // let vault = newState.VaultApp.VaultList.find(x => x.Id == typedAction.VaultId);
                let vault = newState.VaultApp.CurrentVault;

                vault.People = typedAction.People;
                return newState;
            }
        case DeleteSecretActionName:
            {
                let newState = cloneDeep(state);
                let typedAction = action.payload as IDeleteSecretActionPayload;
                // let vault = newState.VaultApp.VaultList.find(x => x.Id == typedAction.VaultId);
                let vault = newState.VaultApp.CurrentVault;
                vault.Secrets = vault.Secrets
                    .splice(vault.Secrets.findIndex(x => x.Id == typedAction.SecretId), 1);
                return newState;
            }
        case SetSingleSecretActionName:
            {
                let newState = cloneDeep(state);
                let typedAction = action.payload as OneVaultSecret;
                newState.VaultApp.OpenedSecret = typedAction;
                return newState;
            }
        case SetCurrentVaultActionName:
            {
                let newState = cloneDeep(state);
                let typedAction = action.payload as OneVault;
                newState.VaultApp.CurrentVault = typedAction;
                return newState;
            }

        case UpdateVaultActionName:
            {
                let newState = cloneDeep(state);
                let typedAction = action.payload as IUpdateVaultActionPayload;
                // newState.VaultApp.CurrentVault = typedAction;
                return newState;
            }
        case CreateVaultActionName:
            {
                let newState = cloneDeep(state);
                let typedAction = action.payload as ICreateVaultActionPayload;
                // newState.VaultApp.CurrentVault = typedAction;
                return newState;
            }

        //
        //

    }

    return state;
}