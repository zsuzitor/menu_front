import { IProjectTaskRelationDataBack } from "../../BackModels/IProjectTaskRelationDataBack";

export enum TaskRelationType { SubTask = 1, Link = 2,
     MainTask = 3 //на бэке такого нет, чисто для формы редактирования
     };

export class TaskRelation {
    Id: number;
    SubWorkTaskId: number;
    MainWorkTaskId: number;
    // SubTask = 1, Link = 2,
    RelationType: TaskRelationType;

    FillByDataBack(data: IProjectTaskRelationDataBack): TaskRelation {
        this.Id = data.Id;
        this.SubWorkTaskId = data.SubWorkTaskId;
        this.MainWorkTaskId = data.MainWorkTaskId;
        this.RelationType = data.RelationType;
        return this;
    }
}