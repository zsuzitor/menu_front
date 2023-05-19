import { MappedWithBack } from "../../../../../Models/BL/Interfaces/MappedWithBack";
import { IOneVaultSecretReturn } from "../../BackModels/IOneVaultSecretReturn";



export class OneVaultSecret implements MappedWithBack<IOneVaultSecretReturn> {
    Id: number;
    Key: string;
    Value: string;
    IsCoded: boolean;//значение должно храниться зашифрованным
    IsPublic: boolean;//можно получить по прямой ссылке без всяких прав
    DieDate?: Date;
    VaultId: number;

    constructor() {
        this.Key = '';
        this.Value = '';
        this.IsCoded = false;
        this.IsPublic = false;
        this.DieDate = null;
    }

    FillByBackModel(newData: IOneVaultSecretReturn): void {
        this.Id = newData.id;
        this.Key = newData.key;
        this.Value = newData.value;
        this.IsCoded = newData.isCoded;
        this.IsPublic = newData.isPublic;
        this.DieDate = newData.dieDate;
        this.VaultId = newData.vaultId;
    }
}