import { MappedWithBack } from "../../../BL/Interfaces/MappedWithBack";
import { IVaultUserReturn } from "../../../BackModel/Vault/IVaultUserReturn";
import { OneVault } from "./OneVault";


export class VaultUser  implements MappedWithBack<IVaultUserReturn> {
    Id: number;
    Email: string;

    constructor() {
    
    }

    FillByBackModel(newData: IVaultUserReturn): void {
        this.Id = newData.id;
        this.Email = newData.email;
    }
}