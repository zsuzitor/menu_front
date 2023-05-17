import { IAuthState } from "../../Entity/AuthState";
import { AppAction } from "../Actions";



// export interface IEnteredInRoomActionPayload {
//     RoomUserId: string;
//     LoginnedInMainApp: boolean;
// }
export const SetAuthActionName: string = 'SetAuthAction';
export function SetAuthActionCreator(data: IAuthState): AppAction<IAuthState> {
    return { type: SetAuthActionName, payload: data };
};