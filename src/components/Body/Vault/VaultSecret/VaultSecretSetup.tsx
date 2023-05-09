import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Models/State/AppState';
import { OneVaultSecret } from '../../../../Models/Models/VaultApp/State/OneVaultSecret';
import { ChangeCurrentVaultIdActionCreator } from '../../../../Models/Actions/VaultApp/VaultActions';




interface IVaultSecretOwnProps {
    Secret?: OneVaultSecret;
}

interface IVaultSecretStateToProps {
}

interface IVaultSecretDispatchToProps {

}

export interface IVaultSecretProps extends IVaultSecretStateToProps, IVaultSecretOwnProps, IVaultSecretDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IVaultSecretOwnProps) => {
    let res = {} as IVaultSecretStateToProps;

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IVaultSecretOwnProps) => {
    let res = {} as IVaultSecretDispatchToProps;

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component: