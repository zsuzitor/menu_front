import { ITaskLabelDataBack } from "../../BackModels/ITaskLabelDataBack";

export class TaskLabel {
    Id: number;
    ProjectId: number;
    Name: string;

    FillByIProjectLabelDataBack(data: ITaskLabelDataBack): TaskLabel {
        this.Id = data.Id;
        this.Name = data.Name;
        this.ProjectId = data.ProjectId;
        return this;
    }
}