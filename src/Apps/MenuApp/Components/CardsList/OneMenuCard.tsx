/// <reference path="../../../../../typings/globals.d.ts" />

import * as React from "react";

import {
    Link,
    BrowserRouter
} from "react-router-dom";
import { BoolResultBack } from "../../../../Models/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../../../Models/BackModel/ErrorBack";
import { IOneCardFullDataEdit } from "../../Models/Entity/IOneCardFullDataEdit";
import { IOneWordCardBack } from "../../../WordsCardsApp/Models/BackModels/OneWordCardBack";
import { IOneCardFullDataBack } from "../../Models/BackModels/OneCardFullDataBack";
import { IOneCardInListDataBack, OneCardInListDataBack } from "../../Models/BackModels/OneCardInListDataBack";
import { IOneCardInListData, OneCardInListData } from "../../Models/Entity/OneCardInListData";

export interface IOneMenuCardProps {
    CardData?: IOneCardInListData;
    FollowRequstSuccess?: (id: number, result: boolean) => void;
    UpdateElement: (newElementData: IOneCardInListData, isNew: boolean) => void;
    IsNewTemplate?: boolean;
    RemoveNewTemplate?: () => void;
}

export interface IOneMenuCardState {
    EditNow: boolean;
    NewState: IOneCardInListData;
}

export class OneMenuCard extends React.Component<IOneMenuCardProps, IOneMenuCardState> {

    constructor(props: IOneMenuCardProps) {
        super(props);
        // this.onTextChanged = this.onTextChanged.bind(this);

        // this.state = props.data;


        this.state = {
            EditNow: false,
            NewState: null,
        };


        this.ActionButton = this.ActionButton.bind(this);
        this.EditOnClick = this.EditOnClick.bind(this);
        this.SaveOnClick = this.SaveOnClick.bind(this);
        this.FollowCard = this.FollowCard.bind(this);
        this.CancelEditOnClick = this.CancelEditOnClick.bind(this);

        this.TitleRender = this.TitleRender.bind(this);
        this.BodyRender = this.BodyRender.bind(this);

        this.ImageRender = this.ImageRender.bind(this);
        this.TitleOnChange = this.TitleOnChange.bind(this);
        this.BodyOnChange = this.BodyOnChange.bind(this);
        this.RenderFollowButton = this.RenderFollowButton.bind(this);
        this.RenderFollowIcon = this.RenderFollowIcon.bind(this);

    }


    componentDidMount() {
        // console.log(JSON.stringify(this.props));
        if (this.props.IsNewTemplate && !this.state.NewState) {
            let newState = { ...this.state };

            newState.EditNow = true;
            let ns = new OneCardInListData();
            ns.Id = -1;
            ns.Title = 'Новая';
            ns.Body = 'Новая';
            ns.Image = G_EmptyImagePath;
            ns.Followed = false;
            newState.NewState = ns;
            
            this.setState(newState);
        }
    }

    RenderFollowButton() {
        if (this.props.CardData && this.props.CardData.Id > 0) {
            return <div className='follow-one-card-button one-card-button' onClick={this.FollowCard}>
                {this.RenderFollowIcon()}
            </div>
        }
        return <div></div>
    }



    RenderFollowIcon() {
        // return <div></div>
        let imgPath = G_PathToBaseImages;
        if (this.props.CardData.Followed) {
            imgPath += 'red_heart.png';
        }
        else {
            imgPath += 'white_heart.jpg';
        }
        return <img className='persent-100-width-height' src={imgPath} alt="Follow" />
    }

