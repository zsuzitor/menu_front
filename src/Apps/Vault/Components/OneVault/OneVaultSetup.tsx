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
}

interface IOneVaultDispatchToProps {
    SetCurrentVaultId: (id: number) => void;
    LoadVaultSecrets: (vaultId: number) => void;
    LoadVault: (vaultId: number) => void;
    CreateSecret: (secret: IUpdateSecretEntity) => void;
    DeleteVault: (id: number) => void;

}

export interface IOneVaultProps extends IOneVaultStateToProps, IOneVaultOwnProps, IOneVaultDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IOneVaultOwnProps) => {
    let res = {} as IOneVaultStateToProps;
    res.Vault = state.VaultApp.CurrentVault;

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
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component: