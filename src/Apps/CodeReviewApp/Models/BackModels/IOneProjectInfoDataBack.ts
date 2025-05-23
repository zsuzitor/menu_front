import { IProjectTaskDataBack } from "./IProjectTaskDataBack";
import { IProjectUserDataBack } from "./IProjectUserDataBack";
import { ITaskReviewStatusDataBack } from "./ITaskReviewStatusDataBack";

export interface IOneProjectInfoDataBack {

    Users: IProjectUserDataBack[];
    Tasks: IProjectTaskDataBack[];
    Statuses: ITaskReviewStatusDataBack[];
}