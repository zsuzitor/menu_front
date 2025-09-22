import { IProjectSprintDataBack } from "./IProjectSprintDataBack";
import { IProjectTaskDataBack } from "./IProjectTaskDataBack";
import { IProjectUserDataBack } from "./IProjectUserDataBack";
import { IWorkTaskStatusDataBack } from "./IWorkTaskStatusDataBack";

export interface IOneProjectInfoDataBack {

    Users: IProjectUserDataBack[];
    Tasks: IProjectTaskDataBack[];
    Statuses: IWorkTaskStatusDataBack[];
    Sprints: IProjectSprintDataBack[];
    Labels: IProjectSprintDataBack[];
}