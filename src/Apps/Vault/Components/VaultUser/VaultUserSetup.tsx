import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { ChangeCurrentVaultIdActionCreator } from '../../Models/Actions/VaultActions';
import { VaultUser } from '../../Models/Entity/State/VaultUser';




interface IVaultUserOwnProps {
    User?: VaultUser;
    MarkedAsDeleted: boolean;
    Delete: (userId: number) => void;
    RedoDelete: (userId: number) => void;
}

interface IVaultUserStateToProps {
}

interface IVaultUserDispatchToProps {

}

export interface IVaultUserProps extends IVaultUserStateToProps, IVaultUserOwnProps, IVaultUserDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IVaultUserOwnProps) => {
    let res = {} as IVaultUserStateToProps;

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IVaultUserOwnProps) => {
    let res = {} as IVaultUserDispatchToProps;

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component: