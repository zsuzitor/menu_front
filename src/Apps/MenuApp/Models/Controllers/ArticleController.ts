import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { IOneCardFullDataBack } from "../BackModels/OneCardFullDataBack";
import { IOneCardFullDataEdit } from "../Entity/IOneCardFullDataEdit";
import { BoolWithError, OnlyError } from "../../../../Models/Controllers/BO/ControllersOutput";
import { IOneCardInListDataBack } from "../BackModels/OneCardInListDataBack";
import { IOneCardInListData } from "../Entity/OneCardInListData";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";


export type ListOfCardOnReturn = (error: MainErrorObjectBack, data: IOneCardInListDataBack[]) => void;
export type DetailOnReturn = (error: MainErrorObjectBack, data: IOneCardFullDataBack) => void;
export type EditOnReturn = (error: MainErrorObjectBack, data: IOneCardFullDataBack) => void;


export interface IArticleController {
    GetAllShortForUser: (onSuccess: ListOfCardOnReturn) => void;//(success: OnlyError) => void;
    GetAllForUser: (onSuccess: OnlyError) => void;
    Detail: (model: IdInput, onSuccess: DetailOnReturn) => void;
    Follow: (model: IdInput, onSuccess: BoolWithError) => void;
    Create: (model: IOneCardInListData, onSuccess: EditOnReturn) => void;
    Edit: (model: IOneCardFullDataEdit, onSuccess: EditOnReturn) => void;

}

export class IdInput {
    Id: number;
}


export class ArticleController implements IArticleController {


    GetAllShortForUser(onSuccess: ListOfCardOnReturn) {
        G_AjaxHelper.GoAjaxRequest({
            Data: {},
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    onSuccess(resp, null);

                }
                else {
                    let dataBack = xhr as IOneCardInListDataBack[];
                    onSuccess(null, dataBack);

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/article/get-all-short-for-user',

        });
    }

    GetAllForUser(nSuccess: OnlyError) {
        alert('not implemented');
    }


    Detail(model: IdInput, onSuccess: DetailOnReturn) {
        let data = {
            "id": model.Id,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    onSuccess(resp, null);
                }
                else {
                    let dataBack = xhr as IOneCardFullDataBack;

                    if (dataBack.id && dataBack.id > 0) {
                        onSuccess(null, dataBack);
                    }
                    else {
                        //ошибка
                    }

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/article/detail',
        });
    }



    Follow(model: IdInput, onSuccess: BoolWithError) {
        let data = {
            "id": model.Id,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    onSuccess(resp, null);
                }
                else {
                    let boolRes = xhr as BoolResultBack;
                    if (boolRes.result === true || boolRes.result === false) {
                        onSuccess(null, boolRes);
                    }


                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/article/follow',
        });
    }


    Create(model: IOneCardInListData, success: EditOnReturn) {
        let data = {
            "title": model.Title,
            "body": model.Body,
            // "main_image_new":newElement.Image,
        };

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    success(resp, null);

                }
                else {
                    let resBack = xhr as IOneCardFullDataBack;
                    if (Number.isInteger(resBack.id) && resBack.id > 0) {
                        success(null, resBack);
                        // callBack(resBack);
                    }
                    else {
                        //что то не то вернулось
                    }
                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/article/create',

        });
    }


    Edit(model: IOneCardFullDataEdit, success: EditOnReturn) {
        let data = new FormData();
        data.append('id', model.Id + '');
        data.append('title', model.Title);
        data.append('body', model.Body);
        data.append('delete_main_image', JSON.stringify(model.NeedDeleteMainImage));
        if (model.MainImageSave) {
            data.append('main_image_new', model.MainImageSave);
        }

        if (model.AdditionalImagesSave) {
            model.AdditionalImagesSave.forEach((addImage, index) => {
                data.append('additional_images', addImage);//' + index + '
            });
        }


        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    success(resp, null);
                }
                else {
                    let res = xhr as IOneCardFullDataBack;
                    if (res.id && res.id > 0) {
                        success(null, res);
                        // callBack(res);
                    }
                    else {
                        //какая то ошибка
                    }
                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/article/edit',

        }, true);
    }
}