import { connect } from 'react-redux';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { SetCurrentProjectIdActionCreator } from '../../Models/Actions/ProjectActions';
import { OneProjectInList as OneProjectInListModel } from '../../Models/Entity/State/OneProjectInList';



export interface IOneProjectInListOwnProps {
    CurrentProject: boolean;
    Project: OneProjectInListModel;

}

interface IOneProjectInListStateToProps {
    // CurrentProjectId: number;
}

interface IOneProjectInListDispatchToProps {
    SetCurrentProject: (projectId: number) => void;

}


export interface IOneProjectInListProps extends IOneProjectInListStateToProps, IOneProjectInListOwnProps, IOneProjectInListDispatchToProps {
}




const mapStateToProps = (state: AppState, ownProps: IOneProjectInListOwnProps) => {
    let res = {} as IOneProjectInListStateToProps;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IOneProjectInListOwnProps) => {
    let res = {} as IOneProjectInListDispatchToProps;
    res.SetCurrentProject = (projectId: number) => {
        dispatch(SetCurrentProjectIdActionCreator(projectId));
    };
    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);