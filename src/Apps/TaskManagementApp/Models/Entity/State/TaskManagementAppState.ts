import { OneProjectInList } from "./OneProjectInList";
import { ProjectUser } from "./ProjectUser";
import { OneTask } from "./OneTask";
import { TasksFilter } from "./TasksFilter";
import { WorkTaskStatus } from "./WorkTaskStatus";
import { ProjectTimes } from "./ProjectTimes";


export class TaskManagementAppState {
    ProjectsList: OneProjectInList[];
    ProjectsLoaded: boolean;

    CurrentProjectId: number;//проект на странице которого находимся, в рамках которого работаем
    CurrentProjectUsers: ProjectUser[];
    CurrentProjectStatuses: WorkTaskStatus[];
    CurrentProjectTimes: ProjectTimes;
    CurrentProjectTasks: OneTask[];
    CurrentProjectTasksAllCount: number;
    CurrentProjectTasksFilters: TasksFilter;

    CurrentUserId: number;//на страницах относящехся к пользователю
    PersonTimes: ProjectTimes;


    CurrentTaskId: number;//на страницах относящихся к задаче
    //это не таже ссылка что в CurrentProjectTasks[]
    CurrentTask: OneTask;


    constructor() {
        this.CurrentProjectId = -1;
        this.CurrentTaskId = -1;
        this.CurrentUserId = -1;
        this.ProjectsList = [];
        this.CurrentProjectUsers = [];
        this.CurrentProjectTasks = [];
        this.CurrentProjectTasksAllCount = 0;
        this.CurrentProjectTasksFilters = new TasksFilter();
        this.CurrentProjectStatuses = [];
        this.CurrentTask = null;
        this.ProjectsLoaded = false;
        this.CurrentProjectTimes = new ProjectTimes();
        this.PersonTimes = new ProjectTimes();
    }
}