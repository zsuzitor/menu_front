import * as React from "react";
//import {ICardListFilters} from '../../_ComponentsLink/CardListFilters'

// export interface IHeaderLogoProps {
// }

export interface ICardListFiltersProps {
    FollowOnly: boolean;
    FollowOnlyChanged: (e: any) => void;
}

export class CardsFilters extends React.Component<ICardListFiltersProps, {}> {

    constructor(props: ICardListFiltersProps) {
        super(props);
    }

    render() {
        return <div>
            <p>Фильтры</p>
            <div><input type="checkbox" defaultChecked={this.props.FollowOnly} onChange={this.props.FollowOnlyChanged} /></div>
        </div>
    }
}
// </helloprops>