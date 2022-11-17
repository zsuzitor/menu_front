
import { EndVoteInfo } from "../../Models/PlaningPoker/EndVoteInfo";
import { RoomStatus } from "../../Models/PlaningPoker/State/RoomInfo";
import { RoomShortInfo } from "../../Models/PlaningPoker/State/RoomShortInfo";
import { AppAction } from "../Actions";


export const SetRoomNameActionName: string = 'SetRoomNameAction';
export function SetRoomNameActionCreator(data: string): AppAction<string> {
    return { type: SetRoomNameActionName, payload: data };
};

export const SetRoomPasswordActionName: string = 'SetRoomPasswordAction';
export function SetRoomPasswordActionCreator(data: string): AppAction<string> {
    return { type: SetRoomPasswordActionName, payload: data };
};

export const SetVoteInfoActionName: string = 'SetVoteInfoAction';
export function SetVoteInfoActionCreator(data: EndVoteInfo): AppAction<EndVoteInfo> {
    return { type: SetVoteInfoActionName, payload: data };
};

export const SetRoomStatusActionName: string = 'SetRoomStatusAction';
export function SetRoomStatusActionCreator(data: RoomStatus): AppAction<RoomStatus> {
    return { type: SetRoomStatusActionName, payload: data };
};

export interface VoteChangedPayload {
    UserId: string;
    Vote: string;
}
export const VoteChangedActionName: string = 'VoteChangedAction';
export function VoteChangedActionCreator(data: VoteChangedPayload): AppAction<VoteChangedPayload> {
    return { type: VoteChangedActionName, payload: data };
};


export const SetSelectedCardActionName: string = 'SetSelectedCardAction';
export function SetSelectedCardActionCreator(data: string): AppAction<string> {
    return { type: SetSelectedCardActionName, payload: data };
};

export const ClearVoteActionName: string = 'ClearVoteAction';
export function ClearVoteActionCreator(): AppAction<null> {
    return { type: ClearVoteActionName, payload: null };
};

export const SetInitialRoomDieTimeActionName: string = 'SetInitialRoomDieTimeAction';
export function SetInitialRoomDieTimeActionCreator(data: Date | null): AppAction<Date | null> {
    return { type: SetInitialRoomDieTimeActionName, payload: data };
};

export const SetEditRoomActionName: string = 'SetEditRoomAction';
export function SetEditRoomActionCreator(data: boolean): AppAction<boolean> {
    return { type: SetEditRoomActionName, payload: data };
};

export const SetRoomCardsActionName: string = 'SetRoomCardsAction';
export function SetRoomCardsActionCreator(data: string[]): AppAction<string[]> {
    return { type: SetRoomCardsActionName, payload: data };
};

export const SetRoomsListActionName: string = 'SetRoomsListAction';
export function SetRoomsListActionCreator(data: RoomShortInfo[]): AppAction<RoomShortInfo[]> {
    return { type: SetRoomsListActionName, payload: data };
};

export const SetRoomImageActionName: string = 'SetRoomImageAction';
export function SetRoomImageActionCreator(data: string): AppAction<string> {
    return { type: SetRoomImageActionName, payload: data };
};







