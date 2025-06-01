import { MappedWithBack } from "../../../../../Models/BL/Interfaces/MappedWithBack";
import { IWorkTaskStatusDataBack } from "../../BackModels/IWorkTaskStatusDataBack";

export class WorkTaskStatus implements MappedWithBack<IWorkTaskStatusDataBack>{
    
    Id: number;
    Name: string;

    FillByBackModel(newData: IWorkTaskStatusDataBack): void {
        this.Id = newData.Id;
        this.Name = newData.Name;
    }
}