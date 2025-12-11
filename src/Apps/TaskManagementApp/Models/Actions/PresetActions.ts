import { AppAction } from "../../../../Models/Actions/Actions";
import { Preset } from "../Entity/State/Preset";

export const LoadPresetsActionName: string = 'LoadPresetsAction';
export function LoadPresetsActionCreator(data: Preset[]): AppAction<Preset[]> {
    return { type: LoadPresetsActionName, payload: data };
};

export const DeletePresetActionName: string = 'DeletePresetAction';
export function DeletePresetActionCreator(data: number): AppAction<number> {
    return { type: DeletePresetActionName, payload: data };
};

export const CreatePresetActionName: string = 'CreatePresetAction';
export function CreatePresetActionCreator(data: Preset): AppAction<Preset> {
    return { type: CreatePresetActionName, payload: data };
};

export const UpdatePresetActionName: string = 'UpdatePresetAction';
export function UpdatePresetActionCreator(data: Preset): AppAction<Preset> {
    return { type: UpdatePresetActionName, payload: data };
};