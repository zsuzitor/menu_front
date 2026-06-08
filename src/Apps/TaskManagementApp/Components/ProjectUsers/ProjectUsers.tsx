

import { cloneDeep } from 'lodash';
import React, { useState, useEffect } from 'react';
import OneProjectUser from '../OneProjectUser/OneProjectUser';

import connectToStore, { IProjectUsersProps } from './ProjectUsersSetup';


require('./ProjectUsers.css');




const ProjectUsers = (props: IProjectUsersProps) => {


    const [userMainAppEmail, setUserMainAppEmail] = useState('');
    const [hideDeactivated, setHideDeactivated] = useState(true);

    const addNewUser = () => {

        props.AddUserToProject( userMainAppEmail, props.ProjectId);
    };

    return <div className={'project-management-user-list'}>
        <br />
        <span>Почта из основного приложения</span>
        <input className='form-control-b' type='text' value={userMainAppEmail} placeholder="Почта  из основного приложения" onChange={e => setUserMainAppEmail(e.target.value)}></input>
        <br />
        <button className='btn-b btn-border add-new-management-user-btn' onClick={() => addNewUser()}>Добавить человека</button>
        <br />
        <label>Скрывать неактивных пользователей</label>
        <input type="checkbox" checked={hideDeactivated} onChange={e => setHideDeactivated(e.target.checked)} />
        {props.ProjectUsers.filter(x => !hideDeactivated || !x.Deactivated)
            .map(x => {
                return <OneProjectUser User={x}
                    key={x.MainAppUserId} ></OneProjectUser>
            })}
    </div>
}








// and that function returns the connected, wrapper component:
export default connectToStore(ProjectUsers);