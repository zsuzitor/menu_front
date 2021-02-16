import * as React from "react";
import { OneWordCard as OneWordCardView } from "./OneWordCard";
import { WordsCardsList } from "./WordsCardsList";
import { OneWordCard as OneWordCardModel } from "../../_ComponentsLink/Models/WordsCardsApp/OneWordCard";
import { IEditCardState } from "../../_ComponentsLink/Models/WordsCardsApp/IEditCardState";
import { AlertData } from "../../_ComponentsLink/Models/AlertData";
import { MainErrorObjectBack } from "../../_ComponentsLink/BackModel/ErrorBack";
import { IOneWordCardBack } from "../../_ComponentsLink/BackModel/WordCardApp/OneWordCardBack";
import { BoolResultBack } from "../../_ComponentsLink/BackModel/BoolResultBack";

export interface WordsCardsListMainState {
    Cards: OneWordCardModel[];
    CurrentCard: OneWordCardModel;
    EditCurrentCard: IEditCardState;
    ShowCurrentWordAnswer: boolean;//хранится не в карточке потому что ее надо обнулять при выборе карточки
    ShowCurrentWord: boolean;
    ShowCurrentWordImage: boolean;//хранится не в карточке потому что ее надо обнулять при выборе карточки
    SearchedString: string;//строка поиска
    CardsLoaded: boolean;//карты бали загружены
    ShowHidenCard: boolean;//показываем скрытые карты вместе с обычными
    WriteTestString: string;
}


export class WordsCardsListMain extends React.Component<{}, WordsCardsListMainState> {
    constructor(props: any) {
        super(props);

        this.state = {
            Cards: [],
            CurrentCard: null,
            EditCurrentCard: null,
            ShowCurrentWordAnswer: false,
            ShowCurrentWordImage: false,
            ShowCurrentWord: false,
            SearchedString: "",
            CardsLoaded: false,
            ShowHidenCard: false,
            WriteTestString: "",
        };

        // for (let i = 0; i < 20; ++i) {
        //     let card1 = new OneWordCardModel();
        //     card1.Description = "description" + i;
        //     card1.Id = i;
        //     card1.Word = "words" + i;
        //     card1.WordAnswer = "WordAnswer" + i;
        //     this.state.Cards.push(card1);
        // }
        //действия над словами с бэком:
        //добавить, удалить, получить список, обновить, спрятать, загрузить файл, скачать файл
        //без бэка
        //показать\спрятать: описание слово кратинку, перемешать, показать спрятанные, поиск

        this.ChangeShowCurrentWordAnswer = this.ChangeShowCurrentWordAnswer.bind(this);
        this.ChangeShowCurrentWord = this.ChangeShowCurrentWord.bind(this);
        this.ChangeShowCurrentWordImage = this.ChangeShowCurrentWordImage.bind(this);
        this.OnSelectedCard = this.OnSelectedCard.bind(this);
        this.SearchStrChanged = this.SearchStrChanged.bind(this);
        this.StartEditCard = this.StartEditCard.bind(this);
        this.CancelEditCard = this.CancelEditCard.bind(this);
        this.SaveCard = this.SaveCard.bind(this);
        this.AddNewTemplate = this.AddNewTemplate.bind(this);
        this.WordOnChange = this.WordOnChange.bind(this);
        this.WordAnswerOnChange = this.WordAnswerOnChange.bind(this);
        this.WordDescriptionOnChange = this.WordDescriptionOnChange.bind(this);
        this.ShowNextCard = this.ShowNextCard.bind(this);
        this.DeleteMainImageOnClick = this.DeleteMainImageOnClick.bind(this);
        this.ShowHiddenCardsOnClick = this.ShowHiddenCardsOnClick.bind(this);
        this.ChangeVisibilityCurrentCard = this.ChangeVisibilityCurrentCard.bind(this);
        this.ShuffleCardsOnClick = this.ShuffleCardsOnClick.bind(this);
        this.DeleteCurrentCard = this.DeleteCurrentCard.bind(this);
        this.WriteTestChanged = this.WriteTestChanged.bind(this);
        

    }


    componentDidMount() {
        G_AjaxHelper.GoAjaxRequest({
            Data: {},
            Type: "GET",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                }
                else {
                    // console.log(xhr);
                    let dataBack = xhr as IOneWordCardBack[];
                    let dataFront: OneWordCardModel[] = [];
                    dataBack.forEach(bk => {
                        let nd = new OneWordCardModel();
                        nd.FillByBackModel(bk);
                        dataFront.push(nd);
                    });

                    this.setState({//смержит?????
                        Cards: dataFront,
                        CardsLoaded: true,
                        // FollowedCards: followed,
                        // NotFollowedCards: notFollowed,
                    });
                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordscards/get-all-for-user',

        }, true);
    }


