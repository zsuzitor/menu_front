import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Models/State/AppState';
import { ChangeCurrentVaultIdActionCreator } from '../../../../Models/Actions/VaultApp/VaultActions';
import { OneVault } from '../../../../Models/Models/VaultApp/State/OneVault';
import { UpdateVaultEntity } from '../../../../Models/Models/VaultApp/Entity/UpdateVaultEntity';




interface ICreateVaultOwnProps {
    Vault?: OneVault;
}

interface ICreateVaultStateToProps {
}

interface ICreateVaultDispatchToProps {
    LoadVaultPeople: (vaultId: number) => void;
    CreateVault: (vault: UpdateVaultEntity) => void;
    UpdateVault: (vault: UpdateVaultEntity) => void;
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
    res.CreateVault = (vault) => {
        dispatch(window.G_VaultController.CreateVaultRedux(vault));
    };
    res.UpdateVault = (vault) => {
        dispatch(window.G_VaultController.UpdateVaultRedux(vault));
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component: