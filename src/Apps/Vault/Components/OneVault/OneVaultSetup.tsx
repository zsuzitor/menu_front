import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { OneVault } from '../../Models/Entity/State/OneVault';
import { ChangeCurrentVaultIdActionCreator } from '../../Models/Actions/VaultActions';
import { IUpdateSecretEntity } from '../../Models/Entity/UpdateSecretEntity';




interface IOneVaultOwnProps {
    VaultId?: number;
}

interface IOneVaultStateToProps {
    Vault: OneVault;
    VaultIsAuthorized: boolean;
}

interface IOneVaultDispatchToProps {
    SetCurrentVaultId: (id: number) => void;
    LoadVaultSecrets: (vaultId: number) => void;
    LoadVault: (vaultId: number) => void;
    CreateSecret: (secret: IUpdateSecretEntity) => void;
    DeleteVault: (id: number) => void;
    VaultAuth: (vaultId: number, password: string) => void;
}

export interface IOneVaultProps extends IOneVaultStateToProps, IOneVaultOwnProps, IOneVaultDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IOneVaultOwnProps) => {
    let res = {} as IOneVaultStateToProps;
    res.Vault = state.VaultApp.CurrentVault;
    res.VaultIsAuthorized = state.VaultApp.CurrentVault?.IsAuthorized ?? false;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IOneVaultOwnProps) => {
    let res = {} as IOneVaultDispatchToProps;
    res.SetCurrentVaultId = (id: number) => {
        dispatch(ChangeCurrentVaultIdActionCreator({ Id: id }));
    };

    res.LoadVaultSecrets = (vaultId: number) => {
        dispatch(window.G_VaultController.GetVaultSecretsRedux(vaultId));
    };

    res.LoadVault = (vaultId: number) => {
        dispatch(window.G_VaultController.GetCurrentVaultRedux(vaultId));
    };

    res.CreateSecret = (secret: IUpdateSecretEntity) => {
        dispatch(window.G_VaultController.CreateSecretRedux(secret));
    };

    res.DeleteVault = (vaultId: number) => {
        dispatch(window.G_VaultController.DeleteVaultRedux(vaultId));
    };

    res.VaultAuth = (vaultId: number, password: string) => {
        dispatch(window.G_VaultController.VaultAuthorizeRedux(vaultId, password));
    };
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component: