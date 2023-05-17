import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { ChangeCurrentVaultIdActionCreator, SetVaultsListActionCreator } from '../../Models/Actions/VaultActions';




interface IVaultMainOwnProps {
}

interface IVaultMainStateToProps {
    VaultId: number;
}

interface IVaultMainDispatchToProps {
    // LoadMyPaste: () => void;
    // LoadPasteByKey: (key: string) => void;
    // CreatePaste: (key: string) => void;
    // CreateUpdate: (key: string) => void;
    // CreateDelete: (key: string) => void;
    // SetCurrentVaultId: (id: number) => void;
    // LoadMyVaults: () => void;
}

export interface IVaultMainProps extends IVaultMainStateToProps, IVaultMainOwnProps, IVaultMainDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IVaultMainOwnProps) => {
    let res = {} as IVaultMainStateToProps;
    res.VaultId = state.VaultApp.CurrentVaultId;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IVaultMainOwnProps) => {
    let res = {} as IVaultMainDispatchToProps;
    // res.LoadMyPaste = () => {
    //     // dispatch(window.G_VaultController.GetUsersIsRoomRedux(roomname, userConnectionId));
    //  };

    // res.SetCurrentVaultId = (id: number) => {
    //     dispatch(ChangeCurrentVaultIdActionCreator({ Id: id }));
    // };

    // res.LoadMyVaults = () => {
    //     // dispatch(SetVaultsListActionCreator());
    //     dispatch(window.G_VaultController.GetVaultsRedux());
    // };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component: