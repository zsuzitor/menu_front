import { MappedWithBack } from "../../../../../Models/BL/Interfaces/MappedWithBack";
import { IVaultUserReturn } from "../../BackModels/IVaultUserReturn";


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