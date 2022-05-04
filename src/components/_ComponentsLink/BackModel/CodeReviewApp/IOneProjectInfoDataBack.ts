import { IProjectTaskDataBack } from "./IProjectTaskDataBack";
import { IProjectUserDataBack } from "./IProjectUserDataBack";

export interface IOneProjectInfoDataBack {

    Users: IProjectUserDataBack[];
    Tasks: IProjectTaskDataBack[];
}