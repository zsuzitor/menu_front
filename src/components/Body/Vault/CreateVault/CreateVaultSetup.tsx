import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Models/State/AppState';
import { ChangeCurrentVaultIdActionCreator } from '../../../../Models/Actions/VaultApp/VaultActions';
import { OneVault } from '../../../../Models/Models/VaultApp/State/OneVault';




interface ICreateVaultOwnProps {
    Vault?: OneVault;
}

interface ICreateVaultStateToProps {
}

interface ICreateVaultDispatchToProps {
    LoadVaultPeople: (vaultId: number) => void;
    CreateOrSaveVault: (vaultId: number) => void;
}

export interface ICreateVaultProps extends ICreateVaultStateToProps, ICreateVaultOwnProps, ICreateVaultDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: ICreateVaultOwnProps) => {
    let res = {} as ICreateVaultStateToProps;

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: ICreateVaultOwnProps) => {
    let res = {} as ICreateVaultDispatchToProps;
    res.LoadVaultPeople = (vaultId) => {
        dispatch(window.G_VaultController.LoadVaultPeopleRedux(vaultId));
    };
    res.CreateOrSaveVault = (vaultId) => {
        dispatch(window.G_VaultController.LoadVaultPeopleRedux(vaultId));
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component: