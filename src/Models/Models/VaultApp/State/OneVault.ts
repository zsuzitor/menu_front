import { MappedWithBack } from "../../../BL/Interfaces/MappedWithBack";
import { IOneVaultReturn } from "../../../BackModel/Vault/IOneVaultReturn";
import { OneVaultSecret } from "./OneVaultSecret";
import { VaultUser } from "./VaultUser";


export class OneVault implements MappedWithBack<IOneVaultReturn> {
    Id: number;
    Name: string;
    Secrets: OneVaultSecret[];
    People: VaultUser[];
    IsPublic: boolean;

    constructor() {
        this.Secrets = [];
        this.People = [];
    }

    FillByBackModel(newData: IOneVaultReturn): void {
        this.Id = newData.id;
        this.Name = newData.name;
    }
}