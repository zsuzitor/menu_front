
export interface IOneVaultSecretReturn {
    id: number;
    key: string;
    value: string;
    isCoded: boolean;
    isPublic: boolean;
    dieDate: Date;
    vaultId: number;
}
