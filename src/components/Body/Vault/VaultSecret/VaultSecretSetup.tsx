import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Models/State/AppState';
import { OneVaultSecret } from '../../../../Models/Models/VaultApp/State/OneVaultSecret';
import { ChangeCurrentVaultIdActionCreator } from '../../../../Models/Actions/VaultApp/VaultActions';




interface IVaultSecretOwnProps {
    Secret?: OneVaultSecret;
}

interface IVaultSecretStateToProps {
    SingleSecret?: OneVaultSecret;
}

interface IVaultSecretDispatchToProps {
    DeleteSecret: (secretId: number, vaultId: number) => void;
    UpdateSecret: (id: number) => void;
    GetSingleSecret: (id: number) => void;
}

export interface IVaultSecretProps extends IVaultSecretStateToProps, IVaultSecretOwnProps, IVaultSecretDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IVaultSecretOwnProps) => {
    let res = {} as IVaultSecretStateToProps;
    res.SingleSecret = state.VaultApp.OpenedSecret;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IVaultSecretOwnProps) => {
    let res = {} as IVaultSecretDispatchToProps;
    res.DeleteSecret = (secretId, vaultId) => {
        dispatch(window.G_VaultController.DeleteSecretRedux(secretId, vaultId));
    };
    res.UpdateSecret = (id) => {
        dispatch(window.G_VaultController.UpdateSecretRedux(id));
    };

    res.GetSingleSecret = (id) => {
        dispatch(window.G_VaultController.GetSingleSecretRedux(id));
    }

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component: