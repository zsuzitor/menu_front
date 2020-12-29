/// <reference path="../../../../typings/globals.d.ts" />

import * as React from "react";
import { MenuCardList } from './MenuCardList';
import { CardsFilters } from './CardsFilters';
import { ICardListFilters } from '../../_ComponentsLink/CardListFilters';
import { IOneCardInListData, OneCardInListData } from '../../_ComponentsLink/OneCardInListData';
import { MainErrorObjectBack } from "../../_ComponentsLink/BackModel/ErrorBack";
import { IOneCardInListDataBack } from "../../_ComponentsLink/BackModel/OneCardInListDataBack";


export interface IBodyCardsListMainProps {
}



// export interface INewCardTemplate {

// }




export interface IBodyCardsListMainState {
    EmptyImagePath: string;
    AllCardsData: IOneCardInListData[];
    NewCardTemplate: IOneCardInListData;
    CardsListFilters: ICardListFilters
}

export class BodyCardsListMain extends React.Component<IBodyCardsListMainProps, IBodyCardsListMainState> {

    constructor(props: IBodyCardsListMainProps) {
        super(props);
        // this.onTextChanged = this.onTextChanged.bind(this);

        this.state = {
            AllCardsData: [],
            NewCardTemplate: null,
            CardsListFilters: {
                FollowOnly: false,
            },
            EmptyImagePath: G_EmptyImagePath,//"../../images/user_empty_image.png",
        };

        this.UpdateElement = this.UpdateElement.bind(this);
        this.FollowRequstSuccess = this.FollowRequstSuccess.bind(this);
        this.ShowCreateTemplate = this.ShowCreateTemplate.bind(this);
        this.ChangeFilterFollow = this.ChangeFilterFollow.bind(this);


    }


    componentDidMount() {
        //грузим все

        // let ajx: AjaxHelper.IAjaxHelper = new AjaxHelper.AjaxHelper();
        G_AjaxHelper.GoAjaxRequest({
            Data: {},
            Type: "GET",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                }
                else {
                    let dataBack = xhr as IOneCardInListDataBack[];
                    let dataFront: OneCardInListData[] = [];
                    dataBack.forEach(bk => {
                        dataFront.push(new OneCardInListData(bk));
                    });

                    this.setState({
                        AllCardsData: dataFront,
                        // FollowedCards: followed,
                        // NotFollowedCards: notFollowed,
                    });

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/article/get-all-short-for-user',

        });

        // let cardsData = [
        //     {
        //         Id: 1,
        //         Title: 'header1',
        //         Body: 'body1',
        //         Image: this.state.EmptyImagePath,
        //         Followed: false
        //     }
        // ];

        // this.setState({
        //     AllCardsData: cardsData,
        //     // FollowedCards: followed,
        //     // NotFollowedCards: notFollowed,
        // });


    }




    ///add or update
    UpdateElement(newElement: IOneCardInListData) {
        // console.log(newElement);
        // let newState = Object.assign({}, this.state);
        let newState = { ...this.state };

        let updEl = (arr: IOneCardInListData[]) => {
            for (let i = 0; i < arr.length; ++i) {
                if (arr[i].Id == newElement.Id) {
                    //update
                    this.EditCreateElementInListRequest(newElement, "edit","PATCH", () => {
                        arr[i] = newElement;
                        this.setState(newState);
                    });
                    return true;
                }
            }
        }

        // console.log(newElement);


        if (updEl(newState.AllCardsData)) {
            return;
        }
        //TODO создать полную модуль с бэка и тут ее прокинуть в стайт
        this.EditCreateElementInListRequest(newElement, "create","PUT", () => {
            arr[i] = newElement;
            this.setState(newState);
        });

    }



    FollowRequstSuccess(id: number) {
        let SetFollow = (arr: IOneCardInListData[], follow: boolean) => {
            for (let i = 0; i < arr.length; ++i) {
                if (arr[i].Id == id) {
                    let newState = { ...this.state };
                    newState.AllCardsData[i].Followed = follow;

                    return true;
                }
            }
        };

        let data = {
            "id": id,
        };
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PATCH",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                }
                else {
                    if (xhr) {

                        SetFollow(this.state.AllCardsData, true);
                    }
                    else {
                        SetFollow(this.state.AllCardsData, false);//TODO правильно ли так делать? может не bool возвращать а обертку?
                    }

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/article/follow',
        });


    }



    ShowCreateTemplate() {
        if (this.state.NewCardTemplate) {
            return;
        }

        let newState = { ...this.state };//Object.assign({}, this.state);
        newState.NewCardTemplate = {
            Id: -1,
            Title: 'Новая',
            Body: 'Новая',
            Image: this.state.EmptyImagePath,
            Followed: false,
        };

        this.setState(newState);
    }


    ChangeFilterFollow(e: any) {//TODO onChange для input
        // e.persist();
        let newState = { ...this.state };
        // console.log(e);
        // if(e.target.value){
        //     newState.CardsListFilters.FollowOnly=true;
        // }
        // else{
        //     newState.CardsListFilters.FollowOnly=false;
        // }
        newState.CardsListFilters.FollowOnly = !newState.CardsListFilters.FollowOnly;
        this.setState(newState);
    }

    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        return <div className='main-body container'>

            {/* <p>
                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#body-chosen-cards-section" aria-expanded="false" aria-controls="body-chosen-cards-section">Избранные</button>
            </p>
            <div>
                <div className="collapse" id="body-chosen-cards-section">
                    <div className="card card-body">

                        <MenuCardList CardsList={this.state.FollowedCards} updateElement={this.updateElement} FollowRequstSuccess={this.followRequstSuccess} />
                    </div>
                </div>
            </div> */}
            <CardsFilters FollowOnly={this.state.CardsListFilters.FollowOnly} FollowOnlyChanged={this.ChangeFilterFollow} />

            <p>
                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#body-all-cards-section" aria-expanded="false" aria-controls="body-all-cards-section">Карточки</button>
            </p>
            <div>
                <div className="collapse" id="body-all-cards-section">
                    <div className="card card-body">
                        <div>
                            <button className='btn btn-primary' onClick={this.ShowCreateTemplate}>Добавить</button>
                        </div>
                        <MenuCardList CardFilters={this.state.CardsListFilters} NewCardTemplate={this.state.NewCardTemplate}
                            CardsList={this.state.AllCardsData} UpdateElement={this.UpdateElement} FollowRequstSuccess={this.FollowRequstSuccess} />
                    </div>
                </div>
            </div>
        </div>

    }




    //----------------------------------------------------------------------------PRIVATE
    private EditCreateElementInListRequest(newElement: IOneCardInListData, actionUrl: string, requestType: string, callBack: any) {//TODO callback на апдейт 
        let data = {
            "id": newElement.Id,
            "title": newElement.Title,
            "body": newElement.Body,
            // "main_image_new":newElement.Image,
        };

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: requestType,
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                }
                else {
                    //TODO правильно ли так делать? может не bool возвращать а обертку?

                    if (xhr) {
                        callBack();
                    }
                    else {
                        //что то пошло не так?
                    }
                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/article/'+actionUrl,

        });
    }







}
// </helloprops>