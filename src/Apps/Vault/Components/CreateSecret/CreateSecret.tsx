import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { Link } from 'react-router-dom';
import ConnectToStore, { ICreateSecretProps } from './CreateSecretSetup';
import { Helper } from '../../../../Models/BL/Helper';
import { AlertData } from '../../../../Models/Entity/AlertData';
import { IUpdateSecretEntity } from '../../Models/Entity/UpdateSecretEntity';



require('./CreateSecret.css');
require('../VaultSecret/VaultSecret.css');




const CreateSecret = (props: ICreateSecretProps) => {
    const [secretKey, setSecretKey] = useState('');
    const [secretValue, setSecretValue] = useState('');
    const [secretDieDate, setSecretDieDate] = useState(null);
    const [secretIsCoded, setSecretIsCoded] = useState(false);
    const [secretIsPublic, setSecretIsPublic] = useState(false);


    useEffect(() => {

    }, []);

    const defaultDieDate = '3000-01-01';
    let helper = new Helper();


    function cancelChanges() {
        setSecretValue('');
        setSecretKey('');
        setSecretDieDate(null);
        setSecretIsCoded(false);
        setSecretIsPublic(false);
    }


    return <div className='vault-secret'>
        <div className='vault-secret-main'>
            <div className='vault-secret-key' title={secretKey}>
                <input type='text' className='form-control'
                    value={secretKey} onChange={(e) => setSecretKey(e.target.value)}></input>
            </div>
            <div className='vault-secret-val'>
                <textarea value={secretValue} className='form-control'
                    onChange={(e) => setSecretValue(e.target.value)}></textarea>
            </div>
            <div className='vault-secret-main-buttons'>
                <div className='but' title='Сохранить' onClick={() => {
                    if (!secretKey) {
                        G_AddAbsoluteAlertToState(
                            new AlertData().GetDefaultError("Ключ обязателен для заполнения"));
                        return;
                    }

                    if (!secretValue) {
                        G_AddAbsoluteAlertToState(
                            new AlertData().GetDefaultError("Значение обязательно для заполнения"));
                        return;
                    }

                    if (secretIsCoded && !props.VaultIsAuthorized) {
                        G_AddAbsoluteAlertToState(
                            new AlertData().GetDefaultError("Для работы с  зашифрованным secret необходимо авторизовать Vault"));
                        return;
                    }

                    let newData = {} as IUpdateSecretEntity;
                    newData.Key = secretKey;
                    newData.Value = secretValue;
                    newData.VaultId = props.VaultId;
                    newData.IsPublic = secretIsPublic;
                    newData.IsCoded = secretIsCoded;
                    newData.DieDate = secretDieDate || null;//</>new Date(defaultDieDate);
                    props.CreateSecret(newData);
                    cancelChanges();

                }}>
                    <img className='persent-100-width-height' src={"/images/" + 'save-icon.png'} />
                </div>
                <div className='but' title='Отменить изменения' onClick={() => {
                    cancelChanges();

                }}>
                    <img className='persent-100-width-height' src={"/images/" + 'cancel.png'} />
                </div>
            </div>
        </div>
        <div className='vault-secret-more'>
            <div className='more-data'>
                <label>Зашифровано</label>
                <input type='checkbox' checked={secretIsCoded}
                    onChange={() => setSecretIsCoded(!secretIsCoded)}></input>
                <label>Публичный</label>
                <input type='checkbox' checked={secretIsPublic}
                    onChange={() => setSecretIsPublic(!secretIsPublic)}></input>
                <label>Существует до:</label>
                <input type='date' value={helper.DateToYMD(secretDieDate) ?? defaultDieDate}
                    className='form-control' style={{ width: '140px' }}
                    onChange={(e) => {
                        setSecretDieDate(e.target.valueAsDate);
                        // console.log('d2' + e.target.valueAsDate);
                    }}></input>
            </div>



        </div>
    </div>
}


export default ConnectToStore(CreateSecret);