    ActionButton() {
        if (this.state.EditNow) {
            return <div>
                <div className='cancel-edit-one-card-button one-card-button' onClick={this.CancelEditOnClick}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'cancel.png'} alt="Cancel" />
                </div>
                <div className='save-one-card-button one-card-button' onClick={this.SaveOnClick}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'save-icon.png'} alt="Save" />
                </div>
            </div>
        }
        else {

            return <div>
                <div className='edit-one-card-button one-card-button' onClick={this.EditOnClick}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'edit-1.svg'} alt="Edit" />
                </div>
                {this.RenderFollowButton()}

            </div>
        }
    }

    EditOnClick() {
        let newState = { ...this.state };//Object.assign({}, );
        newState.EditNow = true;
        newState.NewState = Object.assign(new OneCardInListData(), this.props.CardData);
        this.setState(newState);
    }

    CancelEditOnClick() {
        let newState = { ...this.state };
        newState.EditNow = false;
        newState.NewState = null;
        // console.log(newState)
        this.setState(newState);
        this.props.IsNewTemplate
        if (this.props.IsNewTemplate && this.props.RemoveNewTemplate) {
            this.props.RemoveNewTemplate();
        }

    }


    FollowCard() {
        if (!this.props.FollowRequstSuccess) {
            return;
        }

        let thisRef = this;
        let success = (error: MainErrorObjectBack, data: BoolResultBack) => {
            if (error || !data) {
                return;
            }
            if (data.result === true) {
                thisRef.props.FollowRequstSuccess(thisRef.props.CardData.Id, true);
            }
            else if (data.result === false) {
                thisRef.props.FollowRequstSuccess(thisRef.props.CardData.Id, false);
            }
        }
        window.G_ArticleController.Follow({ Id: this.props.CardData.Id }, success);


    }

    SaveOnClick() {
        //
        let cardForUpdate = this.state.NewState;
        // console.log(JSON.stringify(cardForUpdate));
        if (this.props.IsNewTemplate) {
            cardForUpdate.Id = -1;
            this.CreateCardInListRequest(cardForUpdate,
                (newEl: IOneCardInListDataBack) => {
                    let newCardData = new OneCardInListData(newEl);
                    let newState = { ...this.state };

                    // let stateForUpdate = newState.NewState;
                    newState.NewState = null;
                    newState.EditNow = false;
                    this.setState(newState);
                    this.props.UpdateElement(newCardData, true);

                });
        }
        else {
            cardForUpdate.Id = this.props.CardData.Id;
            this.EditCardInListRequest(cardForUpdate,
                (fromBack: IOneCardInListDataBack) => {
                    // let newCardData = new OneCardInListData(cardForUpdate);
                    let newState = { ...this.state };

                    // let stateForUpdate = newState.NewState;
                    newState.NewState = null;
                    newState.EditNow = false;
                    this.setState(newState);
                    cardForUpdate.FillByBackModel(fromBack);
                    this.props.UpdateElement(cardForUpdate, false);

                });
        }

    }

    TitleRender() {
        let title = this.state.NewState?.Title;
        let id = this.state.NewState?.Id;
        if (!this.state.NewState) {
            title = this.props.CardData.Title;
            id = this.props.CardData.Id;
        }

        if (this.state.EditNow) {


            return <input type="text" className='persent-100-width form-control' value={title} onChange={this.TitleOnChange} />
        }
        else {

            return <Link to={"/menu-app/detail/" + id}><h5 className="card-title" >{title}</h5></Link>
        }
    }

    ImageRender() {
        let localImagePath: string = G_EmptyImagePath;
        if (this.props.CardData?.Image) {
            localImagePath = this.props.CardData?.Image;
        }

        return <img src={localImagePath} className="card-img-top" alt="..." />
    }


    BodyRender() {
        if (this.state.EditNow) {
            let bodyText = this.state.NewState?.Body;
            if (!this.state.NewState) {
                bodyText = this.state.NewState.Body;
            }

            return <input type="text" className='persent-100-width form-control' value={bodyText} onChange={this.BodyOnChange} />
        }
        else {
            if (this.props.CardData) {
                return <p className="card-text">{this.props.CardData.Body}</p>
            }

            else {
                return <p className="card-text"></p>
            }

        }
    }

    TitleOnChange(e: any) {
        // console.log(this.state);
        let newState = Object.assign({}, this.state);
        newState.NewState.Title = e.target.value;
        // console.log(newState);
        this.setState(newState);
    }

    BodyOnChange(e: any) {
        let newState = Object.assign({}, this.state);
        newState.NewState.Body = e.target.value;
        this.setState(newState);
    }

    render() {

        if (this.props.CardData || this.state.NewState) {
            return <div className='col-sm-6 col-md-4 col-lg-3' style={{ padding: '20px' }}>
                <div className="card one-menu-card-inner">
                    {this.ActionButton()}
                    {this.ImageRender()}
                    <div className="card-body">
                        {this.TitleRender()}
                        {this.BodyRender()}

                    </div>
                </div>
            </div>
        }
        else {
            return null;
        }
    }



    //----------------------------------------------------------------------------PRIVATE

    ///редактирование именно из списка карт
    private EditCardInListRequest(newElement: IOneCardInListData, callBack: any) {//TODO callback на апдейт 

        let success = (error: MainErrorObjectBack, data: IOneCardFullDataBack) => {
            if (error || !data) {
                return;
            }
            let forApply = new OneCardInListDataBack();
            forApply.FillByFullMode(data);
            callBack(forApply);
        }

        let forSend: IOneCardFullDataEdit = { ...newElement, NeedDeleteMainImage: false };

        window.G_ArticleController.Edit(forSend, success);

    }

    ///создание именно из списка карт
    private CreateCardInListRequest(newElement: IOneCardInListData, callBack: any) {//TODO callback на добавление 

        // let thisRef = this;
        let success = (error: MainErrorObjectBack, data: IOneCardFullDataBack) => {
            if (error || !data) {
                return;
            }

            let forApply = new OneCardInListDataBack();
            forApply.FillByFullMode(data);
            callBack(forApply);
        }
        window.G_ArticleController.Create(newElement, success);
    }

}
