/// <reference path="../../../../typings/globals.d.ts" />

import * as React from "react";
import { MenuCardList } from './MenuCardList';
import { CardsFilters } from './CardsFilters';
import { ICardListFilters } from '../../_ComponentsLink/CardListFilters';
import { IOneCardInListData, OneCardInListData } from '../../_ComponentsLink/OneCardInListData';
import { MainErrorObjectBack } from "../../_ComponentsLink/BackModel/ErrorBack";
import { IOneCardInListDataBack } from "../../_ComponentsLink/BackModel/OneCardInListDataBack";
import { BoolResultBack } from "../../_ComponentsLink/BackModel/BoolResultBack";


export interface IBodyCardsListMainProps {
}



// export interface INewCardTemplate {

// }




export interface IBodyCardsListMainState {
    EmptyImagePath: string;
    AllCardsData: IOneCardInListData[];
    NewCardTemplate: boolean;
    CardsListFilters: ICardListFilters;
    CardsLoaded: boolean;
}

export class BodyCardsListMain extends React.Component<IBodyCardsListMainProps, IBodyCardsListMainState> {

    constructor(props: IBodyCardsListMainProps) {
        super(props);
        // this.onTextChanged = this.onTextChanged.bind(this);

        this.state = {
            AllCardsData: [],
            NewCardTemplate: false,
            CardsListFilters: {
                FollowOnly: false,
            },
            EmptyImagePath: G_EmptyImagePath,//"../../images/user_empty_image.png",
            CardsLoaded: false,
        };

        this.UpdateElement = this.UpdateElement.bind(this);
        this.FollowRequstSuccess = this.FollowRequstSuccess.bind(this);
        this.ShowCreateTemplate = this.ShowCreateTemplate.bind(this);
        this.ChangeFilterFollow = this.ChangeFilterFollow.bind(this);
        this.RenderCardsOrPreloader = this.RenderCardsOrPreloader.bind(this);
        this.RemoveNewTemplate = this.RemoveNewTemplate.bind(this);

    }


    async componentDidMount() {
        //грузим все

        // let ajx: AjaxHelper.IAjaxHelper = new AjaxHelper.AjaxHelper();
        await G_AjaxHelper.GoAjaxRequest({
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

                    this.setState({//смержит?????
                        AllCardsData: dataFront,
                        CardsLoaded: true,
                        // FollowedCards: followed,
                        // NotFollowedCards: notFollowed,
                    });

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/article/get-all-short-for-user',

        });
        // .then(()=>{console.log("listmain");}).catch(e => {
        //     console.log(e);
        // });;

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
        // console.log("listmain async");

    }




    ///add or update
    UpdateElement(newElement: IOneCardInListData) {//TODO async почитать
        // console.log(newElement);
        // let newState = Object.assign({}, this.state);
        let newState = { ...this.state };
        // let thisRef = this;
        let updEl = (arr: IOneCardInListData[]) => {
            for (let i = 0; i < arr.length; ++i) {
                if (arr[i].Id == newElement.Id) {
                    this.EditCardInListRequest(newElement,
                        () => {
                            // console.log(i);
                            // console.log(JSON.stringify(newElement));
                            arr[i] = newElement;
                            this.setState(newState);
                        }
                    );

                    return true;
                }
            }
        }

        // console.log(newElement);


        if (newElement.Id > 0 && updEl(newState.AllCardsData)) {
            return;
        }

        this.CreateCardInListRequest(newElement, (newEl: IOneCardInListDataBack) => {
            // this.state.NewCardTemplate
            let elForAdd = new OneCardInListData();
            elForAdd.FillByBackModel(newEl);
            newState.AllCardsData.push(elForAdd);
            newState.NewCardTemplate = false;
            // for (let i = 0; i < newState.AllCardsData.length; ++i) {
            //     if (newState.AllCardsData[i].Id <= 0) {
            //         newState.AllCardsData[i].FillByBackModel(newEl);
            //         this.setState(newState);
            //         return;
            //     }
            // }

            this.setState(newState);
        });

    }

    RemoveNewTemplate() {
        let newState = { ...this.state };
        newState.NewCardTemplate = false;
        this.setState(newState);
    }

    FollowRequstSuccess(id: number, result: boolean) {
        for (let i = 0; i < this.state.AllCardsData.length; ++i) {
            if (this.state.AllCardsData[i].Id == id) {
                let newState = { ...this.state };
                newState.AllCardsData[i].Followed = result;
                this.setState(newState);
                return;
            }
        }


        // let SetFollow = (arr: IOneCardInListData[], follow: boolean) => {
        //     for (let i = 0; i < arr.length; ++i) {
        //         if (arr[i].Id == id) {
        //             let newState = { ...this.state };
        //             newState.AllCardsData[i].Followed = follow;

        //             return true;
        //         }
        //     }
        // };

        // SetFollow(this.state.AllCardsData, result);


    }



    ShowCreateTemplate() {
        if (this.state.NewCardTemplate) {
            return;
        }

        let newState = { ...this.state };
        newState.NewCardTemplate = true;
        // {
        //     Id: -1,
        //     Title: 'Новая',
        //     Body: 'Новая',
        //     Image: this.state.EmptyImagePath,
        //     Followed: false,
        // } as OneCardInListData;//TODO надо проверить сломается что то или нет

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

    RenderCardsOrPreloader() {
        if (this.state.CardsLoaded) {
            return <div className='card-list-body'>
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
                                CardsList={this.state.AllCardsData} UpdateElement={this.UpdateElement} FollowRequstSuccess={this.FollowRequstSuccess}
                                RemoveNewTemplate={this.RemoveNewTemplate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        }
        else {
            return <div className='card-list-preloader'>
                <img src={G_PreloaderPath} className='persent-100-width-height'></img>
            </div>
        }
    }

    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        return <div className='main-body container'>
            {this.RenderCardsOrPreloader()}


        </div>

    }




    //----------------------------------------------------------------------------PRIVATE
    // private EditCreateElementInListRequest(newElement: IOneCardInListData, actionUrl: string, requestType: string, callBack: any) {//TODO callback на апдейт 
    //     let data = {
    //         "id": newElement.Id,
    //         "title": newElement.Title,
    //         "body": newElement.Body,
    //         // "main_image_new":newElement.Image,
    //     };

    //     G_AjaxHelper.GoAjaxRequest({
    //         Data: data,
    //         Type: requestType,
    //         FuncSuccess: (xhr, status, jqXHR) => {
    //             let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
    //             if (resp.errors) {
    //                 //TODO ошибка
    //             }
    //             else {
    //                 //TODO правильно ли так делать? может не bool возвращать а обертку?

    //                 if (xhr) {
    //                     callBack();
    //                 }
    //                 else {
    //                     //что то пошло не так?
    //                 }
    //             }
    //         },
    //         FuncError: (xhr, status, error) => { },
    //         Url: G_PathToServer + 'api/article/'+actionUrl,

    //     });
    // }


    ///редактирование именно из списка карт
    private EditCardInListRequest(newElement: IOneCardInListData, callBack: any) {//TODO callback на апдейт 
        let data = {
            "id": newElement.Id,
            "title": newElement.Title,
            "body": newElement.Body,
            // "main_image_new":newElement.Image,
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
                    let boolRes = xhr as BoolResultBack;
                    if (boolRes.result === true) {

                        callBack();
                    }
                    else if (boolRes.result === false) {
                        //какая то ошибка
                    }
                    else {
                        //что то не то вернулось
                    }
                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/article/edit',

        });
    }

    ///создание именно из списка карт
    private CreateCardInListRequest(newElement: IOneCardInListData, callBack: any) {//TODO callback на добавление 
        let data = {
            "title": newElement.Title,
            "body": newElement.Body,
            // "main_image_new":newElement.Image,
        };

        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "PUT",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                }
                else {
                    let resBack = xhr as IOneCardInListDataBack;
                    if (Number.isInteger(resBack.id) && resBack.id > 0) {

                        callBack(resBack);
                    }
                    else {
                        //что то не то вернулось
                    }
                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/article/create',

        });
    }







}
// </helloprops>