import { IProjectTaskDataBack } from "./IProjectTaskDataBack";


export interface ILoadWorkTasksResultDataBack {
    Tasks: IProjectTaskDataBack[];
    TasksCount: number;
}