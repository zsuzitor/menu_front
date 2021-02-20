import * as React from "react";
import { MainErrorObjectBack } from "../../../_ComponentsLink/BackModel/ErrorBack";
import { IWordListBack } from "../../../_ComponentsLink/BackModel/WordCardApp/WordListBack";
import { OneWordList } from "../../../_ComponentsLink/Models/WordsCardsApp/OneWordList";


export class OneWordListEdit {
    Id?: number;
    Title: string;
}

export interface IWordsCardsListWorkState {
    WordLists: OneWordList[];
    EditModel: OneWordList;
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

    }






    LoadAllWOrdLists() {
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
        let lists = <div></div>
        if (this.state.ListsLoaded) {
            lists = <div>
                {this.state.WordLists.map(x => <div>{x.Id} - {x.Title}</div>)}
            </div>;
        }

        let actions = <div>
<button>Добавить новый шаблон</button>
        </div>

        let editTemplate = <div>
        </div>
        if(this.state.EditModel!=null){
            editTemplate=<div>
                editTemplate
            </div>
        }

        return <div className="">
            {actions}
            {editTemplate}
            {lists}

        </div>

    }
}
