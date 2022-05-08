import React, { useState, useEffect } from 'react';
import { BoolResultBack } from '../../../_ComponentsLink/BackModel/BoolResultBack';
import { IOneProjectInListDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IOneProjectInListDataBack';
import { IProjectUserDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IProjectUserDataBack';
import { MainErrorObjectBack } from '../../../_ComponentsLink/BackModel/ErrorBack';


// require('./OneProjectInList.css');


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
        if(!userName){
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

        window.G_CodeReviewController.ChangeProjectUser(newUserData, changeUser);
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

        window.G_CodeReviewController.DeleteProjectUser(props.User.Id, deleteUser);
    }


    return <div>
        <input type='text' value={userName} placeholder="Имя" onChange={e => setUserName(e.target.value)}></input>
        <input type='text' value={userEmail} placeholder="Почта" onChange={e => setUserEmail(e.target.value)}></input>
        <button onClick={() => changeUser()}>Сохранить</button>
        <button onClick={() => {
            setUserName(props.User.Name);
            setUserEmail(props.User.Email);
        }}>Отменить</button>
        <button onClick={() => deleteUser()}>Удалить</button>
    </div>

}




export default OneProjectUser;