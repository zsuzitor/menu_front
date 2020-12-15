/// <reference path="../../../../typings/globals.d.ts" />

import * as React from "react";
import { IOneCardInListData } from '../../_ComponentsLink/OneCardInListData';

// export interface IHeaderLogoProps {
// }

import {
    Link,
    BrowserRouter
} from "react-router-dom";

export interface IOneMenuCardProps {
    CardData: IOneCardInListData;
    FollowRequstSuccess?: (id: number) => void;
    UpdateElement: (newElement: IOneCardInListData) => void;
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

        // this.bodyRender = this.bodyRender.bind(this);
        // this.bodyRender = this.bodyRender.bind(this);



    }

    RenderFollowButton() {
        if (this.props.CardData.Id > 0) {
            return <div className='follow-one-card-button one-card-button' onClick={this.FollowCard}>

            </div>
        }
        return <div></div>
    }

    ActionButton() {
        if (this.state.EditNow) {
            return <div>
                <div className='cancel-edit-one-card-button one-card-button' onClick={this.CancelEditOnClick}>

                </div>
                <div className='save-one-card-button one-card-button' onClick={this.SaveOnClick}>

                </div>
            </div>
        }
        else {

            return <div>
                <div className='edit-one-card-button one-card-button' onClick={this.EditOnClick}>

                </div>
                {this.RenderFollowButton()}

            </div>
        }
    }

    EditOnClick() {
        let newState = { ...this.state };//Object.assign({}, );
        newState.EditNow = true;
        newState.NewState = Object.assign({}, this.props.CardData);
        this.setState(newState);
    }

    CancelEditOnClick() {
        let newState = { ...this.state };
        newState.EditNow = false;
        newState.NewState = null;
        // console.log(newState)
        this.setState(newState);
    }


    FollowCard() {
        if (!this.props.FollowRequstSuccess) {
            return;
        }
        //TODO запрос
        this.props.FollowRequstSuccess(this.props.CardData.Id);

        let newState = { ...this.state };
        newState.EditNow = false;
        this.setState(newState);
    }

    SaveOnClick() {
        //TODO отправляем запрос
        //как то отобразить что он пошел, и что то сделать с кнопками на время запросов
        // console.log(this.NewState);
        //если id<0 то запрос на создание 
        if (this.state.NewState.Id < 1) {//TODO временный костыль тк бэка нет
            this.state.NewState.Id = 99;
        }

        //дальше работаем и в компоненты выше передаем то что вернулось в бэка

        //запрос успешный
        let newState = { ...this.state };
        newState.EditNow = false;
        // newState.OldState = newState.NewState;
        let stateForUpdate = newState.NewState;
        newState.NewState = null;
        this.setState(newState);
        // this.state.
        this.props.UpdateElement(stateForUpdate);
        // newState.NewState = null;
        // let localState = Object.assign({}, newState);
        // localState.NewState = null;


        // this.setState(localState);//TODO возможно все редактирование придется переносить
    }

    TitleRender() {

        if (this.state.EditNow) {
            if (this.state.NewState) {
                return <input type="text" className='persent-100-width form-control' value={this.state.NewState.Title} onChange={this.TitleOnChange} />
            }
            else {
                return <input type="text" className='persent-100-width form-control' value={this.props.CardData.Title} onChange={this.TitleOnChange} />
            }

        }
        else {
            if (this.state.NewState) {
                return <Link to={"/menu/detail/" + this.state.NewState.Id}><h5 className="card-title" >{this.state.NewState.Title}</h5></Link>
            }
            else {
                return <Link to={"/menu/detail/" + this.props.CardData.Id}><h5 className="card-title" >{this.props.CardData.Title}</h5></Link>
            }

        }
    }

    ImageRender() {
        let localImagePath:string = this.props.CardData.Image;
        if(!localImagePath){
            localImagePath = G_EmptyImagePath;
        }

        return <img src={localImagePath} className="card-img-top" alt="..." />
    }


    BodyRender() {
        if (this.state.EditNow) {
            if (this.state.NewState) {
                return <input type="text" className='persent-100-width form-control' value={this.state.NewState.Body} onChange={this.BodyOnChange} />
            }
            else {
                return <input type="text" className='persent-100-width form-control' value={this.state.NewState.Body} onChange={this.BodyOnChange} />
            }
        }
        else {
            if (this.state.NewState) {
                return <p className="card-text">{this.props.CardData.Body}</p>
            }

            else {
                return <p className="card-text">{this.props.CardData.Body}</p>
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
}
// </helloprops>