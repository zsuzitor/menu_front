import { TaskManagementAppState } from "../../../Apps/TaskManagementApp/Models/Entity/State/TaskManagementAppState";
import { PlaningPokerAppState } from "../../../Apps/PlaningPoker/Models/Entity/State/PlaningPokerApp";
import { VaultAppState } from "../../../Apps/Vault/Models/Entity/State/VaultApp";
import { IAuthState } from "../AuthState";


export class AppState {
    Auth: IAuthState;

    TaskManagementApp: TaskManagementAppState;
    PlaningPokerApp: PlaningPokerAppState;
    VaultApp: VaultAppState;
    constructor() {
        this.Auth = {
            AuthSuccess: false,
            User: null,
        };

        this.TaskManagementApp = new TaskManagementAppState();
        this.PlaningPokerApp = new PlaningPokerAppState();
        this.VaultApp = new VaultAppState();
    }
}