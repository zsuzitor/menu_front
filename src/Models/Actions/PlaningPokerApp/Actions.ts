import { AppAction } from "../Actions";



export const ClearPokerStateActionName: string = 'ClearPokerStateAction';
export function ClearPokerStateActionCreator(): AppAction<null> {
    return { type: ClearPokerStateActionName, payload: null };
};
