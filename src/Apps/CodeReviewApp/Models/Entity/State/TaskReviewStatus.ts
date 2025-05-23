import { MappedWithBack } from "../../../../../Models/BL/Interfaces/MappedWithBack";
import { ITaskReviewStatusDataBack } from "../../BackModels/ITaskReviewStatusDataBack";

export class TaskReviewStatus implements MappedWithBack<ITaskReviewStatusDataBack>{
    
    Id: number;
    Name: string;

    FillByBackModel(newData: ITaskReviewStatusDataBack): void {
        this.Id = newData.Id;
        this.Name = newData.Name;
    }



}