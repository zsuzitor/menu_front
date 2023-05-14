import { IOneVaultSecretReturn } from "./IOneVaultSecretReturn";

export interface IOneVaultReturn {
    id: number;
    name: string;
    secrets: IOneVaultSecretReturn[];
    isPublic: boolean;

}