import { CodeReviewAppState } from "../CodeReviewApp/State/CodeReviewAppState";
import { PlaningPokerAppState } from "../PlaningPoker/State/PlaningPokerApp";


export class AppState {
    CodeReviewApp: CodeReviewAppState;
    PlaningPokerApp: PlaningPokerAppState;


    constructor() {
        this.CodeReviewApp = new CodeReviewAppState();
        this.PlaningPokerApp = new PlaningPokerAppState();
    }
}