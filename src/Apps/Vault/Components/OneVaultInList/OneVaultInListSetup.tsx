import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { OneVaultInList } from '../../Models/Entity/State/OneVaultInList';




interface IOneVaultInListOwnProps {
    Vault: OneVaultInList;
}

interface IOneVaultInListStateToProps {
}

interface IOneVaultInListDispatchToProps {

}

export interface IOneVaultInListProps extends IOneVaultInListStateToProps, IOneVaultInListOwnProps, IOneVaultInListDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IOneVaultInListOwnProps) => {
    let res = {} as IOneVaultInListStateToProps;

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IOneVaultInListOwnProps) => {
    let res = {} as IOneVaultInListDispatchToProps;

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component: