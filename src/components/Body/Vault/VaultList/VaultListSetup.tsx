import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Models/State/AppState';
import { OneVault } from '../../../../Models/Models/VaultApp/State/OneVault';




interface IVaultListOwnProps {
}

interface IVaultListStateToProps {
    Vaults: OneVault[];
}

interface IVaultListDispatchToProps {

}

export interface IVaultListProps extends IVaultListStateToProps, IVaultListOwnProps, IVaultListDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IVaultListOwnProps) => {
    let res = {} as IVaultListStateToProps;
    // console.log(state.VaultApp.VaultList);
    res.Vaults = [...state.VaultApp.VaultList];

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IVaultListOwnProps) => {
    let res = {} as IVaultListDispatchToProps;

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component: