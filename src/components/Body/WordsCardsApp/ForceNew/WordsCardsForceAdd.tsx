import * as React from "react";
import { Link } from "react-router-dom";
import { MainErrorObjectBack } from "../../../_ComponentsLink/BackModel/ErrorBack";
import { IOneWordCardBack } from "../../../_ComponentsLink/BackModel/WordCardApp/OneWordCardBack";
import { IWordListBack } from "../../../_ComponentsLink/BackModel/WordCardApp/WordListBack";
import { AlertData, AlertTypeEnum } from "../../../_ComponentsLink/Models/AlertData";
import { OneWordList } from "../../../_ComponentsLink/Models/WordsCardsApp/OneWordList";
import { CreateCardEdit, OneCard } from "./OneCard";

export interface OneWordCardInListState {
    Cards: CreateCardEdit[];
    WordLists: OneWordList[];
    MaxId: number;
    ListsLoaded: boolean,
}


// export class CreateCardState {
//     // Id: number;
//     Word: string;
//     WordAnswer: string;
//     Description: string;
//     MainImageSave?: File;//не хранится тут, проставляется при редактировании
// }


export class WordsCardsForceAdd extends React.Component<{}, OneWordCardInListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            Cards: [],
            MaxId: 0,
            WordLists: [],
            ListsLoaded: false,
        };

        this.AddNewTemplate = this.AddNewTemplate.bind(this);
        this.WordOnChange = this.WordOnChange.bind(this);
        this.WordAnswerOnChange = this.WordAnswerOnChange.bind(this);
        this.WordDescriptionOnChange = this.WordDescriptionOnChange.bind(this);
        this.GetById = this.GetById.bind(this);
        this.SaveAll = this.SaveAll.bind(this);
        this.LoadAllWOrdLists = this.LoadAllWOrdLists.bind(this);


    }


    AddNewTemplate() {
        let newState = { ...this.state };
        let newCard = new CreateCardEdit();
        newCard.Id = ++newState.MaxId;
        newState.Cards.push(newCard);
        this.setState(newState);
    }

    WordOnChange(id: number, e: any) {
        let newState = { ...this.state };
        let item = this.GetById(newState, id);
        if (item == null) {
            return;
        }

        item.Word = e.target.value;
        this.setState(newState);
    }

    WordAnswerOnChange(id: number, e: any) {
        let newState = { ...this.state };
        let item = this.GetById(newState, id);
        if (item == null) {
            return;
        }

        item.WordAnswer = e.target.value;
        this.setState(newState);
    }

    WordDescriptionOnChange(id: number, e: any) {
        let newState = { ...this.state };
        let item = this.GetById(newState, id);
        if (item == null) {
            return;
        }

        item.Description = e.target.value;
        this.setState(newState);
    }


    SaveAll() {
        let data = new FormData();
        for (let i = 0; i < this.state.Cards.length; ++i) {
            data.append('newData[' + i + '].word', this.state.Cards[i].Word);
            data.append('newData[' + i + '].word_answer', this.state.Cards[i].WordAnswer);
            data.append('newData[' + i + '].description', this.state.Cards[i].Description);
            // data.append('newData.word_answer', this.state.Cards[i].WordAnswer);
            // data.append('newData.description', this.state.Cards[i].Description);
        }

        let refThis = this;
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                }
                else {
                    let res = xhr as IOneWordCardBack[];
                    if (res.length > 0) {
                        let newState = { ...refThis.state };
                        newState.Cards = [];
                        this.setState(newState);
                        let alertL = new AlertData();
                        alertL.Text = "Сохранено";
                        alertL.Type = AlertTypeEnum.Success;
                        G_AddAbsoluteAlertToState(alertL);
                    }
                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordscards/create-list',

        }, true);
    }



    LoadAllWOrdLists() {


        let refThis = this;
        G_AjaxHelper.GoAjaxRequest({
            Data: {},
            Type: "GET",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                }
                else {
                    let dataBack = xhr as IWordListBack[];
                    if (dataBack.length > 0) {
                        let newState = { ...refThis.state };
                        let dataFront: OneWordList[] = [];
                        dataBack.forEach(bk => {
                            let nd = new OneWordList();
                            nd.FillByBackModel(bk);
                            dataFront.push(nd);
                        });

                        newState.ListsLoaded = true;
                        newState.WordLists = dataFront;

                        this.setState(newState);
                    }
                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordslist/get-all-for-user',

        }, true);
    }








    render() {
        let listSelect = <div></div>
        if (this.state.ListsLoaded) {
            listSelect=<select>
                {this.state.WordLists.map(x=><option>{x.Title}</option>)}
            </select>
        }


        return <div className="container">
            <div className="row">
                {listSelect}
                <div className="force-add-cards-list">
                    {this.state.Cards.map((x, index) => {
                        return <OneCard Card={x} key={x.Id}
                            WordOnChange={this.WordOnChange}
                            WordAnswerOnChange={this.WordAnswerOnChange}
                            WordDescriptionOnChange={this.WordDescriptionOnChange}

                        />
                    })}
                </div>
                <div className="col-sm-12">
                    <button className="btn btn-primary" onClick={this.AddNewTemplate}>Добавить новый шаблон</button>
                    <button className="btn btn-primary" onClick={this.SaveAll}>Сохранить все</button>
                    <div className="padding-10-top">
                        <Link to="/words-cards-app">перейти к словарю без сохранения</Link>
                    </div>
                </div>
            </div>
        </div>

    }


    private GetById(st: OneWordCardInListState, id: number): CreateCardEdit {
        for (let i = 0; i < st.Cards.length; ++i) {
            if (st.Cards[i].Id == id) {
                return st.Cards[i];
            }
        }

        return null;
    }
}
