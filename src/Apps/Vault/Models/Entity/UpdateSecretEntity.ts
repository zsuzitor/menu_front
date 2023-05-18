
export interface IUpdateSecretEntity {
    Id: number;
    VaultId: number;
    Key: string;
    Value: string;
    IsCoded: boolean;
    IsPublic: boolean;
    DieDate: Date;
}
