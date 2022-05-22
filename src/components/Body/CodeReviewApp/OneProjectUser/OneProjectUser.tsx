import React, { useState, useEffect } from 'react';
import { BoolResultBack } from '../../../_ComponentsLink/BackModel/BoolResultBack';
import { IOneProjectInListDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IOneProjectInListDataBack';
import { IProjectUserDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IProjectUserDataBack';
import { MainErrorObjectBack } from '../../../_ComponentsLink/BackModel/ErrorBack';


require('./OneProjectUser.css');


export interface IOneProjectOneProjectUserProps {
    User: IProjectUserDataBack;
    ChangeUser: (user: IProjectUserDataBack) => void;
    DeleteUser: (id: number) => void;
}



const OneProjectUser = (props: IOneProjectOneProjectUserProps) => {

    const [userName, setUserName] = useState(props.User.Name);
    const [userEmail, setUserEmail] = useState(props.User.Email || '');


    useEffect(() => {
        setUserName(props.User.Name);
    }, [props.User.Name]);

    useEffect(() => {
        setUserEmail(props.User.Email || '');
    }, [props.User.Email]);


    const changeUser = () => {
        if (!userName) {
            alert('Введите имя пользователя');
            return;
        }

        let newUserData = { Id: props.User.Id, Name: userName, Email: userEmail }

        let changeUser = (error: MainErrorObjectBack, data: BoolResultBack) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data?.result) {

                props.ChangeUser(newUserData);
            }
        };

        window.G_CodeReviewUserController.ChangeProjectUser(newUserData, changeUser);
    };


    const deleteUser = () => {

        let deleteUser = (error: MainErrorObjectBack, data: BoolResultBack) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data?.result) {

                props.DeleteUser(props.User.Id);
            }
        };

        window.G_CodeReviewUserController.DeleteProjectUser(props.User.Id, deleteUser);
    }


    return <div className='one-project-user-content'>
        <span>Имя</span>
        <input className='form-control-b' type='text' value={userName} placeholder="Имя" onChange={e => setUserName(e.target.value)}></input>
        <br />
        <span>Почта для уведомлений</span>
        <input className='form-control-b' type='text' value={userEmail} placeholder="Почта" onChange={e => setUserEmail(e.target.value)}></input>
        

        <div className='one-project-user-buttons'>
            <div className='project-user-save-button' onClick={() => changeUser()}>
                <img className='persent-100-width-height' src={G_PathToBaseImages + 'save-icon.png'} alt="Save" title='сохранить' />
            </div>
            <div className='project-user-cancel-button' onClick={() => {
                setUserName(props.User.Name);
                setUserEmail(props.User.Email);
            }}>
                <img className='persent-100-width-height' src={G_PathToBaseImages + 'cancel.png'} alt="Cancel" title='отменить изменения' />
            </div>
            <div className='project-user-delete-button' onClick={() => deleteUser()}>
                <img className='persent-100-width-height' src={G_PathToBaseImages + 'delete-icon.png'} alt="Delete" title='удалить задачу' />
            </div>
        </div>
    </div>

}




export default OneProjectUser;