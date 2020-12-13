/// <reference path="../../../../typings/globals.d.ts" />

import * as React from "react";
import { IOneCardFullData } from '../../_ComponentsLink/OneCardFullInfo';
import { IOneCardInListData } from '../../_ComponentsLink/OneCardInListData';
// export interface IHeaderLogoProps {
// }

export interface IBodyOneCardDetailMainProps {
    Id?: number;
    CardDataFromList?: IOneCardInListData;
}


export class OneCardDetailMain extends React.Component<IBodyOneCardDetailMainProps, IOneCardFullData> {

    constructor(props: any) {
        super(props);
        //this.props.location.search

        if (this.props.CardDataFromList) {
            //что то передали из списка, можно это отобразить пока грузятся норм данные
            let newState: IOneCardFullData = {
                Id: this.props.CardDataFromList.Id,
                Body: this.props.CardDataFromList.Body,
                Followed: this.props.CardDataFromList.Followed,
                Image: this.props.CardDataFromList.Image,
                Title: this.props.CardDataFromList.Title,

            };
            this.state = newState;
        }


        this.FollowBlock = this.FollowBlock.bind(this);
        this.FollowButtonClick = this.FollowButtonClick.bind(this);

        this.TitleRender = this.TitleRender.bind(this);
        this.BodyTextRender = this.BodyTextRender.bind(this);
        this.ImageRender = this.ImageRender.bind(this);
        

    }

    componentDidMount() {
        //TODO по
        //надо как то прокинуть из урла
        let cardId: number = -1;
        if (this.props.Id) {
            cardId = this.props.Id;
        }
        else {

        }


        //MOK DATA
        let newTmpState: IOneCardFullData = {
            Body: 'BODY',
            Followed: false,
            Id: 1,
            Title: 'TITLE',
        };

        this.setState(newTmpState);
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

        if (this.state.Followed) {
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
        //TODO отправляем запрос
        let newState = { ...this.state };
        newState.Followed = !this.state.Followed;
        this.setState(newState);
    }

    TitleRender() {
        if (this.state) {
            return <h1>{this.state.Title}</h1>
        }
        else {
            return <h1>WAITING</h1>
        }

    }

    BodyTextRender() {
        if (this.state) {
            return <p>{this.state.Body}</p>
        }
        else {
            return <p>WAITING</p>
        }

    }

    ImageRender() {
        let imgPath = G_EmptyImagePath;
        if (this.state && this.state.Image) {
            imgPath = G_PathToBaseImages + this.state.Image;
        }

        return <img src={imgPath} />
    }

    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        // return <BodyCardsListMain />
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
// </helloprops>