/// <reference path="../../../../typings/globals.d.ts" />

import * as React from "react";
import { MenuCardList } from './MenuCardList';
import { CardsFilters } from './CardsFilters';
import { ICardListFilters } from '../../_ComponentsLink/CardListFilters';
import { IOneCardInListData } from '../../_ComponentsLink/OneCardInListData';


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
        let cardsData = [
            {
                Id: 1,
                Title: 'header1',
                Body: 'body1',
                Image: this.state.EmptyImagePath,
                Followed: false

            },
            {
                Id: 2,
                Title: 'header2',
                Body: 'body2',
                Image: this.state.EmptyImagePath,
                Followed: false
            },
            {
                Id: 3,
                Title: 'header3',
                Body: 'body3',
                Image: this.state.EmptyImagePath,
                Followed: true
            },
            {
                Id: 4,
                Title: 'header4',
                Body: 'body4',
                Image: this.state.EmptyImagePath,
                Followed: true
            },
        ];





        this.setState({
            AllCardsData: cardsData,
            // FollowedCards: followed,
            // NotFollowedCards: notFollowed,
        });


    }



    UpdateElement(newElement: IOneCardInListData) {
        // console.log(newElement);
        // let newState = Object.assign({}, this.state);
        let newState = { ...this.state };

        let updEl = (arr: IOneCardInListData[]) => {
            for (let i = 0; i < arr.length; ++i) {
                if (arr[i].Id == newElement.Id) {
                    arr[i] = newElement;
                    this.setState(newState);
                    return true;
                }
            }
        }

        // console.log(newElement);


        if (updEl(newState.AllCardsData)) {
            return;
        }

        // if (updEl(newState.NotFollowedCards)) {
        //     return;
        // }
        // newElement.Id+=Math.floor(Math.random() * Math.floor(20));//TODO для теста
        newState.AllCardsData.push(newElement);
        newState.NewCardTemplate = null;
        // console.log(newState);
        this.setState(newState);
    }



    FollowRequstSuccess(id: number) {
        // let moveFollow = (from, to) => {
        //     for (let i = 0; i < from.length; ++i) {
        //         if (from[i].Id == id) {
        //             to.push(from[i]);
        //             from.splice(i, 1);
        //             this.setState(newState);
        //             return true;
        //         }
        //     }
        // };

        let SetFollow = (arr: IOneCardInListData[]) => {
            for (let i = 0; i < arr.length; ++i) {
                if (arr[i].Id == id) {
                    arr[i].Followed = !arr[i].Followed;
                    // to.push(from[i]);
                    // from.splice(i, 1);
                    // this.setState(newState);
                    return true;
                }
            }
        };

        let newState = Object.assign({}, this.state);
        SetFollow(newState.AllCardsData);

        // console.log('follow-' + id);


        // if (moveFollow(newState.FollowedCards, newState.NotFollowedCards)) {
        //     return;
        // }

        // moveFollow(newState.NotFollowedCards, newState.FollowedCards);


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
        let newState = Object.assign({}, this.state);
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
}
// </helloprops>