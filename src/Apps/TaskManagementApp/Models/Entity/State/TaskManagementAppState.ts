import { OneProjectInList } from "./OneProjectInList";
import { ProjectUser } from "./ProjectUser";
import { OneTask } from "./OneTask";
import { TasksFilter } from "./TasksFilter";
import { WorkTaskStatus } from "./WorkTaskStatus";


export class TaskManagementAppState {
    CurrentProjectId: number;

    ProjectsList: OneProjectInList[];
    ProjectsLoaded: boolean;

    CurrentProjectUsers: ProjectUser[];
    CurrentProjectStatuses: WorkTaskStatus[];
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
        this.ProjectsLoaded = false;
    }
}