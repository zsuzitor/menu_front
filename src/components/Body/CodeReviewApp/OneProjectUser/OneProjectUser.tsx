import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { AlertData } from '../../../../Models/Models/AlertData';
import { ProjectUser } from '../../../../Models/Models/CodeReviewApp/State/ProjectUser';
import { AppState } from '../../../../Models/Models/State/AppState';


require('./OneProjectUser.css');



interface IOneProjectOneProjectUserOwnProps {
    User: ProjectUser;

}


interface IOneProjectOneProjectUserStateToProps {
}

interface IOneProjectOneProjectUserDispatchToProps {
    ChangeUser: (user: ProjectUser) => void;
}

interface IOneProjectOneProjectUserProps extends IOneProjectOneProjectUserStateToProps, IOneProjectOneProjectUserOwnProps, IOneProjectOneProjectUserDispatchToProps {
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
            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultError("Введите имя пользователя");
            window.G_AddAbsoluteAlertToState(alert);
            return;
        }

        let newUserData = new ProjectUser();
        newUserData.Id = props.User.Id;
        newUserData.Name = userName;
        newUserData.Email = userEmail;
        newUserData.IsAdmin = userIsAdmin;
        newUserData.Deactivated = userIsDeactivated;
       
        props.ChangeUser(newUserData);
    };


    let userHasChanges = userName !== props.User.Name ||
        ((props.User.Email || userEmail) && userEmail !== props.User.Email) ||
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
                setUserEmail(props.User.Email || '');
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




const mapStateToProps = (state: AppState, ownProps: IOneProjectOneProjectUserOwnProps) => {
    let res = {} as IOneProjectOneProjectUserStateToProps;

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IOneProjectOneProjectUserOwnProps) => {
    let res = {} as IOneProjectOneProjectUserDispatchToProps;
    res.ChangeUser = (user) => { dispatch(window.G_CodeReviewUserController.ChangeProjectUserRedux(user)) };
    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(OneProjectUser);


