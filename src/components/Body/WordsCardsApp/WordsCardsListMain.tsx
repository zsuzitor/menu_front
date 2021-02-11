import * as React from "react";
import { OneWordCard } from "./OneWordCard";
import { WordsCardsList } from "./WordsCardsList";



export class WordsCardsListMain extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <div className="container">
            <div className="row">
                <OneWordCard />
                <WordsCardsList />
            </div>
        </div>
    }
}
