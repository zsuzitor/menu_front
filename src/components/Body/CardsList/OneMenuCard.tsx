/// <reference path="../../../../typings/globals.d.ts" />

import * as React from "react";
import { IOneCardInListData, OneCardInListData } from '../../_ComponentsLink/OneCardInListData';

// export interface IHeaderLogoProps {
// }

import {
    Link,
    BrowserRouter
} from "react-router-dom";
import { BoolResultBack } from "../../_ComponentsLink/BackModel/BoolResultBack";
import { MainErrorObjectBack } from "../../_ComponentsLink/BackModel/ErrorBack";

export interface IOneMenuCardProps {
    CardData?: IOneCardInListData;
    FollowRequstSuccess?: (id: number, result: boolean) => void;
    UpdateElement: (newElement: IOneCardInListData) => void;
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

        // this.bodyRender = this.bodyRender.bind(this);
        // this.bodyRender = this.bodyRender.bind(this);



    }


    componentDidMount() {
        // console.log(JSON.stringify(this.props));
        if (this.props.IsNewTemplate && !this.state.NewState) {
            let newState = { ...this.state };

            newState.EditNow = true;
            newState.NewState = {
                Id: -1,
                Title: 'Новая',
                Body: 'Новая',
                Image: G_EmptyImagePath,
                Followed: false,
            } as OneCardInListData;//TODO надо проверить сломается что то или нет,
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
        newState.NewState = Object.assign({}, this.props.CardData);
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
        //TODO запрос


        let data = {
            "id": this.props.CardData.Id,
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

                        this.props.FollowRequstSuccess(this.props.CardData.Id, true);
                    }
                    else if (boolRes.result === false) {
                        this.props.FollowRequstSuccess(this.props.CardData.Id, false);
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

    SaveOnClick() {


        //дальше работаем и в компоненты выше передаем то что вернулось в бэка
        let newState = { ...this.state };

        let stateForUpdate = newState.NewState;
        newState.NewState = null;
        newState.EditNow = false;
        this.setState(newState);
        this.props.UpdateElement(stateForUpdate);

    }

    TitleRender() {
        let title = this.state.NewState?.Title;
        let id = this.state.NewState?.Id;
        if (!this.state.NewState) {
            title = this.props.CardData.Title;
            id = this.props.CardData.Id;
        }

        if (this.state.EditNow) {

            // if (this.state.NewState) {
            //     return <input type="text" className='persent-100-width form-control' value={this.state.NewState.Title} onChange={this.TitleOnChange} />
            // }
            // else {
            //     return <input type="text" className='persent-100-width form-control' value={this.props.CardData.Title} onChange={this.TitleOnChange} />
            // }
            return <input type="text" className='persent-100-width form-control' value={title} onChange={this.TitleOnChange} />
        }
        else {
            // if (this.state.NewState) {
            //     return <Link to={"/menu/detail/" + this.state.NewState.Id}><h5 className="card-title" >{this.state.NewState.Title}</h5></Link>
            // }
            // else {
            //     return <Link to={"/menu/detail/" + this.props.CardData.Id}><h5 className="card-title" >{this.props.CardData.Title}</h5></Link>
            // }
            return <Link to={"/menu/detail/" + id}><h5 className="card-title" >{title}</h5></Link>
        }
    }

    ImageRender() {
        let localImagePath: string = this.props.CardData?.Image;
        if (!localImagePath) {
            localImagePath = G_EmptyImagePath;
        }

        return <img src={localImagePath} className="card-img-top" alt="..." />
    }


    BodyRender() {
        if (this.state.EditNow) {
            let bodyText = this.state.NewState?.Body;
            if (!this.state.NewState) {
                bodyText = this.state.NewState.Body;
            }
            // if (this.state.NewState) {
            //     return <input type="text" className='persent-100-width form-control' value={this.state.NewState.Body} onChange={this.BodyOnChange} />
            // }
            // else {
            //     return <input type="text" className='persent-100-width form-control' value={this.state.NewState.Body} onChange={this.BodyOnChange} />
            // }
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
}
// </helloprops>