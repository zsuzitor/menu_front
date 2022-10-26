import { UserInRoom } from "../../Models/PlaningPoker/RoomInfo";
import { AppAction } from "../Actions";


export interface IEnteredInRoomActionPayload {
    RoomUserId: string;
    LoginnedInMainApp: boolean;
}
export const EnteredInRoomActionName: string = 'EnteredInRoomAction';
export function EnteredInRoomActionCreator(data: IEnteredInRoomActionPayload): AppAction<IEnteredInRoomActionPayload> {
    return { type: EnteredInRoomActionName, payload: data };
};


export const SetUserConnectionIdActionName: string = 'SetUserConnectionIdAction';
export function SetUserConnectionIdActionCreator(data: string): AppAction<string> {
    return { type: SetUserConnectionIdActionName, payload: data };
};



export const SetUserNameActionName: string = 'SetUserNameAction';
export function SetUserNameActionCreator(data: string): AppAction<string> {
    return { type: SetUserNameActionName, payload: data };
};


export const SetRoomUserIdActionName: string = 'SetRoomUserIdAction';
export function SetRoomUserIdActionCreator(data: string): AppAction<string> {
    return { type: SetRoomUserIdActionName, payload: data };
};


export const SetRoomUsersActionName: string = 'SetRoomUsersAction';
export function SetRoomUsersActionCreator(data: UserInRoom[]): AppAction<UserInRoom[]> {
    return { type: SetRoomUsersActionName, payload: data };
};


export interface ChangeUserNameInRoomPayload {
    UserId: string;
    UserName: string;
}
export const ChangeUserNameInRoomActionName: string = 'ChangeUserNameInRoomAction';
export function ChangeUserNameInRoomActionCreator(data: ChangeUserNameInRoomPayload): AppAction<ChangeUserNameInRoomPayload> {
    return { type: ChangeUserNameInRoomActionName, payload: data };
};


export const AddUserToRoomActionName: string = 'AddUserToRoomAction';
export function AddUserToRoomActionCreator(data: UserInRoom): AppAction<UserInRoom> {
    return { type: AddUserToRoomActionName, payload: data };
};




export const RemoveUserActionName: string = 'RemoveUserAction';
export function RemoveUserActionCreator(data: string[]): AppAction<string[]> {
    return { type: RemoveUserActionName, payload: data };
};


export interface UserRoleChangedPayload {
    UserId: string;
    ChangeType: number;
    Role: string;
}
export const UserRoleChangedActionName: string = 'UserRoleChangedAction';
export function UserRoleChangedActionCreator(data: UserRoleChangedPayload): AppAction<UserRoleChangedPayload> {
    return { type: UserRoleChangedActionName, payload: data };
};

