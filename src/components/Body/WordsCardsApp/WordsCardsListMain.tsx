import * as React from "react";
import { OneWordCard as OneWordCardView } from "./OneWordCard";
import { WordsCardsList } from "./WordsCardsList";
import { OneWordCard as OneWordCardModel } from "../../_ComponentsLink/Models/WordsCardsApp/OneWordCard";

export interface WordsCardsListMainState {
    Cards: OneWordCardModel[];
    CurrentCard: OneWordCardModel;
    EditCurrentCard: OneWordCardModel;//надо будет поменять думаю
    ShowCurrentWordAnswer: boolean;//хранится не в карточке потому что ее надо обнулять при выборе карточки
    ShowCurrentWordImage: boolean;//хранится не в карточке потому что ее надо обнулять при выборе карточки
    SearchedString: string;
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
            SearchedString: "",
        };

        for (let i = 0; i < 20; ++i) {
            let card1 = new OneWordCardModel();
            card1.Description = "description" + i;
            card1.Id = i;
            card1.Word = "words" + i;
            card1.WordAnswer = "WordAnswer" + i;
            this.state.Cards.push(card1);
        }
        //действия над словами с бэком:
        //добавить, удалить, получить список, обновить, спрятать, загрузить файл, скачать файл
        //без бэка
        //показать\спрятать: описание слово кратинку, перемешать, показать спрятанные, поиск

        this.ChangeShowCurrentWordAnswer = this.ChangeShowCurrentWordAnswer.bind(this);
        this.ChangeShowCurrentWordImage = this.ChangeShowCurrentWordImage.bind(this);
        this.OnSelectedCard = this.OnSelectedCard.bind(this);
        this.SearchStrChanged = this.SearchStrChanged.bind(this);

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

    OnSelectedCard(id: number) {
        let newState = { ...this.state };
        newState.EditCurrentCard = null;
        newState.ShowCurrentWordAnswer = false;
        newState.ShowCurrentWordImage = false;
        newState.CurrentCard = newState.Cards.find(x => x.Id == id);
        this.setState(newState);
    }

    SearchStrChanged(event: any) {
        let newState = { ...this.state };
        newState.SearchedString = event.target.value;
        this.setState(newState);
    }


    render() {
        return <div className="container">
            <div className="row">
                <OneWordCardView CurrentCard={this.state.CurrentCard} EditCurrentCard={this.state.EditCurrentCard}
                    ChangeShowCurrentWordAnswer={this.ChangeShowCurrentWordAnswer} ChangeShowCurrentWordImage={this.ChangeShowCurrentWordImage}
                    ShowCurrentWordAnswer={this.state.ShowCurrentWordAnswer} ShowCurrentWordImage={this.state.ShowCurrentWordImage}
                    SearchStrChanged={this.SearchStrChanged}
                    SearchedString={this.state.SearchedString}
                />
                <WordsCardsList
                    CardList={this.state.Cards.filter(x => x.Word.indexOf(this.state.SearchedString) >= 0)
                    } CurrentCard={this.state.CurrentCard}
                    OnSelectedCard={this.OnSelectedCard}
                />
            </div>
        </div>
    }
}
