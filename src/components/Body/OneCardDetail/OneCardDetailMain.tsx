/// <reference path="../../../../typings/globals.d.ts" />

import * as React from "react";
import { BoolResultBack } from "../../_ComponentsLink/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../_ComponentsLink/BackModel/ErrorBack";
import { IOneCardFullDataBack } from "../../_ComponentsLink/BackModel/OneCardFullDataBack";
import { IOneCardInListDataBack } from "../../_ComponentsLink/BackModel/OneCardInListDataBack";
import { IOneCardFullData, OneCardFullData } from '../../_ComponentsLink/OneCardFullData';
import { IOneCardInListData } from '../../_ComponentsLink/OneCardInListData';
// export interface IHeaderLogoProps {
// }

export interface IBodyOneCardDetailMainProps {
    Id?: number;
    CardDataFromList?: IOneCardInListData;
}

export interface IOneCardDetailMainState {
    Card?: IOneCardFullData;
}


export class OneCardDetailMain extends React.Component<IBodyOneCardDetailMainProps, IOneCardDetailMainState> {

    constructor(props: any) {
        super(props);
        //this.props.location.search

        let newState: IOneCardDetailMainState = {};

        if (this.props.CardDataFromList) {
            //что то передали из списка, можно это отобразить пока грузятся норм данные
            newState.Card = new OneCardFullData();
            newState.Card.Id = this.props.CardDataFromList.Id;
            newState.Card.Body = this.props.CardDataFromList.Body;
            newState.Card.Followed = this.props.CardDataFromList.Followed;
            newState.Card.Image = this.props.CardDataFromList.Image;
            newState.Card.Title = this.props.CardDataFromList.Title;
        }

        this.state = newState;

        this.FollowBlock = this.FollowBlock.bind(this);
        this.FollowButtonClick = this.FollowButtonClick.bind(this);

        this.TitleRender = this.TitleRender.bind(this);
        this.BodyTextRender = this.BodyTextRender.bind(this);
        this.ImageRender = this.ImageRender.bind(this);
        this.RenderCardOrPreloader = this.RenderCardOrPreloader.bind(this);


    }

    componentDidMount() {
        //TODO по
        //надо как то прокинуть из урла
        let cardId: number = -1;
        
        if (this.props.Id) {
            cardId = this.props.Id;
        }
        else {
            let urlArr = window.location.pathname.split('/');
            
            // cardId = urlArr[urlArr.length - 1];
            let idStr = urlArr[urlArr.length - 1];
            // console.log(JSON.stringify(idStr));
            if (/^\d+$/.test(idStr)) {//TODO вынести в метод strContainsNum
               
                cardId = +idStr;
            }
            // console.log(JSON.stringify(cardId));
        }

        let data = {
            "id": cardId,
        };


        let thisRef = this;
        G_AjaxHelper.GoAjaxRequest({
            Data: data,
            Type: "GET",
            FuncSuccess: (xhr, status, jqXHR) => {
                let resp: MainErrorObjectBack = xhr as MainErrorObjectBack;
                if (resp.errors) {
                    //TODO ошибка
                }
                else {
                    let dataBack = xhr as IOneCardFullDataBack;

                    if (dataBack.id && dataBack.id > 0) {
                        let newState = { ...thisRef.state };
                        newState.Card = new OneCardFullData();
                        newState.Card.FillByBackModel(dataBack);
                        thisRef.setState(newState);
                    }
                    else {
                        //ошибка
                    }

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/article/detail',
        });


    }

    componentWillUnmount() {
        this.state = null;
    }


    FollowBlock() {

        if (!this.state) {
            return <div></div>
        }

        let imgPath = G_PathToBaseImages;
        //стоит ли сюда прокидывать из списка событие?
        // return <button>follow</button>

        if (this.state.Card && this.state.Card.Followed) {
            imgPath += 'red_heart.png';
        }
        else {
            imgPath += 'white_heart.jpg';
        }

        return <div className='one-card-page-follow-button' onClick={this.FollowButtonClick}>
            <img className='persent-100-width-height' src={imgPath} alt="Unfollowed" />
        </div>
    }


    FollowButtonClick() {
        let data = {
            "id": this.state.Card.Id,
        };

        let newState = { ...this.state };

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

                        newState.Card.Followed = true;
                        this.setState(newState);
                    }
                    else if (boolRes.result === false) {
                        newState.Card.Followed = false;
                        this.setState(newState);
                    }
                    else {
                        //что то не то вернулось
                    }

                }
            },
            FuncError: (xhr, status, error) => { },
            Url: G_PathToServer + 'api/article/follow',
        });




    }

    TitleRender() {
        if (this.state) {
            return <h1>{this.state.Card.Title}</h1>
        }
        else {
            return <h1>WAITING</h1>
        }

    }

    BodyTextRender() {
        if (this.state) {
            return <p>{this.state.Card.Body}</p>
        }
        else {
            return <p>WAITING</p>
        }

    }

    ImageRender() {
        let imgPath = G_EmptyImagePath;
        if (this.state && this.state.Card.Image) {
            imgPath = G_PathToBaseImages + this.state.Card.Image;
        }

        return <img src={imgPath} />
    }


    RenderCardOrPreloader() {
        if (!this.state.Card) {//TODO нужен кастомный
            return <div className='card-list-preloader'>
                <img src={G_PreloaderPath} className='persent-100-width-height'></img>
            </div>
        }
        else {
            return <div className="container">
                <div>
                    <div className="one-card-header row padding-10-top">
                        <div className='col-sm-6 col-md-8 one-card-header-info'>
                            {/* <p>{this.state ? this.state.Title : 'Loading'}</p> */}
                            {this.TitleRender()}
                            {this.FollowBlock()}
                        </div>
                        <div className='col-sm-6 col-md-4 one-card-header-image'>

                            {/* <img src={this.state?.Image} /> */}
                            {this.ImageRender()}

                        </div>
                        <div className="one-card-body-info padding-10-top persent-100-width">
                            <div className='col-sm-12'>{this.BodyTextRender()}</div>
                            <div className='col-sm-12'>MORE INFO</div>
                        </div>
                    </div>
                </div>

            </div>
        }
    }

    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        // return <BodyCardsListMain />
        return this.RenderCardOrPreloader();

    }
}
// </helloprops>