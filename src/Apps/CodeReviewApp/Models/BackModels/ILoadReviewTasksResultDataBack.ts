import { IProjectTaskDataBack } from "./IProjectTaskDataBack";


export interface ILoadReviewTasksResultDataBack {
    Tasks: IProjectTaskDataBack[];
    TasksCount: number;
}