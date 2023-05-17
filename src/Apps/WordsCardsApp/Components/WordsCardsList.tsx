import * as React from "react";
import { OneWordCardInList } from "./OneWordCardInList";
import { OneWordCard as OneWordCardModel } from "../Models/Entity/OneWordCard";


export interface IWordsCardsListProps {
    CardList: OneWordCardModel[];
    CurrentCard: OneWordCardModel;
    OnSelectedCard: (id: number) => void;
}

export interface IWordsCardsListState {
    // SearchedString: string;
}

export class WordsCardsList extends React.Component<IWordsCardsListProps, IWordsCardsListState> {
    constructor(props: any) {
        super(props);

        this.state = { SearchedString: null };

        // this.SearchStrChande = this.SearchStrChande.bind(this);
    }




    render() {
        //offset-md-1
        return <div className="word-card-cards-list-main col-md-4">
            {/* <WordActions/> */}
            <div className="word-card-cards-list-inner">
                {this.props.CardList.map(x => <OneWordCardInList OnSelectedCard={this.props.OnSelectedCard}
                    Card={x} key={x.Id} Selected={x.Id == this.props.CurrentCard?.Id} />)}
            </div>


        </div>

    }
}
