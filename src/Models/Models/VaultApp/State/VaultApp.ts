import { OneVault } from "./OneVault";
import { OneVaultInList } from "./OneVaultInList";
import { OneVaultSecret } from "./OneVaultSecret";


export class VaultAppState {
    VaultList: OneVaultInList[];
    CurrentVault: OneVault;
    CurrentVaultId: number;
    OpenedSecret: OneVaultSecret;//для доступа по прямой ссылке

    constructor() {
        this.VaultList = [];

        this.CurrentVaultId = 0;
    }
}