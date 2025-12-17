
import { IProjectTaskDataBack } from "../../BackModels/IProjectTaskDataBack";


export class OneTaskInList {
    Id: number;
    Name: string;
    CreatorId: number;
    ExecutorId?: number;
    StatusId: number;
    CreateDate: string;


    constructor() {
    }



    FillByIProjectTaskDataBack(data: IProjectTaskDataBack): OneTaskInList {
        this.Id = data.Id;
        this.Name = data.Name;
        this.CreatorId = data.CreatorId;
        this.ExecutorId = data.ExecutorId;
        this.StatusId = data.StatusId;
        this.CreateDate = data.CreateDate;

        return this;
    }
}
