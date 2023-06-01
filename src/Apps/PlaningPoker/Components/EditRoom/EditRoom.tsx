import React, { useState, useEffect } from 'react';
import { BoolResultBack } from '../../../../Models/BackModel/BoolResultBack';
import { MainErrorObjectBack } from '../../../../Models/BackModel/ErrorBack';
import { AlertData } from '../../../../Models/Entity/AlertData';
import { RoomStatus } from '../../Models/Entity/State/RoomInfo';
import connectToStore, { EditRoomProps, SettingsPage } from './EditRoomSetup';


require('./EditRoom.css');

const EditRoom = (props: EditRoomProps) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const stringCards = props.Cards.join(';');
    const [cards, setCards] = useState(stringCards);
    const [showSection, setShowSection] = useState(SettingsPage.Info);


    useEffect(() => {
        setCards(stringCards);
    }, [stringCards]);


    const changePassword = () => {
        if (newPassword !== newPasswordConfirm) {
            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultError("Пароли не совпадают");
            window.G_AddAbsoluteAlertToState(alert);
            return;
        }

        // props.ChangeRoomPassword(props.RoomName, props.UserInfo.UserConnectionId, oldPassword, newPasswordConfirm);
        window.G_PlaningPokerController.ChangeRoomPassword(props.RoomName
            , props.UserInfo.UserConnectionId, oldPassword, newPassword, (error: MainErrorObjectBack, data: BoolResultBack) => {
                if (data?.result) {
                    let alertFactory = new AlertData();
                    let alert = alertFactory.GetDefaultNotify("Пароль изменен");
                    window.G_AddAbsoluteAlertToState(alert);
                }
                else {
                    let alertFactory = new AlertData();
                    let alert = alertFactory.GetDefaultError("Что то пошло не так, попробуйте позже");
                    window.G_AddAbsoluteAlertToState(alert);
                }
            })
    }

    const changeCards = () => {
        if (props.RoomStatus != RoomStatus.CloseVote) {
            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultError("Необходимо закрыть текущее голосование");
            window.G_AddAbsoluteAlertToState(alert);
            return;
        }

        props.MyHubConnection.send(G_PlaningPokerController.EndPoints.EndpointsBack.SetRoomCards, props.RoomName, cards);

    }

    const setLineCards = () => {
        let arr = Array.from(Array(99).keys());
        setCards('tea;' + arr.join(';'));
    }

    const fibonacciCards = () => {
        let calc = (start: number, end: number): number[] => {
            let arr: number[] = [];
            if (start < 0) {
                return arr;
            }

            for (let i = start; i < end; ++i) {
                if (i == 0) {
                    arr[i] = 0;
                    continue;
                }

                if (i == 1) {
                    arr[i] = 1;
                    continue;
                }

                arr[i] = arr[i - 2] + arr[i - 1];
            }

            return arr;
        }

        setCards('tea;' + calc(0, 15).filter((v, i, a) => a.indexOf(v) === i).join(';'));
    }


    const loadImage = () => {
        var img = ($('#main_image_input')[0] as HTMLInputElement).files[0];
        if (!img) {
            alert('Выберите изображение');
            return;
        }

        updateImage(img);
    }

    const removeImage = () => {
        updateImage(null);
    }

    const updateImage = (img: File) => {
        props.UpdateRoomImage(props.RoomName, img);
    }




    let sectionContent = <></>
    if (showSection === SettingsPage.Info) {
        sectionContent = <>
            <label>Изображение группы</label>
            <input className='form-control'
                type='file' id='main_image_input'
            ></input>
            <button type="button" className='btn btn-b-light'
                onClick={() => loadImage()}>Загрузить</button>
            <button type="button" className='btn btn-b-light'
                onClick={() => removeImage()}>Удалить</button>
        </>
    }
    if (showSection === SettingsPage.Password) {
        sectionContent = <>
            <label>Старый пароль</label>
            <input type='password' className='persent-100-width form-control'
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder='Старый пароль' value={oldPassword}></input>
            <label>Новый пароль</label>
            <input type='password' className='persent-100-width form-control'
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='Новый пароль' value={newPassword}></input>
            <label>Подтвердите новый пароль</label>
            <input type='password' className='persent-100-width form-control'
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                placeholder='Новый пароль' value={newPasswordConfirm}></input>
            <button className='btn btn-b-light' onClick={() => changePassword()}>Изменить пароль</button></>
    }
    else if (showSection === SettingsPage.Marks) {
        sectionContent = <>
            <label>Оценки через ;</label>
            <input type='text' className='persent-100-width form-control'
                onChange={(e) => setCards(e.target.value)}
                placeholder='Оценки' value={cards}></input>
            <button className='btn btn-b-light' onClick={() => setLineCards()}>Линейная 0-100</button>
            <button className='btn btn-b-light' onClick={() => fibonacciCards()}>Фибоначи</button>
            <button className='btn btn-b-light' onClick={() => changeCards()}>Сохранить изменения</button></>
    }

    return <div>
        <div className='edit-room-sections-block'>
            <div onClick={() => setShowSection(SettingsPage.Info)}>Инфо</div>
            <div onClick={() => setShowSection(SettingsPage.Password)}>Пароль</div>
            <div onClick={() => setShowSection(SettingsPage.Marks)}>Оценки</div>
        </div>
        <hr></hr>
        {sectionContent}

    </div>
}





// and that function returns the connected, wrapper component:
export default connectToStore(EditRoom);
