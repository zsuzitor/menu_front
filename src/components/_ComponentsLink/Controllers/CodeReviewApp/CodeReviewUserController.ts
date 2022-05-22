import { BoolResultBack } from "../../BackModel/BoolResultBack";
import { IProjectUserDataBack } from "../../BackModel/CodeReviewApp/IProjectUserDataBack";
import { MainErrorObjectBack } from "../../BackModel/ErrorBack";

export type AddNewUserToProject = (error: MainErrorObjectBack, data: IProjectUserDataBack) => void;

export type ChangeUser = (error: MainErrorObjectBack, data: BoolResultBack) => void;
export type DeleteUser = (error: MainErrorObjectBack, data: BoolResultBack) => void;


export interface ICodeReviewUserController {
    AddUserToProject: (newUserName: string, mainAppUserEmail: string, projectId: number, onSuccess: AddNewUserToProject) => void;
    ChangeProjectUser: (user: IProjectUserDataBack, onSuccess: ChangeUser) => void;
    DeleteProjectUser: (id: number, onSuccess: DeleteUser) => void;
}


export class CodeReviewUserController implements ICodeReviewUserController {

    DeleteProjectUser = (id: number, onSuccess: DeleteUser) => {
        let data = {
            "userId": id,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "DELETE",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/project/delete-user'

        });
    }


    AddUserToProject = (newUserName: string, mainAppUserEmail: string, projectId: number, onSuccess: AddNewUserToProject) => {
        let data = {
            "userName": newUserName,
            "projectId": projectId,
            "mainAppUserEmail": mainAppUserEmail,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/project/add-new-user'

        });
    };

    ChangeProjectUser = (user: IProjectUserDataBack, onSuccess: ChangeUser) => {
        let data = {
            "userId": user.Id,
            "name": user.Name,
            "email": user.Email,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PATCH",
            FuncSuccess: (xhr, status, jqXHR) => {
                this.mapWithResult(onSuccess)(xhr, status, jqXHR);

            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/codereview/project/change-user'

        });
    }

    mapWithResult<T>(onSuccess: (err: MainErrorObjectBack, data: T) => void) {
        return (xhr: any, status: any, jqXHR: any) => {
            let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
            if (resp.errors) {
                //TODO ошибка
                onSuccess(resp, null);
            }
            else {
                let dataBack = xhr as T;
                onSuccess(null, dataBack);

            }
        }
    }

}

