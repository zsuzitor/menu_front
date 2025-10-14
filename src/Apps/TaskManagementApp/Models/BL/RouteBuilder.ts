import { TaskManagementAppRute, TaskManagementProjectRoute, TaskManagementSprintRoute, TaskManagementSprintsRoute, TaskManagementTaskRoute, TaskManagementTempoRoute, TaskManagementTimeLogRoute, TaskManagementUserRoute } from "../Consts";

export default class RouteBuilder {
    //можно сделать полноценный билдер через withApproute.withProject но как будто смысла особо нет
    AppUrl(): string {
        return `/${TaskManagementAppRute}/`;
    }
    ProjectUrl(projectId: number): string {
        return `/${TaskManagementAppRute}/${TaskManagementProjectRoute}${projectId}`;
    }

    TaskUrl(projectId: number, taskId: number): string {
        ///task-management/proj-' + props.CurrentProjectId + '/task-' + props.Task.Id
        return `/${TaskManagementAppRute}/${TaskManagementProjectRoute}${projectId}/${TaskManagementTaskRoute}${taskId}`;
    }

    TimeLogUserUrl(projectId: number, userId: number): string {
        // "/task-management/proj-" + props.ProjectId + "/user-" + x.Id + "/time-log"
        return `/${TaskManagementAppRute}/${TaskManagementProjectRoute}${projectId}/${TaskManagementUserRoute}${userId}/${TaskManagementTimeLogRoute}`;
    }

    TimeLogUrl(projectId: number): string {
        // '/task-management/proj-' + props.CurrentProjectId + '/time-log'
        return `/${TaskManagementAppRute}/${TaskManagementProjectRoute}${projectId}/${TaskManagementTimeLogRoute}`;
    }

    SprintsUrl(projectId: number): string {
        ///task-management/proj-' + props.CurrentProjectId + '/task-' + props.Task.Id
        return `/${TaskManagementAppRute}/${TaskManagementProjectRoute}${projectId}/${TaskManagementSprintsRoute}`;
    }

    SprintUrl(projectId: number, sprintId: number): string {
        ///"/task-management/proj-" + props.ProjectId + '/sprint-' + x.Id
        return `/${TaskManagementAppRute}/${TaskManagementProjectRoute}${projectId}/${TaskManagementSprintRoute}${sprintId}`;
    }

    TempoUrl(projectId: number): string {
        ///task-management/proj-' + props.CurrentProjectId + '/task-' + props.Task.Id
        return `/${TaskManagementAppRute}/${TaskManagementProjectRoute}${projectId}/${TaskManagementTempoRoute}`;
    }

}

