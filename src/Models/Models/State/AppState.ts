import { IAuthState } from "../AuthState";
import { CodeReviewAppState } from "../../../Apps/CodeReviewApp/Models/Entity/State/CodeReviewAppState";
import { PlaningPokerAppState } from "../PlaningPoker/State/PlaningPokerApp";
import { VaultAppState } from "../VaultApp/State/VaultApp";


export class AppState {
    Auth: IAuthState;

    CodeReviewApp: CodeReviewAppState;
    PlaningPokerApp: PlaningPokerAppState;
    VaultApp: VaultAppState;
    constructor() {
        this.Auth = {
            AuthSuccess: false,
            User: null,
        };

        this.CodeReviewApp = new CodeReviewAppState();
        this.PlaningPokerApp = new PlaningPokerAppState();
        this.VaultApp = new VaultAppState();
    }
}