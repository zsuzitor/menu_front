import { AppAction } from "../../Actions/Actions";
import { AppState } from "../../Models/State/AppState";



import cloneDeep from 'lodash/cloneDeep';
import { ChangeCurrentVaultIdActionName, ISetVaultsSecretsActionPayload, SetVaultsListActionName, SetVaultsSecretsActionName } from "../../Actions/VaultApp/VaultActions";
import { OneVault } from "../../Models/VaultApp/State/OneVault";


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
                let vault = newState.VaultApp.VaultList.find(x => x.Id == typedAction.VaultId);
                vault.Secrets = typedAction.Secrets;
                return newState;
            }

    }

    return state;
}