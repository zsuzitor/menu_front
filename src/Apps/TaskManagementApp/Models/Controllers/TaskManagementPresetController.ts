import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { TaskManagementApiPresetUrl, TaskManagementPreloader } from "../Consts";
import { IProjectSprintDataBack } from "../BackModels/IProjectSprintDataBack";
import { ServerResult } from "../../../../Models/AjaxLogic";
import { IPresetDataBack } from "../BackModels/IPresetDataBack";
import { CreatePresetActionCreator, DeletePresetActionCreator, LoadPresetsActionCreator, UpdatePresetActionCreator } from "../Actions/PresetActions";
import { Preset } from "../Entity/State/Preset";



export type GetSprints = (error: MainErrorObjectBack, data: IProjectSprintDataBack[]) => void;



export interface ITaskManagementPresetController {
    // GetForProjectRedux: (projectId: number) => void;
    GetForProjectRedux: (projectId: number, dispatch: any) => Promise<any>;
    DeleteRedux: (id: number, dispatch: any) => Promise<any>;
    CreateRedux: (name: string, projectId: number, dispatch: any) => Promise<any>;
    UpdateRedux: (preset: Preset, dispatch: any) => Promise<any>;



}



export class TaskManagementPresetController implements ITaskManagementPresetController {

    GetForProjectRedux = async (projectId: number, dispatch: any): Promise<any> => {
        this.preloader(true);
        let backResult = await this.GetForProject(projectId);
        this.preloader(false);
        if (backResult) {
            // dt.projectId = projectId;
            let dt = backResult.map(x => new Preset().FillByIProjectTaskDataBack(x));
            dispatch(LoadPresetsActionCreator(dt));
        }
    }

    GetForProject = async (projectId: number): Promise<IPresetDataBack[]> => {
        let data = {
            "projectId": projectId,
        };
        let res = await G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiPresetUrl}/get-all`

        }) as ServerResult<IPresetDataBack[]>;
        return res.Data;
    };


    DeleteRedux = async (id: number, dispatch: any): Promise<any> => {
        this.preloader(true);
        let backResult = await this.Delete(id);
        this.preloader(false);
        if (backResult?.Result) {
            // dt.projectId = projectId;
            dispatch(DeletePresetActionCreator(id));
        }
    }

    Delete = async (id: number): Promise<BoolResultBackNew> => {
        let data = {
            "presetId": id,
        };
        let res = await G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiPresetUrl}/delete`

        }) as ServerResult<BoolResultBackNew>;
        return res.Data;
    };


    CreateRedux = async (name: string, projectId: number, dispatch: any): Promise<any> => {
        this.preloader(true);
        let backResult = await this.Create(name, projectId);
        this.preloader(false);
        if (backResult?.Id) {
            // dt.projectId = projectId;
            let dt = new Preset().FillByIProjectTaskDataBack(backResult);
            dispatch(CreatePresetActionCreator(dt));
        }
    }

    Create = async (name: string, projectId: number): Promise<IPresetDataBack> => {
        let data = {
            "name": name,
            "projectId": projectId
        };
        let res = await G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiPresetUrl}/create`,
            ContentType: 'body'

        }) as ServerResult<IPresetDataBack>;
        return res.Data;
    };


    UpdateRedux = async (preset: Preset, dispatch: any): Promise<any> => {
        this.preloader(true);
        let backResult = await this.Update(preset);
        this.preloader(false);
        if (backResult?.Result) {
            // dt.projectId = projectId;
            // let dt = new Preset().FillByIProjectTaskDataBack(backResult);
            dispatch(UpdatePresetActionCreator(preset));
        }
    }

    Update = async (preset: Preset): Promise<BoolResultBackNew> => {
        let data = {
            "id": preset.Id,
            "name": preset.Name,
            "CreatorId": preset.CreatorId,
            "ExecutorId": preset.ExecutorId,
            "StatusId": preset.StatusId,
            "SprintId": preset.SprintId,
            "Labels": preset.LabelId
        };
        let res = await G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiPresetUrl}/update`,
            ContentType: 'body'

        }) as ServerResult<BoolResultBackNew>;
        return res.Data;
    };




    //todo вынести в какой то общий кусок
    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

    }

    preloader(show: boolean) {
        window.TaskManagementCounter = new ControllerHelper()
            .Preloader(show, TaskManagementPreloader, window.TaskManagementCounter);
    }
}