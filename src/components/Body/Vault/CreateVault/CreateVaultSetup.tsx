import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Models/State/AppState';
import { ChangeCurrentVaultIdActionCreator } from '../../../../Models/Actions/VaultApp/VaultActions';




interface ICreateVaultOwnProps {
}

interface ICreateVaultStateToProps {
}

interface ICreateVaultDispatchToProps {

}

export interface ICreateVaultProps extends ICreateVaultStateToProps, ICreateVaultOwnProps, ICreateVaultDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: ICreateVaultOwnProps) => {
    let res = {} as ICreateVaultStateToProps;

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: ICreateVaultOwnProps) => {
    let res = {} as ICreateVaultDispatchToProps;
    
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component: