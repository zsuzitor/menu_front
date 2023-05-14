import { MappedWithBack } from "../../../BL/Interfaces/MappedWithBack";
import { IOneVaultListReturn } from "../../../BackModel/Vault/IOneVaultListReturn";


export class OneVaultInList implements MappedWithBack<IOneVaultListReturn> {
    Id: number;
    Name: string;

    constructor() {
    }

    FillByBackModel(newData: IOneVaultListReturn): void {
        this.Id = newData.id;
        this.Name = newData.name;
    }
}