import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { Preset } from "../../Models/Entity/State/Preset";


interface IPresetsOwnProps {
}


interface IPresetsStateToProps {
    Presets: Preset[];

}

interface IPresetsDispatchToProps {
    SetFilterTaskCreator: (id: number) => void;
    CreatePreset: (projectId: number, name: string) => void;
    UpdatePreset: (preset: Preset) => void;
    DeletePreset: (id: number) => void;
}

export interface IPresetsProps extends IPresetsStateToProps, IPresetsOwnProps, IPresetsDispatchToProps {
}


const mapStateToProps = (state: AppState, ownProps: IPresetsOwnProps) => {
    let res = {} as IPresetsStateToProps;
    res.Presets = state.TaskManagementApp.CurrentProjectPresets;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IPresetsOwnProps) => {
    let res = {} as IPresetsDispatchToProps;

    // res.SetFilterTaskCreator = (id: number) => {
    //     dispatch(SetFilterTaskCreatorActionCreator(id));
    // };
    res.CreatePreset = (projectId: number, name: string) => {
        dispatch(window.G_TaskManagementTaskController.LoadTasksRedux(filter));
    };
    res.UpdatePreset = (preset: Preset) => {
        dispatch(window.G_TaskManagementTaskController.LoadTasksRedux(filter));
    };
    res.DeletePreset = (id: number) => {
        dispatch(window.G_TaskManagementTaskController.LoadTasksRedux(filter));
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);