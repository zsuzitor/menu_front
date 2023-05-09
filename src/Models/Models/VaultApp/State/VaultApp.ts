import { OneVault } from "./OneVault";


export class VaultAppState {
    VaultList: OneVault[];
    CurrentVaultId: number;

    constructor() {
        this.VaultList = [];

        this.CurrentVaultId = 0;
    }
}