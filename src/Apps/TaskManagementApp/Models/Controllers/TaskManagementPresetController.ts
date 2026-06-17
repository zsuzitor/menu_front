import { BoolResultBackNew } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { TaskManagementApiPresetUrl, TaskManagementPreloader } from "../Consts";
import { IProjectSprintDataBack } from "../BackModels/IProjectSprintDataBack";
import { ServerResult } from "../../../../Models/AjaxLogic";
import { IPresetDataBack } from "../BackModels/IPresetDataBack";
import { CreatePresetActionCreator, DeletePresetActionCreator, LoadPresetsActionCreator, UpdatePresetActionCreator } from "../Actions/PresetActions";
import { Preset } from "../Entity/State/Preset";




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
        const backResult = await this.GetForProjectAsync(projectId);
        this.preloader(false);

        if (backResult.Error) {
            return;
        }

        if (backResult.Data) {
            let dt = backResult.Data.map(x => new Preset().FillByIProjectTaskDataBack(x));
            dispatch(LoadPresetsActionCreator(dt));
        }
    }

    GetForProjectAsync = async (projectId: number): Promise<ServerResult<IPresetDataBack[]>> => {
        let data = {
            "projectId": projectId,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IPresetDataBack[]>({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiPresetUrl}/get-all`
        });

        return backResult;
    }


    DeleteRedux = async (id: number, dispatch: any): Promise<any> => {
        this.preloader(true);
        const backResult = await this.DeleteAsync(id);
        this.preloader(false);

        if (backResult.Error) {
            return;
        }

        if (backResult.Data?.Result) {
            dispatch(DeletePresetActionCreator(id));
        }
    }

    DeleteAsync = async (id: number): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "presetId": id,
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiPresetUrl}/delete`
        });

        return backResult;
    }


    CreateRedux = async (name: string, projectId: number, dispatch: any): Promise<any> => {
        this.preloader(true);
        const backResult = await this.CreateAsync(name, projectId);
        this.preloader(false);

        if (backResult.Error) {
            return;
        }

        if (backResult.Data?.Id) {
            let dt = new Preset().FillByIProjectTaskDataBack(backResult.Data);
            dispatch(CreatePresetActionCreator(dt));
        }
    }

    CreateAsync = async (name: string, projectId: number): Promise<ServerResult<IPresetDataBack>> => {
        let data = {
            "name": name,
            "projectId": projectId
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<IPresetDataBack>({
            Data: data,
            Type: ControllerHelper.PutHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiPresetUrl}/create`,
            ContentType: 'body'
        });

        return backResult;
    }


    UpdateRedux = async (preset: Preset, dispatch: any): Promise<any> => {
        this.preloader(true);
        const backResult = await this.UpdateAsync(preset);
        this.preloader(false);

        if (backResult.Error) {
            return;
        }

        if (backResult.Data?.Result) {
            dispatch(UpdatePresetActionCreator(preset));
        }
    }

    UpdateAsync = async (preset: Preset): Promise<ServerResult<BoolResultBackNew>> => {
        let data = {
            "id": preset.Id,
            "name": preset.Name,
            "CreatorId": preset.CreatorId,
            "ExecutorId": preset.ExecutorId,
            "StatusId": preset.StatusId,
            "SprintId": preset.SprintId,
            "Labels": preset.LabelId
        };
        const backResult = await G_AjaxHelper.GoAjaxRequest<BoolResultBackNew>({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
            },
            FuncError: (xhr, status, error) => { },
            Url: `${G_PathToServer}${TaskManagementApiPresetUrl}/update`,
            ContentType: 'body'
        });

        return backResult;
    }




    //todo вынести в какой то общий кусок
    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return new ControllerHelper().MapWithResult(onSuccess);

    }

    preloader(show: boolean) {
        window.TaskManagementCounter = new ControllerHelper()
            .Preloader(show, TaskManagementPreloader, window.TaskManagementCounter);
    }
}