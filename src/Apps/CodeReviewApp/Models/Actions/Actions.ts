import { AppAction } from "../../../../Models/Actions/Actions";


export const ClearCodeReviewStateActionName: string = 'ClearCodeReviewStateAction';
export function ClearCodeReviewStateActionCreator(): AppAction<null> {
    return { type: ClearCodeReviewStateActionName, payload: null };
};