import * as React from "react";
import { IOneCardFullData } from '../../_ComponentsLink/OneCardFullInfo'
import { IOneCardInListData } from '../../_ComponentsLink/OneCardInListData'
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
        return <div>
            <div className='row'>
                <div className='col-md-6'>
                    <p>{this.state ? this.state.Title : 'Loading'}</p>
                </div>
                <div className='col-md-6'>

                    <img src={this.state?.Image} />
                </div>
                <div></div>

            </div>

        </div>
    }
}
// </helloprops>