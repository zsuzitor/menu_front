import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { WordsCardsForceAdd } from "./ForceNew/WordsCardsForceAdd";
import { WordsCardsListMain } from "./WordsCardsListMain";
import { WordsCardsListWork } from "./WordsList/WordsCardsListWork";



export class WordsCardsAppMain extends React.Component<{}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        // return <WordsCardsListMain/>
        return <Routes>
            <Route path="/words-cards-app" element={<WordsCardsListMain />} />
            <Route path="/words-cards-app/force-add/*" element={<WordsCardsForceAdd />} />
            <Route path="/words-cards-app/word-list/*" element={<WordsCardsListWork />
            } />
        </Routes >
    }
}
