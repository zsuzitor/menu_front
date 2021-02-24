import * as React from "react";
import { WordActions } from "./WordActions";
import { OneWordCard as OneWordCardModel } from "../../_ComponentsLink/Models/WordsCardsApp/OneWordCard";
import { IEditCardState } from "../../_ComponentsLink/Models/WordsCardsApp/IEditCardState";
import { OneWordList } from "../../_ComponentsLink/Models/WordsCardsApp/OneWordList";

export interface IOneWordCardStase {
    // EditNow: boolean;

    AlwaysShowWordAnswer: boolean;
    AlwaysShowWord: boolean;
    AlwaysShowWordImage: boolean;
    WriteMode: boolean;//режим письма, отрисовать новый инпут, он будет сравнивать введенное с word
    // WordGoodWrited: boolean;//в режиме write слово введено верно
    CurrentCardNewSelectedList: number;
}




export interface IOneWordCardProps {
    // EditNow: boolean;
    CurrentCard: OneWordCardModel;
    EditCurrentCard: IEditCardState;
    ShowCurrentWord: boolean;
    ShowCurrentWordAnswer: boolean;
    ShowCurrentWordImage: boolean;
    ChangeShowCurrentWordImage: () => void;
    ChangeShowCurrentWordAnswer: () => void;
    ChangeShowCurrentWord: () => void;
    SearchStrChanged: (e: any) => void;
    SearchedString: string;
    StartEditCard: () => void;
    SaveCard: () => void;
    CancelEditCard: () => void;
    AddNewTemplate: () => void;
    WordAnswerOnChange: (e: any) => void;
    WordOnChange: (e: any) => void;
    WordDescriptionOnChange: (e: any) => void;
    ShowNextCard: () => void;
    DeleteMainImageOnClick: () => void;
    ShowHiddenCardsOnClick: () => void;
    ChangeVisibilityCurrentCard: () => void;
    ShuffleCardsOnClick: () => void;
    EditTemplateViewNow: boolean;
    DeleteCurrentCard: () => void;
    WriteTestChanged: (e: any) => void;
    WriteTestString: string;
    WordLists: OneWordList[];//список всех списков(сетов)
    SelectedList: number;//выбранный список(сет)
    ListOnChange: (e: any) => void;//изменение списка слов(выбор нового сета)
    AddCardToList: (cardId: number, listId: number) => void;
    RemoveFromList: (cardId: number, listId: number) => void;
}


export class OneWordCard extends React.Component<IOneWordCardProps, IOneWordCardStase> {
    constructor(props: any) {
        super(props);

        this.state = {
            AlwaysShowWordAnswer: false,
            AlwaysShowWordImage: false,
            AlwaysShowWord: false,
            WriteMode: false,
            CurrentCardNewSelectedList: -1,
            // WordGoodWrited: false,
            // ShowCurrentWordAnswer: false,
            // ShowCurrentWordImage: false,
        };

        this.ChangeAlwaysShowWordAnswer = this.ChangeAlwaysShowWordAnswer.bind(this);
        this.ChangeAlwaysShowWordImage = this.ChangeAlwaysShowWordImage.bind(this);
        this.ChangeAlwaysShowWord = this.ChangeAlwaysShowWord.bind(this);
        this.RenderCardBody = this.RenderCardBody.bind(this);
        this.WriteModeOnClick = this.WriteModeOnClick.bind(this);
        this.NewAddListOnChange = this.NewAddListOnChange.bind(this);
        // this.WordInputCompare = this.WordInputCompare.bind(this);
        this.AddCardToList = this.AddCardToList.bind(this);
        this.RemoveFromList = this.RemoveFromList.bind(this);


    }



    ChangeAlwaysShowWordImage() {
        let newState = { ...this.state };
        newState.AlwaysShowWordImage = !newState.AlwaysShowWordImage;
        this.setState(newState);
    }

    ChangeAlwaysShowWordAnswer() {
        let newState = { ...this.state };
        newState.AlwaysShowWordAnswer = !newState.AlwaysShowWordAnswer;
        this.setState(newState);
    }

    ChangeAlwaysShowWord() {
        let newState = { ...this.state };
        newState.AlwaysShowWord = !newState.AlwaysShowWord;
        this.setState(newState);
    }

    WriteModeOnClick() {
        let newState = { ...this.state };
        newState.WriteMode = !newState.WriteMode;

        this.setState(newState);
    }


    NewAddListOnChange(e: any) {
        // console.log(e);
        let newState = { ...this.state };
        newState.CurrentCardNewSelectedList = +e.target.value;
        this.setState(newState);
    }

    AddCardToList() {
        this.props.AddCardToList(this.props.CurrentCard.Id, this.state.CurrentCardNewSelectedList);

    }

    RemoveFromList() {
        this.props.RemoveFromList(this.props.CurrentCard.Id, this.state.CurrentCardNewSelectedList);
    }


    RenderCardBody() {
        if (this.props.EditCurrentCard) {
            let editTitle = <p>Редактирование</p>
            if (this.props.EditCurrentCard.Id < 1) {
                editTitle = <p>Создание</p>
            }

            return <div>
                {editTitle}
                <label>Слово</label><input className="form-control" onChange={this.props.WordOnChange} type="text" value={this.props.EditCurrentCard.Word} />
                <br />
                <label>Ответ</label><input className="form-control" onChange={this.props.WordAnswerOnChange} type="text" value={this.props.EditCurrentCard.WordAnswer} />
                <br />
                <label>Описание</label><input className="form-control" onChange={this.props.WordDescriptionOnChange} type="text" value={this.props.EditCurrentCard.Description} />
                <br />
                <input className="form-control" id="main_image_input" type="file"></input>
                <br />
                <label>удалить картинку</label>
                <input onClick={this.props.DeleteMainImageOnClick} type='checkbox'></input>

            </div>
        }

        if (!this.props.CurrentCard) {
            return <div></div>
        }

        let word: JSX.Element = <div>слово скрыто</div>;
        if (this.state.AlwaysShowWord || this.props.ShowCurrentWord) {
            word = <div>
                <p>Слово - {this.props.CurrentCard.Word}</p>
            </div>
        }


        let wordAnswer: JSX.Element = <div>ответ скрыт</div>;
        if (this.state.AlwaysShowWordAnswer || this.props.ShowCurrentWordAnswer) {
            wordAnswer = <div>
                <p>Слово ответ - {this.props.CurrentCard.WordAnswer}</p>
                <p>Слово описание - {this.props.CurrentCard.Description}</p>
            </div>
        }

        let imageRender: JSX.Element = <div></div>;
        if (this.props.CurrentCard.ImagePath) {
            imageRender = <div>изображение скрыто</div>;
            if (this.state.AlwaysShowWordImage || this.props.ShowCurrentWordImage) {

                imageRender = <div className="one-word-card-image-line">
                    <div className="one-word-card-image">
                        <img className="persent-100-width-height" src={this.props.CurrentCard.ImagePath} alt="" />
                    </div>
                </div>
            }
        }

        let hiddenWord = <div></div>
        if (this.props.CurrentCard.Hided) {
            hiddenWord = <p className="word-card-hidden-status">Слово скрыто</p>
        }

        let writeWord = <div></div>
        let writeWordClass = "alert-danger";
        if (this.WordInputCompare(this.props.WriteTestString)) {
            writeWordClass = "alert-success";
        }

        if (this.state.WriteMode) {
            writeWord = <div className="">
                <input className={"" + writeWordClass} onChange={this.props.WriteTestChanged}
                    placeholder="введите слово" type="text" value={this.props.WriteTestString}></input>
            </div>
        }

        let wordListActions = <div></div>

        if (this.props.CurrentCard.Lists) {//TODO тут бы еще какую то кнопку мб, что бы не рисовать всегда

            let listSelect = <div>
                <select value={this.state.CurrentCardNewSelectedList} onChange={this.NewAddListOnChange}>
                    <option key={-1} value={-1}>Без списка</option>
                    {this.props.WordLists.map(x => <option key={x.Id} value={x.Id}>{x.Title}</option>)}
                </select>
                <button className="btn btn-secondary btn-sm" onClick={this.AddCardToList}>Добавить новый</button>
            </div>

            wordListActions = <div>
                <p>Списки:</p>
                {this.props.CurrentCard.Lists.map(x => {
                    let lst = this.props.WordLists.find(x1 => x1.Id == x.IdList)
                    if (lst) {
                        return <div key={lst.Id}>
                            <p>{lst.Title}</p>
                            <button onClick={this.RemoveFromList}>Удалить из списка</button>
                        </div>
                    }

                })}
                {listSelect}

            </div>

        }

        return <div>
            {/* <p>id - {this.props.CurrentCard.Id}</p> */}
            {/* <hr/> */}
            {word}
            <hr />
            {wordAnswer}
            <hr />
            {imageRender}
            {hiddenWord}
            {writeWord}
            {wordListActions}
        </div>
    }

    render() {
        return <div className="word-card-card-main col-md-8">
            <div className="word-card-card-inner">
                {this.RenderCardBody()}


            </div>
            <div className="padding-10-top"></div>
            <WordActions ChangeAlwaysShowWordImage={this.ChangeAlwaysShowWordImage}
                ChangeAlwaysShowWordAnswer={this.ChangeAlwaysShowWordAnswer}
                ChangeAlwaysShowWord={this.ChangeAlwaysShowWord}
                WriteModeOnClick={this.WriteModeOnClick}
                ChangeShowCurrentWordImage={this.props.ChangeShowCurrentWordImage}
                ChangeShowCurrentWordAnswer={this.props.ChangeShowCurrentWordAnswer}
                ChangeShowCurrentWord={this.props.ChangeShowCurrentWord}
                SearchStrChanged={this.props.SearchStrChanged}
                SearchedString={this.props.SearchedString}
                StartEditCard={this.props.StartEditCard}
                CancelEditCard={this.props.CancelEditCard}
                SaveCard={this.props.SaveCard}
                AddNewTemplate={this.props.AddNewTemplate}
                ShowNextCard={this.props.ShowNextCard}
                ShowHiddenCardsOnClick={this.props.ShowHiddenCardsOnClick}
                ChangeVisibilityCurrentCard={this.props.ChangeVisibilityCurrentCard}
                ShuffleCardsOnClick={this.props.ShuffleCardsOnClick}
                DeleteCurrentCard={this.props.DeleteCurrentCard}
                EditTemplateViewNow={this.props.EditTemplateViewNow}
                WordLists={this.props.WordLists}
                SelectedList={this.props.SelectedList}
                ListOnChange={this.props.ListOnChange}
            />
        </div>

    }



    private WordInputCompare(str: string) {
        let wordForCompare = this.props.CurrentCard.Word;
        if (this.state.AlwaysShowWord) {
            wordForCompare = this.props.CurrentCard.WordAnswer;
        }

        if (str.toUpperCase() == wordForCompare.toUpperCase()) {
            return true;
        }
        else {
            return false;
        }

    }
}
