import { IProjectTaskRelationDataBack } from "../../BackModels/IProjectTaskRelationDataBack";

export class TaskRelation {
    Id: number;
    SubWorkTaskId: number;
    MainWorkTaskId: number;
    // SubTask = 1, Link = 2,
    RelationType: number;

    FillByDataBack(data: IProjectTaskRelationDataBack): TaskRelation {
        this.Id = data.Id;
        this.SubWorkTaskId = data.SubWorkTaskId;
        this.MainWorkTaskId = data.MainWorkTaskId;
        this.RelationType = data.RelationType;
        return this;
    }
}