import { MappedWithBack } from "../../../../Models/BL/Interfaces/MappedWithBack";
import { ILoadWorkTasksResultDataBack } from "../BackModels/ILoadWorkTasksResultDataBack";
import { IProjectTaskDataBack } from "../BackModels/IProjectTaskDataBack";
import { OneWorkTaskComment } from "./OneTaskWorkComment";



export class ProjectTaskData implements MappedWithBack<IProjectTaskDataBack> {
    //todo надо посмотреть с OneTask мб одно и тоже
    Id: number;
    Name: string;
    CreatorId: number;
    ExecutorId?: number;
    StatusId: number;
    Description: string;
    Comments: OneWorkTaskComment[];
    CreateDate: string;
    LastUpdateDate: string;
    SprintId: number[];
    LabelId: number[];

    FillByBackModel(newData: IProjectTaskDataBack): ProjectTaskData {
        this.Id = newData.Id;
        this.Name = newData.Name;
        this.CreatorId = newData.CreatorId;
        this.ExecutorId = newData.ExecutorId;
        this.StatusId = newData.StatusId;
        this.LastUpdateDate = newData.LastUpdateDate;
        this.CreateDate = newData.CreateDate;

        this.Description = newData.Description;
        this.Comments = newData.Comments.map(x => new OneWorkTaskComment().FillByBackModel(x));
        this.SprintId = newData.SprintId;
        this.LabelId = newData.LabelsId;
        return this;
    }

}


export class LoadWorkTasksResult implements MappedWithBack<ILoadWorkTasksResultDataBack> {
    Tasks: ProjectTaskData[];
    TasksCount: number;

    FillByBackModel(newData: ILoadWorkTasksResultDataBack): void {
        this.TasksCount = newData.TasksCount;
        this.Tasks = newData.Tasks.map(x => {
            let y = new ProjectTaskData();
            y.FillByBackModel(x);
            return y;
        });

    }

}