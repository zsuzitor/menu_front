import { CreateCardEdit } from "../../Components/ForceNew/OneCard";
import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { IOneWordCardBack } from "../BackModels/OneWordCardBack";
import { IEditCardState } from "../Entity/IEditCardState";
import { BoolWithError } from "../../../../Models/Controllers/BO/ControllersOutput";
import { ControllerHelper } from "../../../../Models/Controllers/ControllerHelper";



export interface IWordsCardsController {
    GetAllForUser: (onSuccess: WordsCardsListOnReturn) => void;
    Create: (model: IEditCardState, onSuccess: WordCardOnReturn) => void;
    CreateList: (model: CreateCardEdit[], listForCards: string, onSuccess: WordsCardsListOnReturn) => void;
    Delete: (cardId: number, onSuccess: WordCardOnReturn) => void;
    Update: (model: IEditCardState, onSuccess: WordCardOnReturn) => void;
    Hide: (cardId: number, onSuccess: BoolWithError) => void;
    CreateFromFile: () => void;
    DownloadAllWordsFile: () => void;
}


export type WordsCardsListOnReturn = (error: MainErrorObjectBack, data: IOneWordCardBack[]) => void;
export type WordCardOnReturn = (error: MainErrorObjectBack, data: IOneWordCardBack) => void;

export class WordsCardsController implements IWordsCardsController {

    GetAllForUser(onSuccess: WordsCardsListOnReturn) {
        G_AjaxHelper.GoAjaxRequest({
            Data: {},
            Type: ControllerHelper.GetHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    onSuccess(resp, null);
                }
                else {
                    // console.log(xhr);
                    let dataBack = xhr as IOneWordCardBack[];
                    onSuccess(null, dataBack);

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordscards/get-all-for-user',

        }, true);
    }

    Create(model: IEditCardState, onSuccess: WordCardOnReturn) {
        let data = new FormData();
        data.append('word', model.Word);
        data.append('word_answer', model.WordAnswer);
        data.append('description', model.Description);

        if (model.MainImageSave) {
            data.append('main_image_new', model.MainImageSave);
        }

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    onSuccess(resp, null);
                }
                else {
                    let res = xhr as IOneWordCardBack;
                    if (res.id && res.id > 0) {
                        onSuccess(null, res);
                    }
                    else {
                        //что то не то вернулось
                    }
                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordscards/create',

        }, true);
    }


    CreateList(model: CreateCardEdit[], listForCards: string, success: WordsCardsListOnReturn) {
        let data = new FormData();
        for (let i = 0; i < model.length; ++i) {
            data.append('newData[' + i + '].word', model[i].Word);
            data.append('newData[' + i + '].word_answer', model[i].WordAnswer);
            data.append('newData[' + i + '].description', model[i].Description);
            data.append('newData[' + i + '].list_id', listForCards);
            // data.append('newData.word_answer', this.state.Cards[i].WordAnswer);
            // data.append('newData.description', this.state.Cards[i].Description);
        }

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    success(resp, null);
                }
                else {
                    let res = xhr as IOneWordCardBack[];
                    if (res.length > 0) {
                        success(null, res);
                    }
                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordscards/create-list',

        }, true);
    }

    Delete(cardId: number, success: WordCardOnReturn) {
        let data = new FormData();
        data.append('id', cardId + '');
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.DeleteHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    success(resp, null);
                }
                else {
                    //TODO тут может быть ошибка, что мы не дождались ответа серва а выбранная картинка уже изменилась
                    let res = xhr as IOneWordCardBack;
                    if (res?.id && res.id > 0) {
                        success(null, res);

                    }

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordscards/delete',

        }, true);
    }


    Update(model: IEditCardState, onSuccess: WordCardOnReturn) {
        let data = new FormData();
        data.append('id', model.Id + '');
        data.append('word', model.Word);
        data.append('word_answer', model.WordAnswer);
        data.append('description', model.Description);
        data.append('delete_main_image', JSON.stringify(model.NeedDeleteMainImage));

        if (model.MainImageSave) {
            data.append('main_image_new', model.MainImageSave);
        }

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    onSuccess(resp, null);
                }
                else {
                    let res = xhr as IOneWordCardBack;
                    if (res.id && res.id > 0) {

                        onSuccess(null, res);
                    }
                    else {
                        //что то не то вернулось
                    }
                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordscards/update',

        }, true);
    }


    Hide(cardId: number, onSuccess: BoolWithError) {
        let data = new FormData();
        data.append('id', cardId + '');
        let refThis = this;
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: ControllerHelper.PatchHttp,
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
            Url: G_PathToServer + 'api/wordscards/hide',

        }, true);
    }

    CreateFromFile(){
        alert('not implemented');
    }

    DownloadAllWordsFile(){
        window.open("/api/wordscards/download-all-words-file");
    }

}


