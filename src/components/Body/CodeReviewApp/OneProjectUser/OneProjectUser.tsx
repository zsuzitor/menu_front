import React, { useState, useEffect } from 'react';
import { BoolResultBack } from '../../../../Models/BackModel/BoolResultBack';
import { IProjectUserDataBack } from '../../../../Models/BackModel/CodeReviewApp/IProjectUserDataBack';
import { MainErrorObjectBack } from '../../../../Models/BackModel/ErrorBack';


require('./OneProjectUser.css');


export interface IOneProjectOneProjectUserProps {
    User: IProjectUserDataBack;
    ChangeUser: (user: IProjectUserDataBack) => void;
    DeleteUser: (id: number) => void;
}



const OneProjectUser = (props: IOneProjectOneProjectUserProps) => {

    const [userName, setUserName] = useState(props.User.Name);
    const [userEmail, setUserEmail] = useState(props.User.Email || '');
    const [userIsAdmin, setUserIsAdmin] = useState(props.User.IsAdmin);
    const [userIsDeactivated, setUserIsDeactivated] = useState(props.User.Deactivated);



    useEffect(() => {
        setUserName(props.User.Name);
    }, [props.User.Name]);

    useEffect(() => {
        setUserEmail(props.User.Email || '');
    }, [props.User.Email]);

    useEffect(() => {
        setUserIsAdmin(props.User.IsAdmin);
    }, [props.User.IsAdmin]);

    useEffect(() => {
        setUserIsDeactivated(props.User.Deactivated);
    }, [props.User.Deactivated]);


    const changeUser = () => {
        if (!userName) {
            alert('Введите имя пользователя');
            return;
        }

        let newUserData = {
            Id: props.User.Id, Name: userName
            , Email: userEmail, IsAdmin: userIsAdmin, Deactivated: userIsDeactivated
        }

        let changeUser = (error: MainErrorObjectBack, data: BoolResultBack) => {
            if (error) {
                return;
            }

            if (data?.result) {

                props.ChangeUser(newUserData);
            }
        };

        window.G_CodeReviewUserController.ChangeProjectUser(newUserData, changeUser);
    };


    // const deleteUser = () => {

    //     let deleteUser = (error: MainErrorObjectBack, data: BoolResultBack) => {
    //         if (error) {
    //             return;
    //         }

    //         if (data?.result) {

    //             props.DeleteUser(props.User.Id);
    //         }
    //     };

    //     window.G_CodeReviewUserController.DeleteProjectUser(props.User.Id, deleteUser);
    // }


    let userHasChanges = userName !== props.User.Name ||
        userEmail !== props.User.Email ||
        userIsAdmin !== props.User.IsAdmin ||
        userIsDeactivated !== props.User.Deactivated;


    return <div className='one-project-user-content'>
        <label>Имя</label>
        <input className='form-control-b' type='text' value={userName} placeholder="Имя" onChange={e => setUserName(e.target.value)}></input>
        <br />
        <label>Почта для уведомлений</label>
        <input className='form-control-b' type='text' value={userEmail} placeholder="Почта" onChange={e => setUserEmail(e.target.value)}></input>
        <label>Роль Админа</label>
        <input type="checkbox" checked={userIsAdmin} onChange={e => setUserIsAdmin(e.target.checked)} />
        <label>Пользователь деактивирован</label>
        <input type="checkbox" checked={userIsDeactivated} onChange={e => setUserIsDeactivated(e.target.checked)} />

        {userHasChanges ? <div className='one-project-user-buttons'>
            <div className='project-user-action-btn' onClick={() => changeUser()}>
                <img className='persent-100-width-height' src={G_PathToBaseImages + 'save-icon.png'} alt="Save" title='сохранить' />
            </div>
            <div className='project-user-action-btn' onClick={() => {
                setUserName(props.User.Name);
                setUserEmail(props.User.Email);
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




export default OneProjectUser;