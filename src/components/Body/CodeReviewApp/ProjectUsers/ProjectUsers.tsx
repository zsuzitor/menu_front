

import { cloneDeep } from 'lodash';
import React, { useState, useEffect } from 'react';
import { IProjectUserDataBack } from '../../../../Models/BackModel/CodeReviewApp/IProjectUserDataBack';
import { MainErrorObjectBack } from '../../../../Models/BackModel/ErrorBack';
import OneProjectUser from '../OneProjectUser/OneProjectUser';


require('./ProjectUsers.css');


export interface IProjectUsersProps {
    ProjectId: number;
    AddUserToProject: (user: IProjectUserDataBack) => void;
    ProjectUsers: IProjectUserDataBack[];

    ChangeUser: (user: IProjectUserDataBack) => void;
    DeleteUser: (id: number) => void;

}



const ProjectUsers = (props: IProjectUsersProps) => {


    const [newUserName, setNewUserName] = useState('');
    const [userMainAppEmail, setUserMainAppEmail] = useState('');

    const addNewUser = () => {
        if (!newUserName) {
            return;
        }

        let addUser = (error: MainErrorObjectBack, data: IProjectUserDataBack) => {
            if (error) {
                return;
            }

            if (data) {
                props.AddUserToProject(data);
            }
        };

        window.G_CodeReviewUserController.AddUserToProject(newUserName, userMainAppEmail, props.ProjectId, addUser);
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
        {props.ProjectUsers.map(x => {
            return <OneProjectUser User={x}
                key={x.Id} ChangeUser={props.ChangeUser}
                DeleteUser={props.DeleteUser}></OneProjectUser>
        })}
    </div>
}




export default ProjectUsers;