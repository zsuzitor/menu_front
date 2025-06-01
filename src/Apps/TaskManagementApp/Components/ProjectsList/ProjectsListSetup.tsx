import { connect } from "react-redux";
import { AppState } from "../../../../Models/Entity/State/AppState";
import { OneProjectInList as OneProjectInListModel } from '../../Models/Entity/State/OneProjectInList';

export interface IProjectsListOwnProps {
    Projects: OneProjectInListModel[];
    CurrentProjectId: number;
}

interface IProjectsListStateToProps {
}

interface IProjectsListDispatchToProps {
    AddNewProject: (projectName: string) => void;

}


export interface IProjectsListProps extends IProjectsListStateToProps, IProjectsListOwnProps, IProjectsListDispatchToProps {
}



const mapStateToProps = (state: AppState, ownProps: IProjectsListOwnProps) => {
    let res = {} as IProjectsListStateToProps;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IProjectsListOwnProps) => {
    let res = {} as IProjectsListDispatchToProps;
    res.AddNewProject = (projectName: string) => {
        dispatch(window.G_CodeReviewProjectController.CreateNewProjectRedux(projectName));
    };

    return res;
};


export default connect(mapStateToProps, mapDispatchToProps);