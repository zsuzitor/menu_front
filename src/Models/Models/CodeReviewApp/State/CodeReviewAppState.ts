import { IOneProjectInListDataBack } from "../../../BackModel/CodeReviewApp/IOneProjectInListDataBack";
import { IProjectUserDataBack } from "../../../BackModel/CodeReviewApp/IProjectUserDataBack";
import { OneTask } from "./OneTask";
import { TasksFilter } from "./TasksFilter";


export class CodeReviewAppState {
    CurrentProjectId: number;
    ProjectsList: IOneProjectInListDataBack[];
    CurrentProjectUsers: IProjectUserDataBack[];
    CurrentProjectTasks: OneTask[];
    CurrentProjectTasksAllCount: number;
    CurrentProjectTasksFilters: TasksFilter;


    constructor() {
        this.CurrentProjectId = -1;
        this.ProjectsList = [];
        this.CurrentProjectUsers = [];
        this.CurrentProjectTasks = [];
        this.CurrentProjectTasksAllCount = 0;
        this.CurrentProjectTasksFilters = new TasksFilter();
    }
}