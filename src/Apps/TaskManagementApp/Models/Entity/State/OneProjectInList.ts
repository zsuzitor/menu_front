import { MappedWithBack } from "../../../../../Models/BL/Interfaces/MappedWithBack";
import { IOneProjectInListDataBack } from "../../BackModels/IOneProjectInListDataBack";


export class OneProjectInList implements MappedWithBack<IOneProjectInListDataBack>{
    Id: number;
    Name: string;


    FillByBackModel(newData: IOneProjectInListDataBack): OneProjectInList {
        this.Id = newData.Id;
        this.Name = newData.Name;
        return this;
    }

}