import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { SetCurrentProjectIdActionCreator } from '../../../../Models/Actions/CodeReviewApp/ProjectActions';
import { AppState } from '../../../../Models/Models/State/AppState';
import { OneProjectInList as OneProjectInListModel } from '../../../../Models/Models/CodeReviewApp/State/OneProjectInList';


require('./OneProjectInList.css');




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


interface IOneProjectInListProps extends IOneProjectInListStateToProps, IOneProjectInListOwnProps, IOneProjectInListDispatchToProps {
}


const OneProjectInList = (props: IOneProjectInListProps) => {
    let projectClassName = 'review-project';
    if (props.CurrentProject) {
        projectClassName += ' selected-review-project'
    }


    return <div key={props.Project.Id.toString()}
        className={projectClassName}
        onClick={() => {
            if (!props.CurrentProject) {
                props.SetCurrentProject(props.Project.Id)
            }
        }}>
        {props.Project.Name}

        {/* <div  title={props.Project.Name}>
        </div> */}
    </div>

}






const mapStateToProps = (state: AppState, ownProps: IOneProjectInListOwnProps) => {
    let res = {} as IOneProjectInListStateToProps;
    // res.CurrentProjectId = state.CodeReviewApp.CurrentProjectId;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IOneProjectInListOwnProps) => {
    let res = {} as IOneProjectInListDispatchToProps;
    res.SetCurrentProject = (projectId: number) => {
        dispatch(SetCurrentProjectIdActionCreator(projectId));
    };
    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(OneProjectInList);