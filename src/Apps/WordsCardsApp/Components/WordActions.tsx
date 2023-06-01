import * as React from "react";
import { Link } from "react-router-dom";
import { OneWordList } from "../Models/Entity/OneWordList";


export interface IWordActionsState {
    ShowMoreActions: boolean;

}

export interface IWordActionsProps {
    ChangeAlwaysShowWordImage: () => void;
    ChangeAlwaysShowWordAnswer: () => void;
    ChangeAlwaysShowWord: () => void;
    ChangeShowCurrentWordImage: () => void;
    ChangeShowCurrentWordAnswer: () => void;
    ChangeShowCurrentWord: () => void;
    SearchStrChanged: (e: any) => void;
    SearchedString: string;
    StartEditCard: () => void;
    SaveCard: () => void;
    CancelEditCard: () => void;
    AddNewTemplate: () => void;
    ShowNextCard: () => void;
    ShowHiddenCardsOnClick: () => void;
    ChangeVisibilityCurrentCard: () => void;
    ShuffleCardsOnClick: () => void;
    WriteModeOnClick: () => void;
    DeleteCurrentCard: () => void;
    EditTemplateViewNow: boolean;//сейчас отображается шаблон на редактирование
    WordLists: OneWordList[];//список всех списков(сетов)
    SelectedList:number;//выбранный список(сет)
    ListOnChange: (e: any) => void;//изменение списка слов(выбор нового сета)

}


export class WordActions extends React.Component<IWordActionsProps, IWordActionsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            ShowMoreActions: false,
        };

        this.ShowMoreAction = this.ShowMoreAction.bind(this);
        this.DosnloadFile = this.DosnloadFile.bind(this);

    }

    ShowMoreAction() {
        let newState = { ...this.state };
        newState.ShowMoreActions = !newState.ShowMoreActions;
        this.setState(newState);

    }

    DosnloadFile() {
        // G_AjaxHelper.GoAjaxRequest({
        //     Data: {},
        //     Type: ControllerHelper.GetHttp,
        //     FuncSuccess: (xhr, status, jqXHR) => {

        //     },
        //     FuncError: (xhr, status, error) => { },
        //     Url: G_PathToServer + 'api/wordscards/download-all-words-file',

        // }, true);
        

        G_WordsCardsController.DownloadAllWordsFile();
        // window.open("/api/wordscards/download-all-words-file");
    }


    render() {
        // let buttons: JSX.Element;

        let buttons = <div>
            <button className="btn btn-primary btn-sm" onClick={this.props.ShowNextCard}>следующее слово</button>
            <button className="btn btn-primary btn-sm" onClick={this.props.ChangeShowCurrentWordImage}>показать картинку</button>
            <button className="btn btn-primary btn-sm" onClick={this.props.ChangeShowCurrentWord}>показать слово</button>
            <button className="btn btn-primary btn-sm" onClick={this.props.ChangeShowCurrentWordAnswer}>показать ответ</button>

            <button className="btn btn-dark btn-sm" onClick={this.props.ChangeVisibilityCurrentCard}>изменить видимость</button>
            <input className="form-control" onChange={this.props.SearchStrChanged} type="text" placeholder="поиск..." value={this.props.SearchedString} />
        </div>

        let editsButtons = <div></div>
        if (this.props.EditTemplateViewNow) {
            editsButtons = <div>
                <button className="btn btn-success btn-sm" onClick={this.props.SaveCard}>сохранить изменения</button>
                <button className="btn btn-danger btn-sm" onClick={this.props.CancelEditCard}>отменить изменения</button>
            </div>
        }
        else {
            editsButtons = <div>
                <button className="btn btn-secondary btn-sm" onClick={this.props.StartEditCard}>редактировать</button>
            </div>
        }

        let listSelect = <div></div>
        if (this.props.WordLists) {
            listSelect = <div>
                <select value={this.props.SelectedList} onChange={this.props.ListOnChange}>
                    <option key={-1} value={-1}>Без списка</option>
                    {this.props.WordLists.map(x => <option key={x.Id} value={x.Id}>{x.Title}</option>)}
                </select>
            </div>
        }

        // let listsActions = <div></div>

        if (this.state.ShowMoreActions) {
            buttons = <div>
                {buttons}
                <hr></hr>
                {/* общее */}
                <button className="btn btn-secondary btn-sm" onClick={this.props.AddNewTemplate}>Показать новый шаблон</button>

                <button className="btn btn-secondary btn-sm">Загрузить файл</button>
                <button className="btn btn-secondary btn-sm" onClick={this.DosnloadFile}>Скачать файл</button>
                <button className="btn btn-secondary btn-sm" onClick={this.props.ShuffleCardsOnClick}>перемешать</button>
                {/* для карточки */}
                {editsButtons}
                {/* либо */}


                <button className="btn btn-danger btn-sm" onClick={this.props.DeleteCurrentCard}>Удалить</button>
                <label>Всегда отображать слово</label><input onClick={this.props.ChangeAlwaysShowWord} type="checkbox"></input>
                <label>Всегда отображать ответ на слово</label><input onClick={this.props.ChangeAlwaysShowWordAnswer} type="checkbox"></input>
                <label>Всегда отображать изображение</label><input onClick={this.props.ChangeAlwaysShowWordImage} type="checkbox"></input>
                <label>Показать спрятанные</label><input type="checkbox" onClick={this.props.ShowHiddenCardsOnClick}></input>
                <label>Режим письма</label><input type="checkbox" onClick={this.props.WriteModeOnClick}></input>
                <hr />
                {listSelect}
                <hr />
                <Link to="/words-cards-app/force-add">перейти в режим ускоренного добавления</Link>
                <br />
                <Link to="/words-cards-app/word-list">работа с списками слов</Link>
            </div>


            // listsActions = <div>

            // </div>
        }
        else {

        }

        return <div className="words-cards-list-actions">
            {buttons}
            <button className="btn btn-info btn-sm" onClick={this.ShowMoreAction}>больше действий</button>
        </div>

    }
}
