import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { ChangeCurrentVaultIdActionCreator } from '../../Models/Actions/VaultActions';
import { OneVault } from '../../Models/Entity/State/OneVault';
import { UpdateVaultEntity } from '../../Models/Entity/UpdateVaultEntity';
import { IUpdateSecretEntity } from '../../Models/Entity/UpdateSecretEntity';




interface ICreateSecretOwnProps {
    VaultId: number;
}

interface ICreateSecretStateToProps {
    VaultIsAuthorized: boolean;
}

interface ICreateSecretDispatchToProps {
    CreateSecret: (secret: IUpdateSecretEntity) => void;

}

export interface ICreateSecretProps extends ICreateSecretStateToProps, ICreateSecretOwnProps, ICreateSecretDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: ICreateSecretOwnProps) => {
    let res = {} as ICreateSecretStateToProps;
    res.VaultIsAuthorized = state.VaultApp.CurrentVault?.IsAuthorized ?? false;

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: ICreateSecretOwnProps) => {
    let res = {} as ICreateSecretDispatchToProps;
    res.CreateSecret = (secret) => {
        dispatch(window.G_VaultController.CreateSecretRedux(secret));
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component: