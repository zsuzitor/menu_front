import { MappedWithBack } from "../../../../Models/BL/Interfaces/MappedWithBack";
import { ILoadReviewTasksResultDataBack } from "../BackModels/ILoadReviewTasksResultDataBack";
import { IProjectTaskDataBack } from "../BackModels/IProjectTaskDataBack";



export class ProjectTaskData implements MappedWithBack<IProjectTaskDataBack>{
    //todo надо посмотреть с OneTask мб одно и тоже
    Id: number;
    Name: string;
    CreatorId: number;
    ReviewerId?: number;
    StatusId: number;
    Link: string;

    FillByBackModel(newData: IProjectTaskDataBack): void {
        this.Id = newData.Id;
        this.Name = newData.Name;
        this.CreatorId = newData.CreatorId;
        this.ReviewerId = newData.ReviewerId;
        this.StatusId = newData.StatusId;
        this.Link = newData.Link;
    }

}


export class LoadReviewTasksResult implements MappedWithBack<ILoadReviewTasksResultDataBack>{
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