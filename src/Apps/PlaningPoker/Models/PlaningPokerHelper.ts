//TODO временно, хелперы под выпил

import { Story } from "./Entity/State/Story";
import { UserInRoom } from "./Entity/State/UserInRoom";



export class PlaningPokerHelper {
    GetUserIndexById(users: UserInRoom[], userId: string): number {
        if (!users || !userId) {
            return -1;
        }

        return users.findIndex(x => x.Id === userId);
    }

    GetUserById(users: UserInRoom[], userId: string): UserInRoom {
        let index = this.GetUserIndexById(users, userId);
        if (index < 0 || index >= users.length) {
            return null;
        }

        return users[index];
    }

    CurrentUserIsAdmin(users: UserInRoom[], userId: string): boolean {
        let user = this.GetUserById(users, userId);
        if (user && user.IsAdmin()) {
            return true;
        }

        return false;
    }



    CurrentUserCanVote(users: UserInRoom[], userId: string): boolean {
        let user = this.GetUserById(users, userId);
        if (user && user.CanVote()) {
            return true;
        }

        return false;
    }
}






export class TaskManagementLocalStorageHelper {
    static TaskManagementFilterPrefix: string = 'task_management_filter_';
    GetFilterCreatorId = (projectId: number): string => {
        return localStorage.getItem(TaskManagementLocalStorageHelper.TaskManagementFilterPrefix + projectId + '_creator_id');
    }
    SetFilterCreatorId = (projectId: number, value: string): void => {
        localStorage.setItem(TaskManagementLocalStorageHelper.TaskManagementFilterPrefix + projectId + '_creator_id', value);
    }
    GetFilterExecutorId = (projectId: number): string => {
        return localStorage.getItem(TaskManagementLocalStorageHelper.TaskManagementFilterPrefix + projectId + '_executor_id');
    }
    SetFilterExecutorId = (projectId: number, value: string): void => {
        localStorage.setItem(TaskManagementLocalStorageHelper.TaskManagementFilterPrefix + projectId + '_executor_id', value);
    }
    GetFilterStatus = (projectId: number): string => {
        return localStorage.getItem(TaskManagementLocalStorageHelper.TaskManagementFilterPrefix + projectId + '_status');
    }
    SetFilterStatus = (projectId: number, value: string): void => {
        localStorage.setItem(TaskManagementLocalStorageHelper.TaskManagementFilterPrefix + projectId + '_status', value);
    }
    GetFilterTaskname = (projectId: number): string => {
        return localStorage.getItem(TaskManagementLocalStorageHelper.TaskManagementFilterPrefix + projectId + '_taskname');
    }
    SetFilterTaskname = (projectId: number, value: string): void => {
        localStorage.setItem(TaskManagementLocalStorageHelper.TaskManagementFilterPrefix + projectId + '_taskname', value);
    }
    GetFilterPage = (projectId: number): string => {
        return localStorage.getItem(TaskManagementLocalStorageHelper.TaskManagementFilterPrefix + projectId + '_page');
    }
    SetFilterPage = (projectId: number, value: string): void => {
        localStorage.setItem(TaskManagementLocalStorageHelper.TaskManagementFilterPrefix + projectId + '_page', value);
    }
}