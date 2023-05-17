

import { cloneDeep } from 'lodash';
import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Entity/State/AppState';
import OneProjectUser from '../OneProjectUser/OneProjectUser';

import { connect } from "react-redux";
import { ProjectUser } from '../../Models/Entity/State/ProjectUser';


require('./ProjectUsers.css');




interface IProjectUsersOwnProps {
}


interface IProjectUsersStateToProps {
    ProjectId: number;
    ProjectUsers: ProjectUser[];
}

interface IProjectUsersDispatchToProps {
    AddUserToProject: (newUserName: string, userMainAppEmail: string, projectId: number) => void;
}

interface IProjectUsersProps extends IProjectUsersStateToProps, IProjectUsersOwnProps, IProjectUsersDispatchToProps {
}



const ProjectUsers = (props: IProjectUsersProps) => {


    const [newUserName, setNewUserName] = useState('');
    const [userMainAppEmail, setUserMainAppEmail] = useState('');
    const [hideDeactivated, setHideDeactivated] = useState(true);

    const addNewUser = () => {
        if (!newUserName) {
            return;
        }

        props.AddUserToProject(newUserName, userMainAppEmail, props.ProjectId);
        // window.G_CodeReviewUserController.AddUserToProjectRedux(newUserName, userMainAppEmail, props.ProjectId);
        setNewUserName('');
    };

    return <div className={'project-review-user-list'}>
        <span>Имя человека</span>
        <input className='form-control-b' type='text' placeholder='Имя человека'
            onChange={(e) => setNewUserName(e.target.value)} value={newUserName}></input>
        <br />
        <span>Почта из основного приложения</span>
        <input className='form-control-b' type='text' value={userMainAppEmail} placeholder="Почта  из основного приложения" onChange={e => setUserMainAppEmail(e.target.value)}></input>
        <br />
        <button className='btn-b btn-border add-new-review-person-btn' onClick={() => addNewUser()}>Добавить человека</button>
        <br />
        <label>Скрывать неактивных пользователей</label>
        <input type="checkbox" checked={hideDeactivated} onChange={e => setHideDeactivated(e.target.checked)} />
        {props.ProjectUsers.filter(x => !hideDeactivated || !x.Deactivated)
            .map(x => {
                return <OneProjectUser User={x}
                    key={x.Id} ></OneProjectUser>
            })}
    </div>
}








const mapStateToProps = (state: AppState, ownProps: IProjectUsersOwnProps) => {
    let res = {} as IProjectUsersStateToProps;
    res.ProjectId = state.CodeReviewApp.CurrentProjectId;
    res.ProjectUsers = state.CodeReviewApp.CurrentProjectUsers;
    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IProjectUsersOwnProps) => {
    let res = {} as IProjectUsersDispatchToProps;
    res.AddUserToProject = (newUserName: string, userMainAppEmail: string, projectId: number) => {
        dispatch(window.G_CodeReviewUserController.AddUserToProjectRedux(newUserName, userMainAppEmail, projectId))
    };
    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(ProjectUsers);