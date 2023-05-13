import { OneVault } from "../../Models/VaultApp/State/OneVault";
import { OneVaultSecret } from "../../Models/VaultApp/State/OneVaultSecret";
import { VaultUser } from "../../Models/VaultApp/State/VaultUser";
import { AppAction } from "../Actions";


export interface IChangeCurrentVaultIdActionPayload {
    Id: number;
}
export const ChangeCurrentVaultIdActionName: string = 'ChangeCurrentVaultIdAction';
export function ChangeCurrentVaultIdActionCreator(data: IChangeCurrentVaultIdActionPayload): AppAction<IChangeCurrentVaultIdActionPayload> {
    return { type: ChangeCurrentVaultIdActionName, payload: data };
};


export const SetVaultsListActionName: string = 'SetVaultsListAction';
export function SetVaultsListActionCreator(data: OneVault[]): AppAction<OneVault[]> {
    return { type: SetVaultsListActionName, payload: data };
};

export interface ISetVaultsSecretsActionPayload {
    VaultId: number;
    Secrets: OneVaultSecret[];
}
export const SetVaultsSecretsActionName: string = 'SetVaultsSecretsAction';
export function SetVaultsSecretsActionCreator(data: ISetVaultsSecretsActionPayload): AppAction<ISetVaultsSecretsActionPayload> {
    return { type: SetVaultsSecretsActionName, payload: data };
};

export interface ISetVaultsPeopleActionPayload {
    VaultId: number;
    People: VaultUser[];
}
export const SetVaultsPeopleActionName: string = 'SetVaultsPeopleAction';
export function SetVaultsPeopleActionCreator(data: ISetVaultsPeopleActionPayload): AppAction<ISetVaultsPeopleActionPayload> {
    return { type: SetVaultsPeopleActionName, payload: data };
};