import { OneProjectInList } from "./OneProjectInList";
import { ProjectUser } from "./ProjectUser";
import { OneTask } from "./OneTask";
import { TasksFilter } from "./TasksFilter";
import { TaskReviewStatus } from "./TaskReviewStatus";


export class CodeReviewAppState {
    CurrentProjectId: number;
    ProjectsList: OneProjectInList[];
    CurrentProjectUsers: ProjectUser[];
    CurrentProjectStatuses: TaskReviewStatus[];
    CurrentProjectTasks: OneTask[];
    CurrentProjectTasksAllCount: number;
    CurrentProjectTasksFilters: TasksFilter;

    
    CurrentTaskId: number;
    CurrentTask: OneTask;


    constructor() {
        this.CurrentProjectId = -1;
        this.CurrentTaskId = -1;
        this.ProjectsList = [];
        this.CurrentProjectUsers = [];
        this.CurrentProjectTasks = [];
        this.CurrentProjectTasksAllCount = 0;
        this.CurrentProjectTasksFilters = new TasksFilter();
        this.CurrentProjectStatuses = [];
        this.CurrentTask = null;
    }
}