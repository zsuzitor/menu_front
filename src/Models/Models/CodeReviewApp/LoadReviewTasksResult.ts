import { ILoadReviewTasksResultDataBack } from "../../BackModel/CodeReviewApp/ILoadReviewTasksResultDataBack";
import { IProjectTaskDataBack } from "../../BackModel/CodeReviewApp/IProjectTaskDataBack";
import { MappedWithBack } from "../../BL/Interfaces/MappedWithBack";



export class ProjectTaskData implements MappedWithBack<IProjectTaskDataBack>{
    //todo надо посмотреть с OneTask мб одно и тоже
    Id: number;
    Name: string;
    CreatorId: number;
    ReviewerId?: number;
    Status: number;
    Link: string;

    FillByBackModel(newData: IProjectTaskDataBack): void {
        this.Id = newData.Id;
        this.Name = newData.Name;
        this.CreatorId = newData.CreatorId;
        this.ReviewerId = newData.ReviewerId;
        this.Status = newData.Status;
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