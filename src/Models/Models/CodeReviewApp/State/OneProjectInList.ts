import { IOneProjectInListDataBack } from "../../../BackModel/CodeReviewApp/IOneProjectInListDataBack";
import { MappedWithBack } from "../../../BL/Interfaces/MappedWithBack";


export class OneProjectInList implements MappedWithBack<IOneProjectInListDataBack>{
    Id: number;
    Name: string;


    FillByBackModel(newData: IOneProjectInListDataBack): void {
        this.Id = newData.Id;
        this.Name = newData.Name;
    }

}