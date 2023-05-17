import * as React from "react";
import { Link } from "react-router-dom";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { IOneWordCardBack } from "../../Models/BackModels/OneWordCardBack";
import { AlertData, AlertTypeEnum } from "../../../../Models/Entity/AlertData";
import { CreateCardEdit, OneCard } from "./OneCard";
import { IWordListBack } from "../../Models/BackModels/WordListBack";
import { OneWordList } from "../../Models/Entity/OneWordList";

export interface OneWordCardInListState {
    Cards: CreateCardEdit[];
    WordLists: OneWordList[];
    MaxId: number;
    ListsLoaded: boolean,
    SelectedList: number,
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
            SelectedList: -1,
        };

        this.AddNewTemplate = this.AddNewTemplate.bind(this);
        this.WordOnChange = this.WordOnChange.bind(this);
        this.WordAnswerOnChange = this.WordAnswerOnChange.bind(this);
        this.WordDescriptionOnChange = this.WordDescriptionOnChange.bind(this);
        this.GetById = this.GetById.bind(this);
        this.SaveAll = this.SaveAll.bind(this);
        this.LoadAllWordLists = this.LoadAllWordLists.bind(this);
        this.ListOnChange = this.ListOnChange.bind(this);


    }


    componentDidMount() {
        this.LoadAllWordLists();
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
        let refThis = this;
        let success = (error: MainErrorObjectBack, data: IOneWordCardBack[]) => {
            if (error || !data) {
                return;
            }
            
            let newState = { ...refThis.state };
            newState.Cards = [];
            this.setState(newState);
            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultNotify('Сохранено');
            G_AddAbsoluteAlertToState(alert);
        };

        G_WordsCardsController.CreateList(this.state.Cards, this.state.SelectedList + '', success);


    }



    LoadAllWordLists() {
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

            newState.ListsLoaded = true;
            newState.WordLists = dataFront;

            refThis.setState(newState);
        };

        G_WordsListController.GetAllForUser(success);

    }


    ListOnChange(e: any) {
        // console.log(e);
        let newState = { ...this.state };
        newState.SelectedList = +e.target.value;
        this.setState(newState);
    }





    render() {
        let listSelect = <div></div>
        if (this.state.ListsLoaded) {
            listSelect = <div>
                <select value={this.state.SelectedList} onChange={this.ListOnChange}>
                    <option key={-1} value={-1}>Без списка</option>
                    {this.state.WordLists.map(x => <option key={x.Id} value={x.Id}>{x.Title}</option>)}
                </select>
            </div>
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
