import { MappedWithBack } from "../../../../../Models/BL/Interfaces/MappedWithBack";
import { IOneVaultListReturn } from "../../BackModels/IOneVaultListReturn";


export class OneVaultInList implements MappedWithBack<IOneVaultListReturn> {
    Id: number;
    Name: string;
    IsPublic: boolean;

    constructor() {
    }

    FillByBackModel(newData: IOneVaultListReturn): void {
        this.Id = newData.id;
        this.Name = newData.name;
        this.IsPublic = newData.is_public;
    }
}