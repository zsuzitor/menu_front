import { IPresetDataBack } from "../../BackModels/IPresetDataBack";

export class Preset {
    Id: number;
    Name: string;
    ProjectId: number;
    CreatorId: number;
    ExecutorId?: number;
    StatusId: number;
    SprintId: number;
    LabelId: number[];

    constructor() {
        this.LabelId = [];
    }

    

    FillByIProjectTaskDataBack(data: IPresetDataBack): Preset {
        this.Id = data.Id;
        this.Name = data.Name;
        this.ProjectId = data.ProjectId;
        this.CreatorId = data.CreatorId;
        this.ExecutorId = data.ExecutorId;
        this.StatusId = data.StatusId;
        this.SprintId = data.SprintId;
        this.LabelId = data.LabelId;

        return this;
    }
}
