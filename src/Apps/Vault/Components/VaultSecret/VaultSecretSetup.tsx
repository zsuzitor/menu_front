import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { OneVaultSecret } from '../../Models/Entity/State/OneVaultSecret';
import { IUpdateSecretEntity } from '../../Models/Entity/UpdateSecretEntity';
import { SetSingleSecretActionCreator } from '../../Models/Actions/VaultActions';




interface IVaultSecretOwnProps {
    Secret?: OneVaultSecret;
}

interface IVaultSecretStateToProps {
    SingleSecret?: OneVaultSecret;
    VaultIsAuthorized: boolean;

}

interface IVaultSecretDispatchToProps {
    DeleteSecret: (secretId: number, vaultId: number) => void;
    UpdateSecret: (secret: IUpdateSecretEntity) => void;
    GetSingleSecret: (id: number) => void;
    ClearSingleSecret: () => void;
}

export interface IVaultSecretProps extends IVaultSecretStateToProps, IVaultSecretOwnProps, IVaultSecretDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IVaultSecretOwnProps) => {
    let res = {} as IVaultSecretStateToProps;
    res.SingleSecret = state.VaultApp.OpenedSecret;
    res.VaultIsAuthorized = state.VaultApp.CurrentVault?.IsAuthorized ?? false;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IVaultSecretOwnProps) => {
    let res = {} as IVaultSecretDispatchToProps;
    res.DeleteSecret = (secretId, vaultId) => {
        dispatch(window.G_VaultController.DeleteSecretRedux(secretId, vaultId));
    };
    res.UpdateSecret = (secret) => {
        dispatch(window.G_VaultController.UpdateSecretRedux(secret));
    };

    res.GetSingleSecret = (id) => {
        dispatch(window.G_VaultController.GetSingleSecretRedux(id));
    };

    res.ClearSingleSecret = () => {
        dispatch(SetSingleSecretActionCreator(null));
    };


    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component: