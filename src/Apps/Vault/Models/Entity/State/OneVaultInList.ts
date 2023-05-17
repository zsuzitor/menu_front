import { MappedWithBack } from "../../../../../Models/BL/Interfaces/MappedWithBack";
import { IOneVaultListReturn } from "../../BackModels/IOneVaultListReturn";


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