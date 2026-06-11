import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ProjectUser } from '../../Models/Entity/State/ProjectUser';
import connectToStore, { IOneProjectOneProjectUserProps } from './OneProjectUserSetup';


require('./OneProjectUser.css');






const OneProjectUser = (props: IOneProjectOneProjectUserProps) => {

    const [userIsAdmin, setUserIsAdmin] = useState(props.User.IsAdmin);
    const [userIsDeactivated, setUserIsDeactivated] = useState(props.User.Deactivated);



    useEffect(() => {
        setUserIsAdmin(props.User.IsAdmin);
    }, [props.User.IsAdmin]);

    useEffect(() => {
        setUserIsDeactivated(props.User.Deactivated);
    }, [props.User.Deactivated]);


    const changeUser = () => {

        let newUserData = new ProjectUser();
        newUserData.MainAppUserId = props.User.MainAppUserId;
        newUserData.IsAdmin = userIsAdmin;
        newUserData.Deactivated = userIsDeactivated;

        props.ChangeUser(newUserData, props.CurrentProjectId);
    };


    let userHasChanges =
        userIsAdmin !== props.User.IsAdmin ||
        userIsDeactivated !== props.User.Deactivated;


    return <div className='one-project-user-content'>
        <label>Имя</label>
        <label>{props.User.Name}</label>
        <label>Роль Админа</label>
        <input type="checkbox" checked={userIsAdmin} onChange={e => setUserIsAdmin(e.target.checked)} />
        <label>Пользователь деактивирован</label>
        <input type="checkbox" checked={userIsDeactivated} onChange={e => setUserIsDeactivated(e.target.checked)} />

        {userHasChanges ? <div className='one-project-user-buttons'>
            <div className='project-user-action-btn' onClick={() => changeUser()}>
                <img className='persent-100-width-height' src={G_PathToBaseImages + 'save-icon.png'} alt="Save" title='сохранить' />
            </div>
            <div className='project-user-action-btn' onClick={() => {
                setUserIsAdmin(props.User.IsAdmin);
                setUserIsDeactivated(props.User.Deactivated);
            }}>
                <img className='persent-100-width-height' src={G_PathToBaseImages + 'cancel.png'} alt="Cancel" title='отменить изменения' />
            </div>
            {/* <div className='project-user-action-btn' onClick={() => deleteUser()}>
                <img className='persent-100-width-height' src={G_PathToBaseImages + 'delete-icon.png'} alt="Delete" title='удалить задачу' />
            </div> */}
        </div> : <></>}

    </div>

}




// and that function returns the connected, wrapper component:
export default connectToStore(OneProjectUser);


