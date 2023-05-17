import { OneProjectInList } from "./OneProjectInList";
import { ProjectUser } from "./ProjectUser";
import { OneTask } from "./OneTask";
import { TasksFilter } from "./TasksFilter";


export class CodeReviewAppState {
    CurrentProjectId: number;
    ProjectsList: OneProjectInList[];
    CurrentProjectUsers: ProjectUser[];
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