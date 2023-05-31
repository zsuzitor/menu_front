import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { ChangeCurrentVaultIdActionCreator } from '../../Models/Actions/VaultActions';
import { OneVault } from '../../Models/Entity/State/OneVault';
import { UpdateVaultEntity } from '../../Models/Entity/UpdateVaultEntity';




interface ICreateVaultOwnProps {
    Vault?: OneVault;

    WasCreated: () => void;
}

interface ICreateVaultStateToProps {
}

interface ICreateVaultDispatchToProps {
    LoadVaultPeople: (vaultId: number) => void;
    CreateVault: (vault: UpdateVaultEntity, successCallBack?: () => void) => void;
    UpdateVault: (vault: UpdateVaultEntity, successCallBack?: () => void) => void;
    UpdateVaultPassword: (vaultId: number, password: string) => void;
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
    res.CreateVault = (vault, successCallBack) => {
        dispatch(window.G_VaultController.CreateVaultRedux(vault, successCallBack));
    };
    res.UpdateVault = (vault, successCallBack) => {
        dispatch(window.G_VaultController.UpdateVaultRedux(vault, successCallBack));
    };

    res.UpdateVaultPassword = (vaultId, pwd) => {
        dispatch(window.G_VaultController.UpdateVaultPasswordRedux(vaultId, pwd));
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component: