import { IEndVoteInfoReturn } from "../../BackModel/PlaningPoker/EndVoteInfoReturn";
import { IStoryMappingReturn } from "../../BackModel/PlaningPoker/RoomWasSavedUpdateReturn";
import { IStoryReturn } from "../../BackModel/PlaningPoker/StoryReturn";
import { RoomStatus, Story, UserInRoom } from "../../Models/PlaningPoker/RoomInfo";
import { AppAction } from "../Actions";

export const SetNotActualStoriesActionName: string = 'SetNotActualStoriesAction';
export function SetNotActualStoriesActionCreator(data: Story[]): AppAction<Story[]> {
    return { type: SetNotActualStoriesActionName, payload: data };
};


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

export const SetRoomNameActionName: string = 'SetRoomNameAction';
export function SetRoomNameActionCreator(data: string): AppAction<string> {
    return { type: SetRoomNameActionName, payload: data };
};

export const SetRoomPasswordActionName: string = 'SetRoomPasswordAction';
export function SetRoomPasswordActionCreator(data: string): AppAction<string> {
    return { type: SetRoomPasswordActionName, payload: data };
};

export const SetRoomUserIdActionName: string = 'SetRoomUserIdAction';
export function SetRoomUserIdActionCreator(data: string): AppAction<string> {
    return { type: SetRoomUserIdActionName, payload: data };
};

export const SetRoomUsersActionName: string = 'SetRoomUsersAction';
export function SetRoomUsersActionCreator(data: UserInRoom[]): AppAction<UserInRoom[]> {
    return { type: SetRoomUsersActionName, payload: data };
};

export const SetTotalNotActualStoriesCountActionName: string = 'SetTotalNotActualStoriesCountAction';
export function SetTotalNotActualStoriesCountActionCreator(data: number): AppAction<number> {
    return { type: SetTotalNotActualStoriesCountActionName, payload: data };
};

export const SetVoteInfoActionName: string = 'SetVoteInfoAction';
export function SetVoteInfoActionCreator(data: IEndVoteInfoReturn): AppAction<IEndVoteInfoReturn> {
    return { type: SetVoteInfoActionName, payload: data };
};

export const SetCurrentStoryIdActionName: string = 'SetCurrentStoryIdAction';
export function SetCurrentStoryIdActionCreator(data: string): AppAction<string> {
    return { type: SetCurrentStoryIdActionName, payload: data };
};

export const SetStoriesActionName: string = 'SetStoriesAction';
export function SetStoriesActionCreator(data: Story[]): AppAction<Story[]> {
    return { type: SetStoriesActionName, payload: data };
};

export const SetRoomStatusActionName: string = 'SetRoomStatusAction';
export function SetRoomStatusActionCreator(data: RoomStatus): AppAction<RoomStatus> {
    return { type: SetRoomStatusActionName, payload: data };
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

export interface VoteChangedPayload {
    UserId: string;
    Vote: string;
}
export const VoteChangedActionName: string = 'VoteChangedAction';
export function VoteChangedActionCreator(data: VoteChangedPayload): AppAction<VoteChangedPayload> {
    return { type: VoteChangedActionName, payload: data };
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

export const SetSelectedCardActionName: string = 'SetSelectedCardAction';
export function SetSelectedCardActionCreator(data: string): AppAction<string> {
    return { type: SetSelectedCardActionName, payload: data };
};


export const ClearVoteActionName: string = 'ClearVoteAction';
export function ClearVoteActionCreator(): AppAction<null> {
    return { type: ClearVoteActionName, payload: null };
};

export const AddNewStoryActionName: string = 'AddNewStoryAction';
export function AddNewStoryActionCreator(data: Story): AppAction<Story> {
    return { type: AddNewStoryActionName, payload: data };
};


export const StoryChangeActionName: string = 'StoryChangeAction';
export function StoryChangeActionCreator(data: Story): AppAction<Story> {
    return { type: StoryChangeActionName, payload: data };
};



export const DeleteStoryActionName: string = 'DeleteStoryAction';
export function DeleteStoryActionCreator(data: string): AppAction<string> {
    return { type: DeleteStoryActionName, payload: data };
};

export interface MoveStoryToCompletePayload {
    OldId: string;
    Story: Story;
}
export const MoveStoryToCompleteActionName: string = 'MoveStoryToCompleteAction';
export function MoveStoryToCompleteActionCreator(data: MoveStoryToCompletePayload): AppAction<MoveStoryToCompletePayload> {
    return { type: MoveStoryToCompleteActionName, payload: data };
};

export const UpdateStoriesIdActionName: string = 'UpdateStoriesIdAction';
export function UpdateStoriesIdActionCreator(data: IStoryMappingReturn[]): AppAction<IStoryMappingReturn[]> {
    return { type: UpdateStoriesIdActionName, payload: data };
};

export const SetInitialRoomDieTimeActionName: string = 'SetInitialRoomDieTimeAction';
export function SetInitialRoomDieTimeActionCreator(data: Date | null): AppAction<Date | null> {
    return { type: SetInitialRoomDieTimeActionName, payload: data };
};