import * as React from "react";
import { OneWordCard as OneWordCardModel } from "../../_ComponentsLink/Models/WordsCardsApp/OneWordCard";

export interface OneWordCardInListProps {
    Card: OneWordCardModel;
    Selected: boolean;
    OnSelectedCard:(id:number)=>void;
}

export class OneWordCardInList extends React.Component<OneWordCardInListProps, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        let selectedClassName = "word-in-list";
        if (this.props.Selected) {
            selectedClassName += " word-in-list-selected";
        }
        return <div onClick={()=>{this.props.OnSelectedCard(this.props.Card.Id)}} className={selectedClassName}>{this.props.Card.Word}</div>

    }
}
