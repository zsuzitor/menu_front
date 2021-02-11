import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { WordsCardsListMain } from "./WordsCardsListMain";



export class WordsCardsAppMain extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <WordsCardsListMain/>

    }
}
