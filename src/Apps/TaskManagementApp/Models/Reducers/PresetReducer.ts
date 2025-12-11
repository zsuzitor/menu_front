import { cloneDeep } from "lodash";
import { AppAction } from "../../../../Models/Actions/Actions";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { TaskLabel } from "../Entity/State/TaskLabel";
import { Helper } from "../../../../Models/BL/Helper";
import { CreatePresetActionName, DeletePresetActionName, LoadPresetsActionName, UpdatePresetActionName } from "../Actions/PresetActions";
import { Preset } from "../Entity/State/Preset";


export function TaskManagementPresetReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {


        case LoadPresetsActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as Preset[];
                newState.TaskManagementApp.CurrentProjectPresets = data;

                return newState;
            }
        case DeletePresetActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as number;
                newState.TaskManagementApp.CurrentProjectPresets = newState.TaskManagementApp.CurrentProjectPresets.filter(x => x.Id != data);

                return newState;
            }
        case CreatePresetActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as Preset;
                newState.TaskManagementApp.CurrentProjectPresets = [...newState.TaskManagementApp.CurrentProjectPresets, data];

                return newState;
            }
        case UpdatePresetActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as Preset;
                let preset = newState.TaskManagementApp.CurrentProjectPresets.find(x => x.Id == data.Id);
                preset.CreatorId = data.CreatorId;
                preset.ExecutorId = data.ExecutorId;
                preset.LabelId = data.LabelId;
                preset.Name = data.Name;
                preset.SprintId = data.SprintId;
                preset.StatusId = data.StatusId;

                return newState;
            }

        default:
            return state;
    }
    return state;
}