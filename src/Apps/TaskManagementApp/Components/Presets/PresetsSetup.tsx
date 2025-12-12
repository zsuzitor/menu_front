import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { Preset } from "../../Models/Entity/State/Preset";


interface IPresetsOwnProps {
}


interface IPresetsStateToProps {
    Presets: Preset[];
    ProjectId: number;

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
    res.ProjectId = state.TaskManagementApp.CurrentProjectId;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IPresetsOwnProps) => {
    let res = {} as IPresetsDispatchToProps;

    // res.SetFilterTaskCreator = (id: number) => {
    //     dispatch(SetFilterTaskCreatorActionCreator(id));
    // };
    res.CreatePreset = (projectId: number, name: string) => {
        window.G_TaskManagementPresetController.CreateRedux(name, projectId, dispatch);
    };
    res.UpdatePreset = (preset: Preset) => {
        window.G_TaskManagementPresetController.UpdateRedux(preset, dispatch);
    };
    res.DeletePreset = (id: number) => {
        window.G_TaskManagementPresetController.DeleteRedux(id, dispatch);
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);