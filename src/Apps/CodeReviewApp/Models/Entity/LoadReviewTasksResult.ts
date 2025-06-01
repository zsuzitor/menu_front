import { MappedWithBack } from "../../../../Models/BL/Interfaces/MappedWithBack";
import { ILoadReviewTasksResultDataBack } from "../BackModels/ILoadReviewTasksResultDataBack";
import { IProjectTaskDataBack } from "../BackModels/IProjectTaskDataBack";
import { OneTaskReviewComment } from "./OneTaskReviewComment";



export class ProjectTaskData implements MappedWithBack<IProjectTaskDataBack> {
    //todo надо посмотреть с OneTask мб одно и тоже
    Id: number;
    Name: string;
    CreatorId: number;
    ExecutorId?: number;
    StatusId: number;
    Description: string;
    Comments: OneTaskReviewComment[];
    CreateDate: string;
    LastUpdateDate: string;

    FillByBackModel(newData: IProjectTaskDataBack): ProjectTaskData {
        this.Id = newData.Id;
        this.Name = newData.Name;
        this.CreatorId = newData.CreatorId;
        this.ExecutorId = newData.ExecutorId;
        this.StatusId = newData.StatusId;
        this.LastUpdateDate = newData.LastUpdateDate;
        this.CreateDate = newData.CreateDate;

        this.Description = newData.Description;
        this.Comments = newData.Comments.map(x => new OneTaskReviewComment().FillByBackModel(x));
        return this;
    }

}


export class LoadReviewTasksResult implements MappedWithBack<ILoadReviewTasksResultDataBack> {
    Tasks: ProjectTaskData[];
    TasksCount: number;

    FillByBackModel(newData: ILoadReviewTasksResultDataBack): void {
        this.TasksCount = newData.TasksCount;
        this.Tasks = newData.Tasks.map(x => {
            let y = new ProjectTaskData();
            y.FillByBackModel(x);
            return y;
        });

    }

}