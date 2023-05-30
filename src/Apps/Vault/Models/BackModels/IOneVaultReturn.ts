import { IOneVaultSecretReturn } from "./IOneVaultSecretReturn";

export interface IOneVaultReturn {
    id: number;
    name: string;
    secrets: IOneVaultSecretReturn[];
    is_public: boolean;
    is_auth?: boolean;

}