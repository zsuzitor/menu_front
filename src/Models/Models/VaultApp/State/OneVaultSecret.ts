import { MappedWithBack } from "../../../BL/Interfaces/MappedWithBack";
import { IOneVaultReturn } from "../../../BackModel/Vault/IOneVaultReturn";
import { IOneVaultSecretReturn } from "../../../BackModel/Vault/IOneVaultSecretReturn";



export class OneVaultSecret implements MappedWithBack<IOneVaultSecretReturn> {
    Id: number;
    Key: string;
    Value: string;
    IsCoded: boolean;//значение должно храниться зашифрованным
    IsPublic: boolean;//можно получить по прямой ссылке без всяких прав
    DieDate?: Date;

    constructor() {
    }

    FillByBackModel(newData: IOneVaultSecretReturn): void {
        this.Id = newData.id;
        this.Key = newData.key;
        this.Value = newData.value;
        this.IsCoded = newData.isCoded;
        this.IsPublic = newData.isPublic;
        this.DieDate = newData.dieDate;
    }
}