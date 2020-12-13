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


export class BodyOneCardDetailMain extends React.Component<IBodyOneCardDetailMainProps, IOneCardFullData> {

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


    }

    componentWillUnmount() {
        this.state = null;
    }


    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        // return <BodyCardsListMain />
        return <div className = "container">
            <div className='row'>
                <div className="one-card-header">
                    <div className='col-md-6 one-card-header-info'>
                        {/* <p>{this.state ? this.state.Title : 'Loading'}</p> */}
                        <p>TITLE</p>
                        <button>follow</button>
                    </div>
                    <div className='col-md-6 one-card-header-image'>

                        {/* <img src={this.state?.Image} /> */}
                        <img src={G_EmptyImagePath} />
                    </div>
                    <div className="one-card-body-info">
                        <div>BODY</div>
                        <div>MORE INFO</div>
                    </div>
                </div>
            </div>

        </div>
    }
}
// </helloprops>