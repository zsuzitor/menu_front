import { cloneDeep } from "lodash";
import { AppAction } from "../../../../Models/Actions/Actions";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { TaskLabel } from "../Entity/State/TaskLabel";
import { GetTaskLabelsActionName } from "../Actions/LabelActions";


export function TaskManagementLabelReducer(state: AppState = new AppState(), action: AppAction<any>): AppState {
    switch (action.type) {


        case GetTaskLabelsActionName:
            {
                let newState = cloneDeep(state);
                let data = action.payload as TaskLabel[];
                newState.TaskManagementApp.CurrentProjectLabels = data;

                return newState;
            }
            



        default:
            return state;
    }
    return state;
}