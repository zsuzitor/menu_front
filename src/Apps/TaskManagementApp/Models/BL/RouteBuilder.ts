import { TaskManagementAppRoute, TaskManagementLabelsRoute, TaskManagementPresetsRoute, TaskManagementProjectRoute, TaskManagementSprintRoute, TaskManagementSprintsRoute, TaskManagementStatusesRoute, TaskManagementTaskRoute, TaskManagementTaskUsersRoute, TaskManagementTempoRoute, TaskManagementTimeLogRoute, TaskManagementUserRoute, TaskManagementUsersRoute } from "../Consts";

export default class RouteBuilder {
    //можно сделать полноценный билдер через withApproute.withProject но как будто смысла особо нет
    AppUrl(): string {
        return `/${TaskManagementAppRoute}/`;
    }
    ProjectUrl(projectId: number): string {
        return `/${TaskManagementAppRoute}/${TaskManagementProjectRoute}${projectId}`;
    }

    TaskUrl(projectId: number, taskId: number): string {
        ///task-management/proj-' + props.CurrentProjectId + '/task-' + props.Task.Id
        return `/${TaskManagementAppRoute}/${TaskManagementProjectRoute}${projectId}/${TaskManagementTaskRoute}${taskId}`;
    }

    TimeLogUserUrl(projectId: number, userId: number): string {
        // "/task-management/proj-" + props.ProjectId + "/user-" + x.Id + "/time-log"
        return `/${TaskManagementAppRoute}/${TaskManagementProjectRoute}${projectId}/${TaskManagementUserRoute}${userId}/${TaskManagementTimeLogRoute}`;
    }

    TimeLogUrl(projectId: number): string {
        // '/task-management/proj-' + props.CurrentProjectId + '/time-log'
        return `/${TaskManagementAppRoute}/${TaskManagementProjectRoute}${projectId}/${TaskManagementTimeLogRoute}`;
    }

    SprintsUrl(projectId: number): string {
        ///task-management/proj-' + props.CurrentProjectId + '/task-' + props.Task.Id
        return `/${TaskManagementAppRoute}/${TaskManagementProjectRoute}${projectId}/${TaskManagementSprintsRoute}`;
    }
    LabelsUrl(projectId: number): string {
        ///task-management/proj-' + props.CurrentProjectId + '/task-' + props.Task.Id
        return `/${TaskManagementAppRoute}/${TaskManagementProjectRoute}${projectId}/${TaskManagementLabelsRoute}`;
    }

    PresetsUrl(projectId: number): string {
        ///task-management/proj-' + props.CurrentProjectId + '/task-' + props.Task.Id
        return `/${TaskManagementAppRoute}/${TaskManagementProjectRoute}${projectId}/${TaskManagementPresetsRoute}`;
    }

    ProjectsUsersUrl(projectId: number): string {
        ///task-management/proj-' + props.CurrentProjectId + '/task-' + props.Task.Id
        return `/${TaskManagementAppRoute}/${TaskManagementProjectRoute}${projectId}/${TaskManagementUsersRoute}`;
    }

    StatusesUrl(projectId: number): string {
        ///task-management/proj-' + props.CurrentProjectId + '/task-' + props.Task.Id
        return `/${TaskManagementAppRoute}/${TaskManagementProjectRoute}${projectId}/${TaskManagementStatusesRoute}`;
    }
    TaskUsersUrl(projectId: number): string {
        ///task-management/proj-' + props.CurrentProjectId + '/task-' + props.Task.Id
        return `/${TaskManagementAppRoute}/${TaskManagementProjectRoute}${projectId}/${TaskManagementTaskUsersRoute}`;
    }

    SprintUrl(projectId: number, sprintId: number): string {
        ///"/task-management/proj-" + props.ProjectId + '/sprint-' + x.Id
        return `/${TaskManagementAppRoute}/${TaskManagementProjectRoute}${projectId}/${TaskManagementSprintRoute}${sprintId}`;
    }

    TempoUrl(projectId: number): string {
        ///task-management/proj-' + props.CurrentProjectId + '/task-' + props.Task.Id
        return `/${TaskManagementAppRoute}/${TaskManagementProjectRoute}${projectId}/${TaskManagementTempoRoute}`;
    }

}

