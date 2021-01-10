/// <reference path="../../../../typings/globals.d.ts" />

import * as React from "react";
import { BoolResultBack } from "../../_ComponentsLink/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../_ComponentsLink/BackModel/ErrorBack";
import { IOneCardFullDataBack } from "../../_ComponentsLink/BackModel/OneCardFullDataBack";
import { IOneCardInListDataBack } from "../../_ComponentsLink/BackModel/OneCardInListDataBack";
import { IOneCardFullData, OneCardFullData } from '../../_ComponentsLink/Models/OneCardFullData';
import { IOneCardInListData } from '../../_ComponentsLink/Models/OneCardInListData';
// export interface IHeaderLogoProps {
// }

export interface IBodyOneCardDetailMainProps {
    Id?: number;
    CardDataFromList?: IOneCardInListData;
}

export interface IOneCardDetailMainState {
    Card?: IOneCardFullData;
    NewCardData?: IOneCardFullData;
    EditNow: boolean;
}


export class OneCardDetailMain extends React.Component<IBodyOneCardDetailMainProps, IOneCardDetailMainState> {

    constructor(props: any) {
        super(props);
        //this.props.location.search

        let newState: IOneCardDetailMainState = {
            EditNow: false,
        };

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

        this.RenderFollowBlock = this.RenderFollowBlock.bind(this);
        this.FollowButtonClick = this.FollowButtonClick.bind(this);

        this.RenderTitle = this.RenderTitle.bind(this);
        this.BodyTextRender = this.BodyTextRender.bind(this);
        this.RenderImage = this.RenderImage.bind(this);
        this.RenderCardOrPreloader = this.RenderCardOrPreloader.bind(this);
        this.RenderEditBlock = this.RenderEditBlock.bind(this);
        this.EditButtonClick = this.EditButtonClick.bind(this);
        this.CancelButtonClick = this.CancelButtonClick.bind(this);
        this.RenderCancelBlock = this.RenderCancelBlock.bind(this);
        this.TitleOnChange = this.TitleOnChange.bind(this);
        this.BodyOnChange = this.BodyOnChange.bind(this);


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


    RenderFollowBlock() {

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

        return <div className='one-card-page-follow-button datail-one-card-button' onClick={this.FollowButtonClick}>
            <img className='persent-100-width-height' src={imgPath} alt="Follow" />
        </div>
    }


    RenderCancelBlock() {
        if (!this.state) {
            return null;
        }

        let imgPath = G_PathToBaseImages + 'cancel.png';
        //стоит ли сюда прокидывать из списка событие?
        // return <button>follow</button>

        if (!this.state.EditNow) {
            return null;
        }

        return <div className='one-card-page-cancel-button datail-one-card-button' onClick={this.CancelButtonClick}>
            <img className='persent-100-width-height' src={imgPath} alt="Edit" />
        </div>
    }

    RenderEditBlock() {

        if (!this.state) {
            return null;
        }

        let imgPath = G_PathToBaseImages + 'edit-1.svg';
        //стоит ли сюда прокидывать из списка событие?
        // return <button>follow</button>

        if (this.state.EditNow) {
            return null;
        }

        return <div className='one-card-page-edit-button datail-one-card-button' onClick={this.EditButtonClick}>
            <img className='persent-100-width-height' src={imgPath} alt="Edit" />
        </div>
    }

    RenderSaveBlock() {

        if (!this.state) {
            return null;
        }

        let imgPath = G_PathToBaseImages + 'save-icon.png';
        //стоит ли сюда прокидывать из списка событие?
        // return <button>follow</button>

        if (!this.state.EditNow) {
            return null;
        }

        return <div className='one-card-page-save-button datail-one-card-button' onClick={this.SaveButtonClick}>
            <img className='persent-100-width-height' src={imgPath} alt="Save" />
        </div>
    }



    EditButtonClick() {
        let newState = { ...this.state };
        newState.EditNow = true;
        newState.NewCardData = { ...newState.Card };
        this.setState(newState);
    }

    SaveButtonClick() {
        //TODO
    }

    CancelButtonClick() {
        let newState = { ...this.state };
        newState.EditNow = false;
        newState.NewCardData = null;
        this.setState(newState);
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


    TitleOnChange(e: any) {
        // console.log(this.state);
        let newState = Object.assign({}, this.state);
        newState.NewCardData.Title = e.target.value;
        // console.log(newState);
        this.setState(newState);
    }

    BodyOnChange(e: any) {
        let newState = Object.assign({}, this.state);
        newState.NewCardData.Body = e.target.value;
        this.setState(newState);
    }

    RenderTitle() {
        if (this.state?.Card) {
            let title = this.state.Card.Title;
            if (this.state.NewCardData) {
                title = this.state.NewCardData.Title;
            }

            if (this.state.EditNow) {
                return <input type="text" className='persent-100-width form-control' value={title} onChange={this.TitleOnChange} />
            }
            else {
                return <h1>{title}</h1>
            }

        }
        else {
            return <h1>WAITING</h1>
        }

    }

    BodyTextRender() {
        if (this.state?.Card) {
            let body = this.state.Card.Body;
            if (this.state.NewCardData) {
                body = this.state.NewCardData.Body;
            }

            if (this.state.EditNow) {
                return <input type="text" className='persent-100-width form-control' value={body} onChange={this.BodyOnChange} />
            }
            else {
                return <p>{body}</p>
            }

        }
        else {
            return <p>WAITING</p>
        }

    }

    RenderImage() {
        let imgPath = G_EmptyImagePath;
        if (this.state && this.state.Card.Image) {
            imgPath = G_PathToBaseImages + this.state.Card.Image;
        }

        return <img src={imgPath} />
    }

    RenderActionButton() {
        return <div>
            {this.RenderTitle()}
            {this.RenderFollowBlock()}
            {this.RenderEditBlock()}
            {this.RenderSaveBlock()}
            {this.RenderCancelBlock()}
        </div>
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
                        <div className='col-sm-6 col-md-7 one-card-header-info'>
                            {/* <p>{this.state ? this.state.Title : 'Loading'}</p> */}
                            {this.RenderActionButton()}
                        </div>
                        <div className='col-md-1 col-sm-1 padding-10-top'></div>
                        <div className='col-sm-5 col-md-4 one-card-header-image padding-10-top'>

                            {/* <img src={this.state?.Image} /> */}
                            {this.RenderImage()}

                        </div>
                    </div>
                    <div className='padding-10-top'></div>
                    <div className="one-card-body-info row padding-10-top">
                        <div className='col-sm-12'>{this.BodyTextRender()}</div>
                        <div className='col-sm-12'>MORE INFO</div>
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