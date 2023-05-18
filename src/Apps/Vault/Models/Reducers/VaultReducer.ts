
import cloneDeep from 'lodash/cloneDeep';
import { AppAction } from '../../../../Models/Actions/Actions';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { OneVault } from '../Entity/State/OneVault';
import { OneVaultSecret } from '../Entity/State/OneVaultSecret';
import { ChangeCurrentVaultIdActionName, SetVaultsListActionName, SetVaultsSecretsActionName, ISetVaultsSecretsActionPayload, SetVaultsPeopleActionName, ISetVaultsPeopleActionPayload, DeleteSecretActionName, IDeleteSecretActionPayload, SetSingleSecretActionName, SetCurrentVaultActionName, UpdateVaultActionName, IUpdateVaultActionPayload, CreateVaultActionName, ICreateVaultActionPayload, DeleteVaultActionName, UpdateSecretActionName, CreateSecretActionName } from '../Actions/VaultActions';
import { OneVaultInList } from '../Entity/State/OneVaultInList';


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
                let vaultInList = newState.VaultApp.VaultList.find(x => x.Id == typedAction.Id);
                if (vaultInList) {
                    vaultInList.Name = typedAction.Name;
                }

                if (newState.VaultApp.CurrentVault?.Id == typedAction.Id) {
                    newState.VaultApp.CurrentVault.Name = typedAction.Name;
                    newState.VaultApp.CurrentVault.IsPublic = typedAction.IsPublic;
                }

                // newState.VaultApp.CurrentVault = typedAction;
                return newState;
            }
        case CreateVaultActionName:
            {
                let newState = cloneDeep(state);
                let typedAction = action.payload as ICreateVaultActionPayload;
                let newVault = new OneVaultInList();
                newVault.Id = typedAction.Id;
                newVault.Name = typedAction.Name;
                newState.VaultApp.VaultList = [...newState.VaultApp.VaultList, newVault];
                // newState.VaultApp.CurrentVault = typedAction;
                return newState;
            }
        case DeleteVaultActionName:
            {
                let newState = cloneDeep(state);
                let typedAction = action.payload as number;
                let indexForDel = newState.VaultApp.VaultList.findIndex(x => x.Id == typedAction);
                if (indexForDel >= 0) {
                    newState.VaultApp.VaultList.splice(indexForDel, 1);
                }

                if (newState.VaultApp.CurrentVaultId == typedAction
                    || newState.VaultApp.CurrentVault?.Id == typedAction) {
                    newState.VaultApp.CurrentVaultId = null;
                    newState.VaultApp.CurrentVault = null;
                }
                return newState;
            }
        case UpdateSecretActionName:
            {
                let newState = cloneDeep(state);
                let typedAction = action.payload as OneVaultSecret;
                if (newState.VaultApp.CurrentVault) {
                    let secret = newState.VaultApp.CurrentVault
                        .Secrets.find(x => x.Id == typedAction.Id);
                    if (secret) {
                        secret.Key = typedAction.Key;
                        secret.Value = typedAction.Value;
                        secret.DieDate = typedAction.DieDate;
                        secret.IsCoded = typedAction.IsCoded;
                        secret.IsPublic = typedAction.IsPublic;
                    }
                }

                return newState;
            }

        case CreateSecretActionName:
            {
                let newState = cloneDeep(state);
                let typedAction = action.payload as OneVaultSecret;
                if (newState.VaultApp.CurrentVault) {
                    let newSecret = new OneVaultSecret();
                    newSecret.Id = typedAction.Id;
                    newSecret.Key = typedAction.Key;
                    newSecret.Value = typedAction.Value;
                    newSecret.VaultId = typedAction.VaultId;
                    newSecret.DieDate = typedAction.DieDate;
                    newSecret.IsCoded = typedAction.IsCoded;
                    newSecret.IsPublic = typedAction.IsPublic;
                    newState.VaultApp.CurrentVault.Secrets.push(newSecret);
                }

                return newState;
            }



        //
        //

    }

    return state;
}