import * as React from "react";


export interface IWordActionsState {
    ShowMoreActions: boolean;

}

export interface IWordActionsProps {
    ChangeAlwaysShowWordImage: () => void;
    ChangeAlwaysShowWordAnswer: () => void;
    ChangeShowCurrentWordImage: () => void;
    ChangeShowCurrentWordAnswer: () => void; 
    SearchStrChanged: (e: any) => void;
    SearchedString:string;
}


export class WordActions extends React.Component<IWordActionsProps, IWordActionsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            ShowMoreActions: false,
        };

        this.ShowMoreAction = this.ShowMoreAction.bind(this);

    }

    ShowMoreAction() {
        let newState = { ...this.state };
        newState.ShowMoreActions = !newState.ShowMoreActions;
        this.setState(newState);

    }

    render() {
        let buttons: JSX.Element;

        buttons = <div>

            <button className="btn btn-dark btn-sm">изменить видимость</button>
            <button className="btn btn-primary btn-sm" onClick={this.props.ChangeShowCurrentWordAnswer}>показать текст</button>
            <button className="btn btn-primary btn-sm" onClick={this.props.ChangeShowCurrentWordImage}>показать картинку</button>
            <input onChange={this.props.SearchStrChanged} type="text" placeholder="поиск..." value={this.props.SearchedString} />
        </div>

        if (this.state.ShowMoreActions) {
            buttons = <div>
                {buttons}
                <hr></hr>
                {/* общее */}
                <button className="btn btn-secondary btn-sm">Показать новый шаблон</button>
                <button className="btn btn-secondary btn-sm">Показать спрятанные</button>
                <button className="btn btn-secondary btn-sm">Загрузить файл</button>
                <button className="btn btn-secondary btn-sm">Скачать файл</button>
                <button className="btn btn-secondary btn-sm">перемешать</button>
                {/* для карточки */}
                <button className="btn btn-secondary btn-sm">редактировать</button>
                {/* либо */}
                <button className="btn btn-success btn-sm">сохранить изменения</button>
                <button className="btn btn-danger btn-sm">отменить изменения</button>

                <button className="btn btn-danger btn-sm">Удалить</button>
                <label>Всегда отображать ответ на слово</label><input onClick={this.props.ChangeAlwaysShowWordAnswer} type="checkbox"></input>
                <label>Всегда отображать изображение</label><input onClick={this.props.ChangeAlwaysShowWordImage} type="checkbox"></input>
            </div>
        }
        else {

        }

        return <div className="words-cards-list-actions">
            <button className="btn btn-info btn-sm" onClick={this.ShowMoreAction}>больше действий</button>
            {buttons}
        </div>

    }
}
