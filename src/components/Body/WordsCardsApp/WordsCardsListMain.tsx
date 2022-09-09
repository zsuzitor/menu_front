import * as React from "react";
import { OneWordCard as OneWordCardView } from "./OneWordCard";
import { WordsCardsList } from "./WordsCardsList";
import { OneWordCard as OneWordCardModel } from "../../../Models/Models/WordsCardsApp/OneWordCard";
import { IEditCardState } from "../../../Models/Models/WordsCardsApp/IEditCardState";
import { AlertData, AlertTypeEnum } from "../../../Models/Models/AlertData";
import { MainErrorObjectBack } from "../../../Models/BackModel/ErrorBack";
import { IOneWordCardBack, IWordCardWordList } from "../../../Models/BackModel/WordCardApp/OneWordCardBack";
import { BoolResultBack } from "../../../Models/BackModel/BoolResultBack";
import { IWordListBack } from "../../../Models/BackModel/WordCardApp/WordListBack";
import { OneWordList } from "../../../Models/Models/WordsCardsApp/OneWordList";
import { OneWordListState } from "./WordsList/WordsCardsListWork";
import { WordCardWordList } from "../../../Models/Models/WordsCardsApp/WordCardWordList";

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
    WriteTestString: string;//слово которое написал юзер для проверки правописания
    WordLists: OneWordList[];
    WordListSelected: number;//выбранный список
    // WordListsLoaded: boolean,
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
            WordLists: [],
            WordListSelected: -1,
            // WordListsLoaded:false,
        };

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
        this.LoadAllWordLists = this.LoadAllWordLists.bind(this);
        this.ListOnChange = this.ListOnChange.bind(this);
        this.AddCardToList = this.AddCardToList.bind(this);
        this.RemoveFromList = this.RemoveFromList.bind(this);

    }


    componentDidMount() {
        this.LoadAllWordLists();
        let refThis = this;
        let success = (error: MainErrorObjectBack, data: IOneWordCardBack[]) => {
            if (error || !data) {
                return;
            }
            let dataFront: OneWordCardModel[] = [];
            data.forEach(bk => {
                let nd = new OneWordCardModel();
                nd.FillByBackModel(bk);
                dataFront.push(nd);
            });

            refThis.setState({//смержит?????
                Cards: dataFront,
                CardsLoaded: true,
                // FollowedCards: followed,
                // NotFollowedCards: notFollowed,
            });
        };

        G_WordsCardsController.GetAllForUser(success);

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
            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultError('Не выбрано слово');
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
            return;
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
            return;
        }

        let newState = { ...this.state };
        newState.EditCurrentCard = null;

        this.setState(newState);
    }

    SaveCard() {
        if (!this.state.EditCurrentCard) {
            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultError('Активируйте режим редактирования');
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

        let refThis = this;
        let cardId = this.state.CurrentCard.Id;
        let success = (error: MainErrorObjectBack, data: BoolResultBack) => {
            if (error || !data) {
                return;
            }
            let newState = { ...refThis.state };
            let card = refThis.GetFromStateCardsById(newState, cardId);
            if (card) {
                card.Hided = data.result;

                if ((!newState.ShowHidenCard) && card.Hided && newState.CurrentCard?.Id == cardId) {
                    refThis.ChangeCurrentCard(newState);
                }

                refThis.setState(newState);
            }
        };

        G_WordsCardsController.Hide(cardId, success);


    }


    AddCardToList(cardId: number, listId: number) {
        if (cardId < 1 || listId < 1) {
            return;
        }
        let card = this.GetFromStateCardsById(this.state, cardId);
        if (card.Lists.find(x => x.IdList == listId)) {
            return;
        }

        let refThis = this;
        let success = (error: MainErrorObjectBack, data: IWordCardWordList) => {
            if (error || !data) {
                return;
            }
            let newState = { ...refThis.state };
            card = this.GetFromStateCardsById(newState, cardId);
            if (card) {
                let newRec = new WordCardWordList();
                newRec.FillByBackModel(data);
                card.Lists.push(newRec);
                refThis.setState(newState);
            }
        };

        G_WordsListController.AddToList(cardId, listId, success);

    }

    RemoveFromList(cardId: number, listId: number) {
        if (cardId < 1 || listId < 1) {
            return;
        }
        let card = this.GetFromStateCardsById(this.state, cardId);
        if (!card.Lists.find(x => x.IdList == listId)) {
            return;
        }

        let refThis = this;
        let success = (error: MainErrorObjectBack, data: BoolResultBack) => {
            if (error || !data) {
                return;
            }
            if (data.result) {
                let newState = { ...refThis.state };
                card = this.GetFromStateCardsById(newState, cardId);
                for (let i = 0; i < card.Lists.length; ++i) {
                    if (card.Lists[i].IdList == listId) {
                        card.Lists.splice(i, 1)
                        refThis.setState(newState);
                        return;
                    }
                }


            }
        };

        G_WordsListController.RemoveFromList(cardId, listId, success);

    }


    DeleteCurrentCard() {
        if (!this.state.CurrentCard) {
            return;
        }

        let refThis = this;
        let cardId = this.state.CurrentCard.Id;
        let success = (error: MainErrorObjectBack, data: IOneWordCardBack) => {
            if (error || !data) {
                return;
            }
            let newState = { ...refThis.state };
            let card = refThis.TryRemoveFromStateCardsById(newState, cardId);
            if (card) {
                refThis.ChangeCurrentCard(newState);
                refThis.setState(newState);
            }
        };

        G_WordsCardsController.Delete(cardId, success);


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


    ListOnChange(e: any) {
        // console.log(e);
        let newState = { ...this.state };
        newState.WordListSelected = +e.target.value;
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
                    WordLists={this.state.WordLists}
                    SelectedList={this.state.WordListSelected}
                    ListOnChange={this.ListOnChange}
                    AddCardToList={this.AddCardToList}
                    RemoveFromList={this.RemoveFromList}
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

        // let refThis = this;
        let success = (error: MainErrorObjectBack, data: IOneWordCardBack) => {
            if (error || !data) {
                return;
            }
            callBack(data);
        };

        G_WordsCardsController.Update(newElement, success);

        // let data = new FormData();
        // data.append('id', newElement.Id + '');
        // data.append('word', newElement.Word);
        // data.append('word_answer', newElement.WordAnswer);
        // data.append('description', newElement.Description);
        // data.append('delete_main_image', JSON.stringify(newElement.NeedDeleteMainImage));

        // if (newElement.MainImageSave) {
        //     data.append('main_image_new', newElement.MainImageSave);
        // }

        // G_AjaxHelper.GoAjaxRequest({
        //     Data: data,
        //     Type: "PATCH",
        //     FuncSuccess: (xhr, status, jqXHR) => {
        //         let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
        //         if (resp.errors) {
        //             //TODO ошибка
        //         }
        //         else {
        //             let res = xhr as IOneWordCardBack;
        //             if (res.id && res.id > 0) {

        //                 callBack(res);
        //             }
        //             else {
        //                 //что то не то вернулось
        //             }
        //         }
        //     },
        //     FuncError: (xhr, status, error) => { },
        //     Url: G_PathToServer + 'api/wordscards/update',

        // }, true);
    }


    private AddNewCardInListRequest(newElement: IEditCardState, callBack: any) {
        let success = (error: MainErrorObjectBack, data: IOneWordCardBack) => {
            if (error || !data) {
                return;
            }
            callBack(data);
        };

        G_WordsCardsController.Create(newElement, success);


        // let data = new FormData();
        // data.append('word', newElement.Word);
        // data.append('word_answer', newElement.WordAnswer);
        // data.append('description', newElement.Description);

        // if (newElement.MainImageSave) {
        //     data.append('main_image_new', newElement.MainImageSave);
        // }

        // G_AjaxHelper.GoAjaxRequest({
        //     Data: data,
        //     Type: "PUT",
        //     FuncSuccess: (xhr, status, jqXHR) => {
        //         let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
        //         if (resp.errors) {
        //             //TODO ошибка
        //         }
        //         else {
        //             let res = xhr as IOneWordCardBack;
        //             if (res.id && res.id > 0) {

        //                 callBack(res);
        //             }
        //             else {
        //                 //что то не то вернулось
        //             }
        //         }
        //     },
        //     FuncError: (xhr, status, error) => { },
        //     Url: G_PathToServer + 'api/wordscards/create',

        // }, true);
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
        let res = card.Word.indexOf(this.state.SearchedString) >= 0
            && (this.state.ShowHidenCard || !card.Hided);

        if (!res) {
            return false;
        }

        if (this.state.WordListSelected > 0) {
            res = card.Lists.some(x => x.IdList == this.state.WordListSelected);
        }


        return res;
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


    private LoadAllWordLists() {

        let refThis = this;
        let success = (error: MainErrorObjectBack, data: IWordListBack[]) => {
            if (error || !data) {
                return;
            }
            let newState = { ...refThis.state };
            let dataFront: OneWordList[] = [];
            data.forEach(bk => {
                let nd = new OneWordList();
                nd.FillByBackModel(bk);
                dataFront.push(nd);
            });

            // newState.WordListsLoaded = true;
            newState.WordLists = dataFront;
            refThis.setState(newState);
        };

        G_WordsListController.GetAllForUser(success);




        // G_AjaxHelper.GoAjaxRequest({
        //     Data: {},
        //     Type: "GET",
        //     FuncSuccess: (xhr, status, jqXHR) => {
        //         let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
        //         if (resp.errors) {
        //             //TODO ошибка
        //         }
        //         else {
        //             let dataBack = xhr as IWordListBack[];
        //             if (dataBack.length == 0) {
        //                 return;//todo
        //             }

        //             let newState = { ...refThis.state };
        //             let dataFront: OneWordList[] = [];
        //             dataBack.forEach(bk => {
        //                 let nd = new OneWordList();
        //                 nd.FillByBackModel(bk);
        //                 dataFront.push(nd);
        //             });

        //             // newState.WordListsLoaded = true;
        //             newState.WordLists = dataFront;
        //             this.setState(newState);

        //         }
        //     },
        //     FuncError: (xhr, status, error) => { },
        //     Url: G_PathToServer + 'api/wordslist/get-all-for-user',

        // }, true);
    }

}
