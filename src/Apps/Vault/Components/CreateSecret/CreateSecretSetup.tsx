import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { ChangeCurrentVaultIdActionCreator } from '../../Models/Actions/VaultActions';
import { OneVault } from '../../Models/Entity/State/OneVault';
import { UpdateVaultEntity } from '../../Models/Entity/UpdateVaultEntity';




interface ICreateSecretOwnProps {
}

interface ICreateSecretStateToProps {
}

interface ICreateSecretDispatchToProps {
    
}

export interface ICreateSecretProps extends ICreateSecretStateToProps, ICreateSecretOwnProps, ICreateSecretDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: ICreateSecretOwnProps) => {
    let res = {} as ICreateSecretStateToProps;

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: ICreateSecretOwnProps) => {
    let res = {} as ICreateSecretDispatchToProps;
    

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component: