import * as React from "react";
import { WordActions } from "./WordActions";
import { OneWordCard as OneWordCardModel } from "../../_ComponentsLink/Models/WordsCardsApp/OneWordCard";
import { IEditCardState } from "../../_ComponentsLink/Models/WordsCardsApp/IEditCardState";

export interface IOneWordCardStase {
    // EditNow: boolean;

    AlwaysShowWordAnswer: boolean;
    AlwaysShowWord: boolean;
    AlwaysShowWordImage: boolean;

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
}


export class OneWordCard extends React.Component<IOneWordCardProps, IOneWordCardStase> {
    constructor(props: any) {
        super(props);

        this.state = {
            AlwaysShowWordAnswer: false,
            AlwaysShowWordImage: false,
            AlwaysShowWord: false,
            // ShowCurrentWordAnswer: false,
            // ShowCurrentWordImage: false,
        };

        this.ChangeAlwaysShowWordAnswer = this.ChangeAlwaysShowWordAnswer.bind(this);
        this.ChangeAlwaysShowWordImage = this.ChangeAlwaysShowWordImage.bind(this);
        this.ChangeAlwaysShowWord = this.ChangeAlwaysShowWord.bind(this);
        this.RenderCardBody = this.RenderCardBody.bind(this);

    }


    // componentDidUpdate() {
    //     console.log('---------');
    //     if(this.state.ShowCurrentWordAnswer||this.state.ShowCurrentWordImage){
    //         let newState = { ...this.state };
    //         newState.ShowCurrentWordAnswer = false;
    //         newState.ShowCurrentWordImage = false;
    //         this.setState(newState);
    //     }

    // }

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

    RenderCardBody() {
        if (this.props.EditCurrentCard) {
            let editTitle = <p>Редактирование</p>
            if (this.props.EditCurrentCard.Id < 1) {
                editTitle = <p>Создание</p>
            }

            return <div>
                {editTitle}
                <label>Слово</label><input onChange={this.props.WordOnChange} type="text" value={this.props.EditCurrentCard.Word} />
                <br />
                <label>Ответ</label><input onChange={this.props.WordAnswerOnChange} type="text" value={this.props.EditCurrentCard.WordAnswer} />
                <br />
                <label>Описание</label><input onChange={this.props.WordDescriptionOnChange} type="text" value={this.props.EditCurrentCard.Description} />
                <br />
                <input id="main_image_input" type="file"></input>
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

        return <div>
            {/* <p>id - {this.props.CurrentCard.Id}</p> */}
            {/* <hr/> */}
            {word}
            <hr />
            {wordAnswer}
            <hr />
            {imageRender}
            {hiddenWord}

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
                ChangeShowCurrentWordImage={this.props.ChangeShowCurrentWordImage}
                ChangeShowCurrentWordAnswer={this.props.ChangeShowCurrentWordAnswer}
                ChangeShowCurrentWord={this.props.ChangeShowCurrentWord}
                SearchStrChanged={this.props.SearchStrChanged}
                SearchedString={this.props.SearchedString}
                StartEditCard={this.props.StartEditCard}
                CancelEditCard={this.props.CancelEditCard}
                SaveCard={this.props.SaveCard}
                AddNewTemplate={this.props.AddNewTemplate}
                ChangeAlwaysShowWord={this.ChangeAlwaysShowWord}
                ShowNextCard={this.props.ShowNextCard}
                ShowHiddenCardsOnClick={this.props.ShowHiddenCardsOnClick}
                ChangeVisibilityCurrentCard={this.props.ChangeVisibilityCurrentCard}
                ShuffleCardsOnClick={this.props.ShuffleCardsOnClick}
                EditTemplateViewNow={this.props.EditTemplateViewNow}
            />
        </div>

    }
}
