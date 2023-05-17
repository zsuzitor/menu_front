import { OneVault } from "../Entity/State/OneVault";
import { AppAction } from "../../../../Models/Actions/Actions";
import { OneVaultInList } from "../Entity/State/OneVaultInList";
import { OneVaultSecret } from "../Entity/State/OneVaultSecret";
import { VaultUser } from "../Entity/State/VaultUser";
import { IUpdateSecretEntity } from "../Entity/UpdateSecretEntity";


export interface IChangeCurrentVaultIdActionPayload {
    Id: number;
}
export const ChangeCurrentVaultIdActionName: string = 'ChangeCurrentVaultIdAction';
export function ChangeCurrentVaultIdActionCreator(data: IChangeCurrentVaultIdActionPayload): AppAction<IChangeCurrentVaultIdActionPayload> {
    return { type: ChangeCurrentVaultIdActionName, payload: data };
};


export const SetVaultsListActionName: string = 'SetVaultsListAction';
export function SetVaultsListActionCreator(data: OneVaultInList[]): AppAction<OneVaultInList[]> {
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

export interface IDeleteSecretActionPayload {
    VaultId: number;
    SecretId: number;
}
export const DeleteSecretActionName: string = 'DeleteSecretAction';
export function DeleteSecretActionCreator(data: IDeleteSecretActionPayload): AppAction<IDeleteSecretActionPayload> {
    return { type: DeleteSecretActionName, payload: data };
};

export const SetSingleSecretActionName: string = 'SetSingleSecretAction';
export function SetSingleSecretActionCreator(data: OneVaultSecret): AppAction<OneVaultSecret> {
    return { type: SetSingleSecretActionName, payload: data };
};

export const SetCurrentVaultActionName: string = 'SetCurrentVaultAction';
export function SetCurrentVaultActionCreator(data: OneVault): AppAction<OneVault> {
    return { type: SetCurrentVaultActionName, payload: data };
};

export interface IUpdateVaultActionPayload {
    Id: number;
    Name: string;
    IsPublic: boolean;
}
export const UpdateVaultActionName: string = 'UpdateVaultAction';
export function UpdateVaultActionCreator(data: IUpdateVaultActionPayload): AppAction<IUpdateVaultActionPayload> {
    return { type: UpdateVaultActionName, payload: data };
};

export interface IUpdateSecretActionPayload extends IUpdateSecretEntity {
    Id: number;
    VaultId: number;
    Key: string;
    Value: string;
}

export const UpdateSecretActionName: string = 'UpdateSecretAction';
export function UpdateSecretActionCreator(data: IUpdateSecretActionPayload): AppAction<IUpdateSecretActionPayload> {
    return { type: UpdateSecretActionName, payload: data };
};

export const CreateSecretActionName: string = 'CreateSecretAction';
export function CreateSecretActionCreator(data: IUpdateSecretActionPayload): AppAction<IUpdateSecretActionPayload> {
    return { type: CreateSecretActionName, payload: data };
};

export interface ICreateVaultActionPayload {
    Id: number;
    Name: string;
    IsPublic: boolean;
}
export const CreateVaultActionName: string = 'CreateVaultAction';
export function CreateVaultActionCreator(data: ICreateVaultActionPayload): AppAction<ICreateVaultActionPayload> {
    return { type: CreateVaultActionName, payload: data };
};

export const DeleteVaultActionName: string = 'DeleteVaultAction';
export function DeleteVaultActionCreator(data: number): AppAction<number> {
    return { type: DeleteVaultActionName, payload: data };
};