import * as React from "react";
import { OneMenuCard } from './OneMenuCard';
import { ICardListFilters } from '../../_ComponentsLink/CardListFilters';
import { IOneCardInListData } from '../../_ComponentsLink/OneCardInListData';

export interface IMenuCardListProps {
    CardFilters: ICardListFilters;
    NewCardTemplate: IOneCardInListData;
    UpdateElement: (newElement: IOneCardInListData) => void;
    FollowRequstSuccess: (id: number) => void;
    CardsList: IOneCardInListData[];
}

export class MenuCardList extends React.Component<IMenuCardListProps, {}> {

    constructor(props: IMenuCardListProps) {
        super(props);
        this.state = {};
        // this.state.elements = props.cardsList;
        // this.onTextChanged = this.onTextChanged.bind(this);
        this.RenderCreateTemplate = this.RenderCreateTemplate.bind(this);
        this.RenderCardByFilters = this.RenderCardByFilters.bind(this);
        this.RenderListByFilters = this.RenderListByFilters.bind(this);


    }

    RenderCreateTemplate() {
        // console.log(this.props);
        if (this.props.NewCardTemplate) {
            return <OneMenuCard key={this.props.NewCardTemplate.Id} CardData={this.props.NewCardTemplate} UpdateElement={this.props.UpdateElement} />
        }

        return <div>
        </div>
    }

    RenderCardByFilters(item: IOneCardInListData) {

        if (!this.props.CardFilters.FollowOnly||item.Followed) {
            // if (item.Followed) {
                return <OneMenuCard key={item.Id} CardData={item} UpdateElement={this.props.UpdateElement} FollowRequstSuccess={this.props.FollowRequstSuccess} />
            // }
        // }
        // else {
        //     // console.log(item);
        //     return <OneMenuCard key={item.Id} CardData={item} UpdateElement={this.props.UpdateElement} FollowRequstSuccess={this.props.FollowRequstSuccess} />
         }
        // console.log(this.props);
        return null;
    }

    RenderListByFilters() {
        return this.props.CardsList.map(item => { return this.RenderCardByFilters(item) })

    }

    render() {
        // return <input placeholder="Поиск" onChange={this.onTextChanged} />;
        return <div className='row'>
            {this.RenderCreateTemplate()}
            {/* {this.props.CardsList.map(item => { this.renderCardByFilters(item) })} */}
            {this.RenderListByFilters()}
        </div>

    }
}
// </helloprops>