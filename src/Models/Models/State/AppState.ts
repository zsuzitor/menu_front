import { IAuthState } from "../AuthState";
import { CodeReviewAppState } from "../CodeReviewApp/State/CodeReviewAppState";
import { PlaningPokerAppState } from "../PlaningPoker/State/PlaningPokerApp";


export class AppState {
    Auth: IAuthState;

    CodeReviewApp: CodeReviewAppState;
    PlaningPokerApp: PlaningPokerAppState;

    constructor() {
        this.Auth = {
            AuthSuccess: false,
            User: null,
        };

        this.CodeReviewApp = new CodeReviewAppState();
        this.PlaningPokerApp = new PlaningPokerAppState();
    }
}