import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Entity/State/AppState';
import ConnectToStore, { IVaultSecretProps } from './VaultSecretSetup'
import { Link } from 'react-router-dom';
import { IUpdateSecretEntity } from '../../Models/Entity/UpdateSecretEntity';
import { AlertData } from '../../../../Models/Entity/AlertData';



require('./VaultSecret.css');




const VaultSecret = (props: IVaultSecretProps) => {
    let secret = props.Secret;
    if (!secret) {
        secret = props.SingleSecret;
    }

    const [secretKey, setSecretKey] = useState(secret?.Key || '');
    const [secretValue, setSecretValue] = useState(secret?.Value || '');
    const [secretDieDate, setSecretDieDate] = useState(secret?.DieDate || null);
    const [secretIsCoded, setSecretIsCoded] = useState(secret?.IsCoded == null ? true : secret.IsCoded);
    const [secretIsPublic, setSecretIsPublic] = useState(secret?.IsPublic ?? false);

    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [showSecretValue, setShowSecretValue] = useState(false);





    useEffect(() => {

        if (!secret?.Key) {
            let pathNameUrlSplit = document.location.pathname.split('/');
            if (pathNameUrlSplit && pathNameUrlSplit.length > 3 && pathNameUrlSplit[2] === 'secret') {
                props.GetSingleSecret(+pathNameUrlSplit[3]);
            }


        }
        // else {
        //     setSecretKey(secret?.Key || '');
        // }

        setSecretKey(secret?.Key || '');

        setShowSecretValue(false);

    }, [secret?.Key]);

    useEffect(() => {
        setSecretValue(secret?.Value || '');
        setSecretDieDate(secret?.DieDate || null);
        setSecretIsCoded(secret?.IsCoded == null ? true : secret.IsCoded);
    }, [secret?.Value, secret?.DieDate, secret?.IsCoded]);


    const defaultDieDate = '3000-01-01';

    function dateToYMD(date: Date) {
        if (!date) {
            return defaultDieDate;
        }

        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    function cancelChanges() {
        setSecretValue(secret.Value);
        setSecretKey(secret.Key);
        setSecretDieDate(secret?.DieDate || null);
        setSecretIsCoded(secret?.IsCoded == null ? true : secret.IsCoded);
        setShowSecretValue(false);
    }

    let hasChanges = //secretKey != (secret?.Key || '')
        //||
        secretKey != secret?.Key
        || secretValue != secret?.Value
        || secretDieDate != secret.DieDate
        || secretIsCoded != (secret?.IsCoded == null ? true : secret.IsCoded);


    let showValueImage = 'eye5.png';
    let showValueTitle = 'Скрыть значение';
    if (!showSecretValue) {
        showValueImage = 'eye1.png';
        showValueTitle = 'Показать значение';
    }

    let vaultSecretClass = 'vault-secret-hide';
    let showMoreButtonClass = '';
    if (showMoreInfo) {
        vaultSecretClass = 'vault-secret-show';
        showMoreButtonClass = ' but-opend';
    }

    if (props.IsNew) {
        vaultSecretClass += " vault-secret-new";
    }

    // console.log('d1' + secretDieDate);
    if (!secret) {
        return <div>todo Не найдено</div>
    }

    return <>
        {props.SingleSecret ? <>
            <Link
                to={G_VaultController.RouteUrlVaultApp}>
                Список Vaults</Link>
            <Link
                to={G_VaultController.RouteUrlVaultApp + G_VaultController.RouteUrlOneVault + secret?.VaultId}>
                Vault</Link>
        </> : <></>}

        <div className={'vault-secret ' + vaultSecretClass}>

            <div className='vault-secret-main'>
                <div className='vault-secret-key' title={secretKey}>
                    <input type='text' className='form-control'
                        value={secretKey} onChange={(e) => setSecretKey(e.target.value)}></input>
                </div>
                <div className='vault-secret-val'>
                    <textarea value={(showSecretValue || props.IsNew) ? secretValue : '***'} className='form-control'
                        onChange={(e) => setSecretValue(e.target.value)}></textarea>
                </div>
                <div className='vault-secret-main-buttons'>
                    {props.IsNew ? <></> : <><div className='but vault-secret-show-val' title={showValueTitle}
                        onClick={() => setShowSecretValue(!showSecretValue)}>
                        <img className='persent-100-width-height' src={"/images/" + showValueImage} />
                    </div>
                        <div className='but vault-secret-copy' title='Скопировать значение'
                            onClick={() => navigator.clipboard.writeText(secretValue)}>
                            {/* todo надо что бы при клике и успешном копировании временно менялось на галку vote4.png */}
                            <img className='persent-100-width-height' src={"/images/" + 'copy.png'} />
                        </div></>}

                    <div className={'but vault-secret-more-but' + showMoreButtonClass}
                        title='Показать больше' onClick={() => setShowMoreInfo(!showMoreInfo)}>
                        <img className='persent-100-width-height' src={"/images/" + 'arrow2.png'} />
                    </div>
                </div>
            </div>
            {showMoreInfo ? <div className='vault-secret-more'>
                <div className='more-data'>
                    <label>Зашифровано</label>
                    <input type='checkbox' checked={secretIsCoded}
                        onChange={() => setSecretIsCoded(!secretIsCoded)}></input>
                    <label>Публичный</label>
                    <input type='checkbox' checked={secretIsPublic}
                        onChange={() => setSecretIsPublic(!secretIsPublic)}></input>
                    <input type='date' value={dateToYMD(secretDieDate)}
                        className='form-control' style={{ width: '140px' }}
                        onChange={(e) => {
                            setSecretDieDate(e.target.valueAsDate);
                            // console.log('d2' + e.target.valueAsDate);
                        }}></input>
                </div>

                {/* <input type='text' className='form-control'
                placeholder='Ключ для кастомной ссылки'></input> */}
                <div className='buttons'>
                    {hasChanges ? <><div className='but' title='Сохранить' onClick={() => {
                        if (!secretKey) {
                            G_AddAbsoluteAlertToState(
                                new AlertData().GetDefaultError("Ключ обязателен для заполнения"));
                            return;
                        }
                        let newData = {} as IUpdateSecretEntity;
                        newData.Id = props.Secret.Id;
                        newData.Key = secretKey;
                        newData.Value = secretValue;
                        newData.VaultId = secret?.VaultId || props.VaultId;
                        newData.IsPublic = secretIsPublic;
                        newData.IsCoded = secretIsCoded;
                        newData.DieDate = secretDieDate || null;//</>new Date(defaultDieDate);
                        if (props.IsNew) {
                            props.CreateSecret(newData);
                            cancelChanges();
                        }
                        else {
                            props.UpdateSecret(newData);
                        }
                    }}>
                        <img className='persent-100-width-height' src={"/images/" + 'save-icon.png'} />
                    </div>
                        <div className='but' title='Отменить изменения' onClick={() => {
                            cancelChanges();

                        }}>
                            <img className='persent-100-width-height' src={"/images/" + 'cancel.png'} />
                        </div></> : <></>}

                    {props.IsNew ? <>
                    </> : <><div className='but' title='Удалить'
                        onClick={() =>
                            props.DeleteSecret(props.Secret.Id, props.Secret.VaultId)}>
                        <img className='persent-100-width-height'
                            src={"/images/" + 'delete-icon.png'} />
                    </div>
                        <div className='but' title='Ссылка на секрет'
                            onClick={() => navigator.clipboard
                                .writeText(document.location.origin + G_VaultController.RouteUrlVaultApp
                                    + G_VaultController.RouteUrlOneSecret + secret.Id)}>
                            <img className='persent-100-width-height' src={"/images/" + 'share-icon.png'} />
                        </div></>}

                </div>

            </div> : <></>}
        </div>
    </>
}


export default ConnectToStore(VaultSecret);

