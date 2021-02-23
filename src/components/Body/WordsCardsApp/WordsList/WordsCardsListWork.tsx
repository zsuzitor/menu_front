import * as React from "react";
import { Link } from "react-router-dom";
import { MainErrorObjectBack } from "../../../_ComponentsLink/BackModel/ErrorBack";
import { IWordListBack } from "../../../_ComponentsLink/BackModel/WordCardApp/WordListBack";
import { OneWordList } from "../../../_ComponentsLink/Models/WordsCardsApp/OneWordList";


export class OneWordListEdit {
    Id?: number;
    Title: string;

    constructor() {
        this.Id = null;
        this.Title = "";
    }
}

export class OneWordListState {
    Record: OneWordList;
    EditModel: OneWordListEdit;
}


export interface IWordsCardsListWorkState {
    WordLists: OneWordListState[];
    EditModel: OneWordListEdit;
    ListsLoaded: boolean,
}





//это страница работы с списками
export class WordsCardsListWork extends React.Component<{}, IWordsCardsListWorkState> {
    constructor(props: any) {
        super(props);


        this.state = {
            ListsLoaded: false,
            WordLists: [],
            EditModel: null,
        };


        this.LoadAllWordLists = this.LoadAllWordLists.bind(this);
        this.AddNewTemplate = this.AddNewTemplate.bind(this);
        this.CancelChange = this.CancelChange.bind(this);
        this.SaveChange = this.SaveChange.bind(this);
        this.SaveNew = this.SaveNew.bind(this);
        this.NewTemplateTitleOnChange = this.NewTemplateTitleOnChange.bind(this);
        this.RenderOneCard = this.RenderOneCard.bind(this);
        this.StartEdit = this.StartEdit.bind(this);
        this.EditTemplateTitleOnChange = this.EditTemplateTitleOnChange.bind(this);


    }


    componentDidMount() {
        this.LoadAllWordLists();
    }



    SaveChange(id: number) {

        let rec = this.GetByIdFromState(this.state, id);
        if (!rec || !rec.EditModel) {
            return;
        }

        let data = new FormData();
        data.append('title', rec.EditModel.Title);
        data.append('id', rec.Record.Id + '');
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
                    let dataBack = xhr as IWordListBack;
                    if (dataBack.id < 1) {
                        return;
                    }
                    let newState = { ...refThis.state };
                    let recActual = this.GetByIdFromState(newState, id);
                    recActual.Record.FillByBackModel(dataBack);

                    recActual.EditModel = null;
                    this.setState(newState);

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordslist/update',

        }, true);
    }

    StartEdit(id: number) {
        let newState = { ...this.state };
        let rec = this.GetByIdFromState(newState, id);
        if (!rec) {
            return;
        }
        rec.EditModel = new OneWordListEdit();
        rec.EditModel.Title = rec.Record.Title;
        this.setState(newState);

    }



    SaveNew() {
        let data = new FormData();
        data.append('title', this.state.EditModel.Title);
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
                    let dataBack = xhr as IWordListBack;
                    if (dataBack.id < 1) {
                        return;
                    }
                    let newState = { ...refThis.state };
                    let nd = new OneWordList();
                    nd.FillByBackModel(dataBack);
                    newState.WordLists.push(
                        {
                            Record: nd,
                            EditModel: null,
                        }
                    );

                    newState.EditModel = null;
                    this.setState(newState);

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordslist/create',

        }, true);
    }

    CancelChange(id: number) {
        if (id < 1) {
            let newState = { ...this.state };
            newState.EditModel = null;
            this.setState(newState);
            return;
        }

        let newState = { ...this.state };
        let recordFromState = this.GetByIdFromState(newState, id);
        recordFromState.EditModel = null;
        this.setState(newState);

    }

    NewTemplateTitleOnChange(e: any) {
        let newState = { ...this.state };
        newState.EditModel.Title = e.target.value;
        this.setState(newState);
    }


    EditTemplateTitleOnChange(id: number, e: any) {
        let newState = { ...this.state };
        let rec = this.GetByIdFromState(newState, id);
        if (!rec || !rec.EditModel) {
            return;
        }


        rec.EditModel.Title = e.target.value;
        this.setState(newState);
    }

    LoadAllWordLists() {
        //копия src\components\Body\WordsCardsApp\ForceNew\WordsCardsForceAdd.tsx

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
                    if (dataBack.length == 0) {
                        return;//todo
                    }

                    let newState = { ...refThis.state };
                    let dataFront: OneWordListState[] = [];
                    dataBack.forEach(bk => {
                        let nd = new OneWordList();
                        nd.FillByBackModel(bk);
                        dataFront.push(
                            {
                                Record: nd,
                                EditModel: null,
                            }
                        );
                    });

                    newState.ListsLoaded = true;
                    newState.WordLists = dataFront;
                    this.setState(newState);

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/wordslist/get-all-for-user',

        }, true);
    }



    AddNewTemplate() {
        let newState = { ...this.state };
        newState.EditModel = new OneWordListEdit();
        this.setState(newState);
    }


    RenderOneCard(data: OneWordListState) {
        if (!data.EditModel) {
            return <div className="work-words-one-list padding-10-top col-sm-12" key={data.Record.Id}>
                <div className="work-words-one-list-inner">
                    <p>{data.Record.Id} - {data.Record.Title}</p>
                    <button onClick={() => { this.StartEdit(data.Record.Id) }} className="btn btn-primary">Редактировать</button>
                </div>
            </div>
        }

        return <div className="work-words-one-list padding-10-top col-sm-12" key={data.Record.Id}>
            <div className="work-words-one-list-inner">
                <input className="form-control" onChange={(e) => this.EditTemplateTitleOnChange(data.Record.Id, e)} value={data.EditModel.Title}></input>
                <button onClick={() => { this.CancelChange(data.Record.Id) }} className="btn btn-primary">Отменить</button>
                <button onClick={() => { this.SaveChange(data.Record.Id) }} className="btn btn-primary">Сохранить</button>
            </div>
        </div >

    }



    render() {
        let lists = <div></div>
        if (this.state.ListsLoaded) {
            lists = <div>
                {this.state.WordLists.map(x => this.RenderOneCard(x))}
            </div>;
        }

        let actions = <div>
            <button onClick={this.AddNewTemplate} className="btn btn-primary">Добавить новый шаблон</button>
            <div className="padding-10-top">
                <Link to="/words-cards-app">перейти к словарю без сохранения</Link>
            </div>
        </div>

        let editTemplate = <div>
        </div>
        if (this.state.EditModel != null) {
            editTemplate = <div>
                <input className="form-control" type="text" placeholder="название списка" onChange={this.NewTemplateTitleOnChange}
                    value={this.state.EditModel.Title}></input>
                <button onClick={() => { this.CancelChange(-1) }} className="btn btn-primary">Отменить</button>
                <button onClick={this.SaveNew} className="btn btn-primary">Добавить</button>
            </div>
        }

        return <div className="container">
            <div className="row">
                <div className="work-words-lists-main">
                    {actions}
                    {editTemplate}
                    {lists}
                </div>
            </div>
        </div>

    }




    private GetByIdFromState(state: IWordsCardsListWorkState, id: number): OneWordListState {
        for (let i = 0; i < state.WordLists.length; ++i) {
            if (state.WordLists[i].Record.Id == id) {
                return state.WordLists[i];
            }
        }

        return null;
    }


}
