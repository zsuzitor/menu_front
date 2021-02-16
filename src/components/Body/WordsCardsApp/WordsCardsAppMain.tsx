import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { WordsCardsForceAdd } from "./ForceNew/WordsCardsForceAdd";
import { WordsCardsListMain } from "./WordsCardsListMain";



export class WordsCardsAppMain extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        // return <WordsCardsListMain/>
        return <Switch>
        <Route exact path="/words-cards-app" component={WordsCardsListMain} />
        <Route path="/words-cards-app/force-add" component={WordsCardsForceAdd} />

    </Switch>
    }
}