    WordOnChange(event: any) {
        let newState = { ...this.state };
        newState.EditCurrentCard.Word = event.target.value;
        this.setState(newState);
    }

    WordAnswerOnChange(event: any) {
        let newState = { ...this.state };
        newState.EditCurrentCard.WordAnswer = event.target.value;
        this.setState(newState);
    }

    WordDescriptionOnChange(event: any) {
        let newState = { ...this.state };
        newState.EditCurrentCard.Description = event.target.value;
        this.setState(newState);
    }

    DeleteMainImageOnClick() {
        let newState = { ...this.state };
        newState.EditCurrentCard.NeedDeleteMainImage = !newState.EditCurrentCard.NeedDeleteMainImage;
        this.setState(newState);
    }

    StartEditCard() {
        if (!this.state.CurrentCard) {
            let alert = new AlertData();
            alert.Text = 'Не выбрано слово';
            G_AddAbsoluteAlertToState(alert);
            return;
        }

        let newState = { ...this.state };
        newState.EditCurrentCard = {
            Id: newState.CurrentCard.Id,
            Word: newState.CurrentCard.Word,
            WordAnswer: newState.CurrentCard.WordAnswer,
            Description: newState.CurrentCard.Description,
            ImagePath: newState.CurrentCard.ImagePath,
            NeedDeleteMainImage: false,
        } as IEditCardState;

        this.setState(newState);
    }

    ShowNextCard() {
        let thisRef = this;
        let funcSearch = (arr: OneWordCardModel[], startIndex: number): OneWordCardModel => {//, whl: boolean
            for (let i = startIndex; i < arr.length; ++i) {
                if (thisRef.FilterWordNeedShowInList(arr[i])) {
                    return arr[i];
                }
            }

            for (let i = 0; i < startIndex && i < arr.length; ++i) {
                if (thisRef.FilterWordNeedShowInList(arr[i])) {
                    return arr[i];
                }
            }


            return null;
        }

        // console.log('===');
        if (!this.state.CurrentCard) {
            let newState = { ...this.state };
            this.ChangeCurrentCard(newState);
            newState.CurrentCard = funcSearch(this.state.Cards, 0);
            this.setState(newState);
            // if (this.state.Cards.length > 0) {
            //     let newState = { ...this.state };
            //     this.ChangeCurrentCard(newState);
            //     newState.CurrentCard = this.state.Cards[0];
            //     this.setState(newState);
            //     return;
            // }
            // else {
            //     return;
            // }
        }

        for (let i = 0; i < this.state.Cards.length; ++i) {
            if (this.state.Cards[i].Id === this.state.CurrentCard.Id) {
                let newState = { ...this.state };
                this.ChangeCurrentCard(newState);
                newState.CurrentCard = funcSearch(this.state.Cards, i + 1);
                // if (i + 1 < this.state.Cards.length) {
                //     newState.CurrentCard = this.state.Cards[i + 1];
                // }
                // else {
                //     newState.CurrentCard = this.state.Cards[0];
                // }

                this.setState(newState);
                return;
            }
        }
    }

    AddNewTemplate() {
        let newState = { ...this.state };
        this.ChangeCurrentCard(newState);
        newState.EditCurrentCard = {
            Id: -1,
            Word: "",
            WordAnswer: "",
            Description: "",
            NeedDeleteMainImage: false,
        } as IEditCardState;

        this.setState(newState);
    }



    CancelEditCard() {
        if (!this.state.EditCurrentCard) {
            // let alert = new AlertData();
            // alert.Text = 'Не выбрано слово';
            // G_AddAbsoluteAlertToState(alert);
            return;
        }

        let newState = { ...this.state };
        newState.EditCurrentCard = null;

        this.setState(newState);
    }

    SaveCard() {
        if (!this.state.EditCurrentCard) {
            let alert = new AlertData();
            alert.Text = 'Активируйте режим редактирования';
            G_AddAbsoluteAlertToState(alert);
            return;
        }

        let refThis = this;
        let editCurrantCard = this.state.EditCurrentCard;
        this.state.EditCurrentCard.MainImageSave
        editCurrantCard.MainImageSave = ($('#main_image_input')[0] as HTMLInputElement).files[0];
        let currentCardId = editCurrantCard.Id;

        if (currentCardId < 1) {
            // создаем
            this.AddNewCardInListRequest(editCurrantCard,
                (fromBack: IOneWordCardBack) => {
                    // let newCardData = new OneCardInListData(cardForUpdate);
                    let newState = { ...refThis.state };
                    let newCard = new OneWordCardModel();
                    newCard.FillByBackModel(fromBack);
                    newState.Cards.push(newCard);
                    newState.EditCurrentCard = null;

                    refThis.setState(newState);
                });
        }
        else {
            //редачим
            this.EditCardInListRequest(editCurrantCard,
                (fromBack: IOneWordCardBack) => {
                    // let newCardData = new OneCardInListData(cardForUpdate);
                    let newState = { ...refThis.state };
                    let actualCard = refThis.GetFromStateCardsById(newState, currentCardId);
                    if (actualCard) {
                        actualCard.FillByBackModel(fromBack);
                        newState.EditCurrentCard = null;

                        refThis.setState(newState);
                    }
                    // newState.CurrentCard.FillByBackModel(fromBack);
                    // newState.Card.Title=newState.NewCardData.Title;
                    // newState.Card.Title=newState.NewCardData.body;
                    // newState.EditCurrentCard = null;

                    // refThis.setState(newState);
                });
        }
    }


