import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Models/State/AppState';
import { ChangeCurrentVaultIdActionCreator } from '../../../../Models/Actions/VaultApp/VaultActions';
import { VaultUser } from '../../../../Models/Models/VaultApp/State/VaultUser';




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