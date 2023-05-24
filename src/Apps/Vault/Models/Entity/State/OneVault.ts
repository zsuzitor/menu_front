import { MappedWithBack } from "../../../../../Models/BL/Interfaces/MappedWithBack";
import { IOneVaultReturn } from "../../BackModels/IOneVaultReturn";
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
        this.Secrets = newData.secrets.map(x => {
            let rs = new OneVaultSecret();
            rs.FillByBackModel(x);
            return rs;
        });
        // this.People = ;
        this.IsPublic = newData.is_public;
    }
}