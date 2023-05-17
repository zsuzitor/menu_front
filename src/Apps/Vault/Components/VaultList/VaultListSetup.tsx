import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { OneVaultInList } from '../../Models/Entity/State/OneVaultInList';




interface IVaultListOwnProps {
}

interface IVaultListStateToProps {
    Vaults: OneVaultInList[];
}

interface IVaultListDispatchToProps {
    LoadMyVaults: () => void;

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
    res.LoadMyVaults = () => {
        // dispatch(SetVaultsListActionCreator());
        dispatch(window.G_VaultController.GetVaultsRedux());
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component: