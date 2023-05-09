import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Models/State/AppState';
import { OneVault } from '../../../../Models/Models/VaultApp/State/OneVault';
import { ChangeCurrentVaultIdActionCreator } from '../../../../Models/Actions/VaultApp/VaultActions';




interface IOneVaultOwnProps {
    VaultId: number;
}

interface IOneVaultStateToProps {
    Vaults: OneVault[];
}

interface IOneVaultDispatchToProps {
    SetCurrentVaultId: (id: number) => void;
    LoadVaultSecrets: (vaultId: number) => void;

}

export interface IOneVaultProps extends IOneVaultStateToProps, IOneVaultOwnProps, IOneVaultDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IOneVaultOwnProps) => {
    let res = {} as IOneVaultStateToProps;
    res.Vaults = state.VaultApp.VaultList;

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
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component: