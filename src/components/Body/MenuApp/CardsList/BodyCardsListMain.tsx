/// <reference path="../../../../../typings/globals.d.ts" />

import * as React from "react";
import { MenuCardList } from './MenuCardList';
import { CardsFilters } from './CardsFilters';
import { ICardListFilters } from '../../../../Models/Models/MenuApp/CardListFilters';
import { IOneCardInListData, OneCardInListData } from '../../../../Models/Models/MenuApp/OneCardInListData';
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { IOneCardInListDataBack } from "../../../../Models/BackModel/MenuApp/OneCardInListDataBack";


export interface IBodyCardsListMainProps {
}


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
            EmptyImagePath: G_EmptyImagePath,
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
        let refThis = this;
        // let ajx: AjaxHelper.IAjaxHelper = new AjaxHelper.AjaxHelper();
        let success = (error: MainErrorObjectBack, data: IOneCardInListDataBack[]) => {
            if (error || !data) {
                return;
            }
            let dataFront: OneCardInListData[] = [];
            data.forEach(bk => {
                dataFront.push(new OneCardInListData(bk));
            });

            refThis.setState({//смержит?????
                AllCardsData: dataFront,
                CardsLoaded: true,
                // FollowedCards: followed,
                // NotFollowedCards: notFollowed,
            });
        }
        window.G_ArticleController.GetAllShortForUser(success);
        
    }




    ///add or update
    UpdateElement(newElement: IOneCardInListData, isNew: boolean) {

        if (isNew) {
            let newState = { ...this.state };
            // let elForAdd = new OneCardInListData();
            // elForAdd.FillByBackModel(newEl);
            newState.AllCardsData.push(newElement);
            newState.NewCardTemplate = false;

            this.setState(newState);
        }
        else {
            let newState = { ...this.state };
            for (let i = 0; i < newState.AllCardsData.length; ++i) {
                if (newState.AllCardsData[i].Id == newElement.Id) {
                    newState.AllCardsData[i] = newElement;
                    this.setState(newState);

                    return;
                }
            }

        }



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

    }



    ShowCreateTemplate() {
        if (this.state.NewCardTemplate) {
            return;
        }

        let newState = { ...this.state };
        newState.NewCardTemplate = true;
        this.setState(newState);
    }


    ChangeFilterFollow(e: any) {
        // e.persist();
        let newState = { ...this.state };
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
                {/* <img src={G_PreloaderPath} className='persent-100-width-height'></img> */}
                <div className="spinner-border persent-100-width-height" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        }
    }

    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        return <div className='main-body container'>
            {this.RenderCardsOrPreloader()}


        </div>

    }












}
// </helloprops>