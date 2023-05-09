import { MappedWithBack } from "../../../BL/Interfaces/MappedWithBack";
import { IOneVaultReturn } from "../../../BackModel/Vault/IOneVaultReturn";
import { OneVaultSecret } from "./OneVaultSecret";


export class OneVault implements MappedWithBack<IOneVaultReturn> {
    Id: number;
    Name: string;
    Secrets: OneVaultSecret[];

    constructor() {
        this.Secrets = [];
    }

    FillByBackModel(newData: IOneVaultReturn): void {
        this.Id = newData.id;
        this.Name = newData.name;
    }
}