    ShuffleCardsOnClick() {
        // console.log('=-===');
        let newState = { ...this.state };
        newState.Cards.sort(() => Math.random() - 0.5);
        this.setState(newState);
    }

    ChangeVisibilityCurrentCard() {
        if (!this.state.CurrentCard) {
            return;
        }

        let data = new FormData();
        let cardId = this.state.CurrentCard.Id;
        data.append('id', cardId + '');
        let refThis = this;
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PATCH",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                }
                else {
                    //TODO тут может быть ошибка, что мы не дождались ответа серва а выбранная картинка уже изменилась
                    let res = xhr as BoolResultBack;
                    let newState = { ...refThis.state };
                    let card = refThis.GetFromStateCardsById(newState, cardId);
                    if (card) {
                        card.Hided = res.result;

                        if ((!newState.ShowHidenCard) && card.Hided && newState.CurrentCard?.Id == cardId) {
                            this.ChangeCurrentCard(newState);
                        }

                        refThis.setState(newState);
                    }
                    // newState.CurrentCard.Hided = res.result;
                    // this.ChangeCurrentCard(newState);
                    // refThis.setState(newState);
                    // for (let i = 0; i < refThis.state.Cards.length; ++i) {
                    //     if (refThis.state.Cards[i].Id == refThis.state.CurrentCard.Id) {
                    //         let newState = { ...refThis.state };
                    //         this.ChangeCurrentCard(newState);
                    //         newState.Cards[i].Hided = res.result;
                    //         refThis.setState(newState);
                    //         return;
                    //     }
                    // }
                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordscards/hide',

        }, true);
    }

    DeleteCurrentCard() {
        if (!this.state.CurrentCard) {
            return;
        }

        let data = new FormData();
        let cardId = this.state.CurrentCard.Id;
        data.append('id', cardId + '');
        let refThis = this;
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "DELETE",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                }
                else {
                    //TODO тут может быть ошибка, что мы не дождались ответа серва а выбранная картинка уже изменилась
                    let res = xhr as IOneWordCardBack;
                    if (res?.id && res.id > 0) {
                        let newState = { ...refThis.state };
                        let card = refThis.TryRemoveFromStateCardsById(newState, cardId);
                        if (card) {
                            this.ChangeCurrentCard(newState);
                            refThis.setState(newState);
                        }
                    }

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordscards/delete',

        }, true);
    }


    ShowHiddenCardsOnClick() {
        let newState = { ...this.state };
        newState.ShowHidenCard = !newState.ShowHidenCard;
        if ((!newState.ShowHidenCard) && newState.CurrentCard?.Hided) {
            this.ChangeCurrentCard(newState);
        }
        this.setState(newState);
    }

    ChangeShowCurrentWordImage() {
        let newState = { ...this.state };
        newState.ShowCurrentWordImage = !newState.ShowCurrentWordImage;
        this.setState(newState);
    }

    ChangeShowCurrentWordAnswer() {
        let newState = { ...this.state };
        newState.ShowCurrentWordAnswer = !newState.ShowCurrentWordAnswer;
        this.setState(newState);
    }

    ChangeShowCurrentWord() {
        let newState = { ...this.state };
        newState.ShowCurrentWord = !newState.ShowCurrentWord;
        this.setState(newState);
    }


    OnSelectedCard(id: number) {
        if (this.state.CurrentCard?.Id == id) {
            return;
        }

        let newState = { ...this.state };
        this.ChangeCurrentCard(newState);
        newState.CurrentCard = newState.Cards.find(x => x.Id == id);
        this.setState(newState);
    }

    SearchStrChanged(event: any) {
        let newState = { ...this.state };
        newState.SearchedString = event.target.value;
        this.setState(newState);
    }

    WriteTestChanged(event: any) {
        let newState = { ...this.state };
        newState.WriteTestString = event.target.value;
        this.setState(newState);
    }


    render() {
        if (!this.state.CardsLoaded) {//TODO нужен кастомный
            return <div className='card-list-preloader'>
                {/* <img src={G_PreloaderPath} className='persent-100-width-height'></img> */}
                <div className="spinner-border persent-100-width-height" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        }

        return <div className="main-body container">
            <div className="row">
                <OneWordCardView CurrentCard={this.state.CurrentCard} EditCurrentCard={this.state.EditCurrentCard}
                    ChangeShowCurrentWordAnswer={this.ChangeShowCurrentWordAnswer} ChangeShowCurrentWordImage={this.ChangeShowCurrentWordImage}
                    ChangeShowCurrentWord={this.ChangeShowCurrentWord}
                    ShowCurrentWordAnswer={this.state.ShowCurrentWordAnswer} ShowCurrentWordImage={this.state.ShowCurrentWordImage}
                    ShowCurrentWord={this.state.ShowCurrentWord}
                    SearchStrChanged={this.SearchStrChanged}
                    SearchedString={this.state.SearchedString}
                    StartEditCard={this.StartEditCard}
                    CancelEditCard={this.CancelEditCard}
                    SaveCard={this.SaveCard}
                    AddNewTemplate={this.AddNewTemplate}
                    WordOnChange={this.WordOnChange}
                    WordAnswerOnChange={this.WordAnswerOnChange}
                    WordDescriptionOnChange={this.WordDescriptionOnChange}
                    ShowNextCard={this.ShowNextCard}
                    DeleteMainImageOnClick={this.DeleteMainImageOnClick}
                    ShowHiddenCardsOnClick={this.ShowHiddenCardsOnClick}
                    ChangeVisibilityCurrentCard={this.ChangeVisibilityCurrentCard}
                    ShuffleCardsOnClick={this.ShuffleCardsOnClick}
                    EditTemplateViewNow={this.state.EditCurrentCard != null}
                    DeleteCurrentCard={this.DeleteCurrentCard}
                    WriteTestChanged={this.WriteTestChanged}
                    WriteTestString={this.state.WriteTestString}
                />
                <WordsCardsList
                    CardList={this.state.Cards.filter(x => this.FilterWordNeedShowInList(x))
                    } CurrentCard={this.state.CurrentCard}
                    OnSelectedCard={this.OnSelectedCard}
                />
            </div>
        </div>
    }











    // ---------------------------------------------------------PRIVATE


    private EditCardInListRequest(newElement: IEditCardState, callBack: any) {


        let data = new FormData();
        data.append('id', newElement.Id + '');
        data.append('word', newElement.Word);
        data.append('word_answer', newElement.WordAnswer);
        data.append('description', newElement.Description);
        data.append('delete_main_image', JSON.stringify(newElement.NeedDeleteMainImage));

        if (newElement.MainImageSave) {
            data.append('main_image_new', newElement.MainImageSave);
        }

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PATCH",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                }
                else {
                    let res = xhr as IOneWordCardBack;
                    if (res.id && res.id > 0) {

                        callBack(res);
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


    private AddNewCardInListRequest(newElement: IEditCardState, callBack: any) {

        let data = new FormData();
        data.append('word', newElement.Word);
        data.append('word_answer', newElement.WordAnswer);
        data.append('description', newElement.Description);

        if (newElement.MainImageSave) {
            data.append('main_image_new', newElement.MainImageSave);
        }

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                }
                else {
                    let res = xhr as IOneWordCardBack;
                    if (res.id && res.id > 0) {

                        callBack(res);
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

    private ChangeCurrentCard(stateCopy: WordsCardsListMainState) {
        stateCopy.CurrentCard = null;
        stateCopy.EditCurrentCard = null;
        stateCopy.ShowCurrentWord = false;
        stateCopy.ShowCurrentWordAnswer = false;
        stateCopy.ShowCurrentWordImage = false;
        stateCopy.WriteTestString = "";
    }

    private FilterWordNeedShowInList(card: OneWordCardModel) {
        return card.Word.indexOf(this.state.SearchedString) >= 0 && (this.state.ShowHidenCard || !card.Hided);
    }

    private GetFromStateCardsById(state: WordsCardsListMainState, id: number): OneWordCardModel {
        for (let i = 0; i < state.Cards.length; ++i) {
            if (state.Cards[i].Id == id) {
                return state.Cards[i];
            }
        }

        return null;
    }

    private TryRemoveFromStateCardsById(state: WordsCardsListMainState, id: number): OneWordCardModel[] {
        for (let i = 0; i < state.Cards.length; ++i) {
            if (state.Cards[i].Id == id) {
                return state.Cards.splice(i, 1);
            }
        }

        return null;
    }


}
