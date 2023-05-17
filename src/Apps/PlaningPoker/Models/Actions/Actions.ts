import { AppAction } from "../../../../Models/Actions/Actions";


//полностью закрывается приложение покера
export const ClearPokerStateActionName: string = 'ClearPokerStateAction';
export function ClearPokerStateActionCreator(): AppAction<null> {
    return { type: ClearPokerStateActionName, payload: null };
};

//только выход из комнаты
export const ClearRoomPokerStateActionName: string = 'ClearRoomPokerStateAction';
export function ClearRoomPokerStateActionCreator(): AppAction<null> {
    return { type: ClearRoomPokerStateActionName, payload: null };
};
