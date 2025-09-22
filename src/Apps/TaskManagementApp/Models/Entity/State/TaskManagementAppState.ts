import { OneProjectInList } from "./OneProjectInList";
import { ProjectUser } from "./ProjectUser";
import { OneTask } from "./OneTask";
import { TasksFilter } from "./TasksFilter";
import { WorkTaskStatus } from "./WorkTaskStatus";
import { ProjectTimes } from "./ProjectTimes";
import { ProjectSprint } from "./ProjectSprint";
import { SprintInfo } from "./SprintInfo";
import { TaskLabel } from "./TaskLabel";


export class TaskManagementAppState {
    ProjectsList: OneProjectInList[];
    ProjectsLoaded: boolean;

    //todo вынести это в 1 объект?
    CurrentProjectId: number;//проект на странице которого находимся, в рамках которого работаем
    CurrentProjectUsers: ProjectUser[];
    CurrentProjectStatuses: WorkTaskStatus[];
    CurrentProjectTimes: ProjectTimes;
    CurrentProjectTasks: OneTask[];
    CurrentProjectSprints: ProjectSprint[];
    CurrentProjectLabels: TaskLabel[];
    CurrentProjectTasksAllCount: number;
    CurrentProjectTasksFilters: TasksFilter;

    CurrentUserId: number;//на страницах относящехся к пользователю
    PersonTimes: ProjectTimes;

    TempoState: ProjectTimes;//страница списаний текущего пользака


    CurrentTaskId: number;//на страницах относящихся к задаче
    //это не таже ссылка что в CurrentProjectTasks[]
    CurrentTask: OneTask;

    CurrentSprint: SprintInfo;



    constructor() {
        this.CurrentProjectId = -1;
        this.CurrentTaskId = -1;
        this.CurrentUserId = -1;
        this.ProjectsList = [];
        this.CurrentProjectUsers = [];
        this.CurrentProjectTasks = [];
        this.CurrentProjectTasksAllCount = 0;
        this.CurrentProjectTasksFilters = new TasksFilter();
        this.CurrentProjectSprints = [];
        this.CurrentProjectStatuses = [];
        this.CurrentProjectLabels = [];
        this.CurrentTask = null;
        this.ProjectsLoaded = false;
        this.CurrentProjectTimes = new ProjectTimes();
        this.PersonTimes = new ProjectTimes();
        this.TempoState = new ProjectTimes();
    }
}