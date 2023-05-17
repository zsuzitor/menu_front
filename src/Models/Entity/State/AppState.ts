import { CodeReviewAppState } from "../../../Apps/CodeReviewApp/Models/Entity/State/CodeReviewAppState";
import { PlaningPokerAppState } from "../../../Apps/PlaningPoker/Models/Entity/State/PlaningPokerApp";
import { VaultAppState } from "../../../Apps/Vault/Models/Entity/State/VaultApp";
import { IAuthState } from "../AuthState";


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