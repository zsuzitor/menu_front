import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { BoolWithError } from "../../../../Models/Controllers/BO/ControllersOutput";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";
import { OneWordListEdit } from "../../Components/WordsList/WordsCardsListWork";
import { IWordCardWordList } from "../BackModels/OneWordCardBack";
import { IWordListBack } from "../BackModels/WordListBack";



export interface IWordsListController {
    GetAllForUser: (onSuccess: WordListsOnReturn) => void;
    Create: (title: string, onSuccess: WordListCreateOnReturn) => void;
    RemoveFromList: (cardId: number, listId: number, onSuccess: BoolWithError) => void;
    AddToList: (cardId: number, listId: number, onSuccess: WordListRelationOnReturn) => void;
    Delete: (id: number, onSuccess: WordListCreateOnReturn) => void;
    Update: (model: OneWordListEdit, onSuccess: WordListCreateOnReturn) => void;

}


export type WordListsOnReturn = (error: MainErrorObjectBack, data: IWordListBack[]) => void;
export type WordListCreateOnReturn = (error: MainErrorObjectBack, data: IWordListBack) => void;
export type WordListRelationOnReturn = (error: MainErrorObjectBack, data: IWordCardWordList) => void;



export class WordsListController implements IWordsListController {


    GetAllForUser(onSuccess: WordListsOnReturn) {
        let refThis = this;
        G_AjaxHelper.GoAjaxRequest({
            Data: {},
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    onSuccess(resp, null);
                }
                else {
                    let dataBack = xhr as IWordListBack[];
                    if (dataBack.length > 0) {
                        onSuccess(null, dataBack);
                    }

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordslist/get-all-for-user',

        }, true);
    }


    Create(title: string, onSuccess: WordListCreateOnReturn) {
        let data = new FormData();
        data.append('title', title);

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    onSuccess(resp, null);
                }
                else {
                    let dataBack = xhr as IWordListBack;
                    if (dataBack.id < 1) {
                        return;
                    }
                    onSuccess(null, dataBack);

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordslist/create',

        }, true);
    }


    RemoveFromList(cardId: number, listId: number, onSuccess: BoolWithError) {
        let data = new FormData();
        data.append('card_id', cardId + '');
        data.append('list_id', listId + '');
        let refThis = this;
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    onSuccess(resp, null);
                }
                else {
                    //TODO тут может быть ошибка, что мы не дождались ответа серва а выбранная картинка уже изменилась

                    let res = xhr as BoolResultBack;
                    if (res.result === true || res.result === false) {
                        onSuccess(null, res);
                    }


                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordslist/remove-from-list',

        }, true);

    }


    AddToList(cardId: number, listId: number, onSuccess: WordListRelationOnReturn) {
        let data = new FormData();
        data.append('card_id', cardId + '');
        data.append('list_id', listId + '');
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    onSuccess(resp, null);
                }
                else {
                    //TODO тут может быть ошибка, что мы не дождались ответа серва а выбранная картинка уже изменилась
                    let res = xhr as IWordCardWordList;
                    if (res.id_list) {
                        onSuccess(null, res);
                    }

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordslist/add-to-list',

        }, true);
    }


    Delete(id: number, onSuccess: WordListCreateOnReturn) {
        let data = new FormData();
        data.append('id', id + '');
        let refThis = this;

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    onSuccess(resp, null);
                }
                else {
                    let dataBack = xhr as IWordListBack;
                    if (dataBack.id < 1) {
                        return;
                    }
                    onSuccess(null, dataBack);

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordslist/delete',

        }, true);
    }

    Update(model: OneWordListEdit, onSuccess: WordListCreateOnReturn) {
        let data = new FormData();
        data.append('title', model.Title);
        data.append('id', model.Id + '');

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    onSuccess(resp, null);
                }
                else {
                    let dataBack = xhr as IWordListBack;
                    if (dataBack.id < 1) {
                        return;
                    }
                    onSuccess(null, dataBack);

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordslist/update',

        }, true);
    }

}