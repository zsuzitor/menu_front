import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Entity/State/AppState';
import ConnectToStore, { IVaultSecretProps } from './VaultSecretSetup'
import { Link } from 'react-router-dom';
import { IUpdateSecretEntity } from '../../Models/Entity/UpdateSecretEntity';
import { AlertData } from '../../../../Models/Entity/AlertData';
import { Helper } from '../../../../Models/BL/Helper';



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

        return () => {
            if (props.SingleSecret) {
                props.ClearSingleSecret();
            }
        };
    }, []);

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

    let helper = new Helper();
    let currentDate = new Date();
    const defaultDieDate = ((currentDate.getUTCFullYear() + 500)
        + '-' + helper.addZeroIfNumShort((currentDate.getUTCMonth() + 1)))
        + '-' + helper.addZeroIfNumShort(currentDate.getUTCDate());

    function cancelChanges() {
        setSecretValue(secret.Value);
        setSecretKey(secret.Key);
        setSecretDieDate(secret?.DieDate || null);
        setSecretIsCoded(secret?.IsCoded == null ? true : secret.IsCoded);
        setShowSecretValue(false);
        setSecretIsPublic(secret?.IsPublic ?? false);
    }

    let hasChanges = //secretKey != (secret?.Key || '')
        //||
        secretKey != secret?.Key
        || secretValue != secret?.Value
        || secretDieDate != secret.DieDate
        || secretIsPublic != (secret?.IsPublic ?? false)
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


    // console.log('d1' + secretDieDate);
    if (!secret) {
        return <div>todo Не найдено</div>
    }

    return <>
        {props.SingleSecret ? <>
            <Link
                to={G_VaultController.RouteUrlVaultApp}>
                Список Vaults</Link>
            <label>&rArr;</label>
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
                    <textarea value={(showSecretValue) ? secretValue : '***'} className='form-control'
                        onChange={(e) => setSecretValue(e.target.value)}></textarea>
                </div>
                <div className='vault-secret-main-buttons'>
                    <div className='but vault-secret-show-val' title={showValueTitle}
                        onClick={() => setShowSecretValue(!showSecretValue)}>
                        <img className='persent-100-width-height' src={"/images/" + showValueImage} />
                    </div>
                    <div className='but vault-secret-copy' title='Скопировать значение'
                        onClick={() => {
                            navigator.clipboard.writeText(secretValue);
                            G_AddAbsoluteAlertToState(
                                new AlertData().GetDefaultNotify("Скопировано"));
                        }}>
                        <img className='persent-100-width-height' src={"/images/" + 'copy.png'} />
                    </div>

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
                    <label>Существует до:</label>
                    <input type='date' value={helper.DateToYMD(secretDieDate) ?? defaultDieDate}
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
                        newData.Id = secret.Id;
                        newData.Key = secretKey;
                        newData.Value = secretValue;
                        newData.VaultId = secret?.VaultId;
                        newData.IsPublic = secretIsPublic;
                        newData.IsCoded = secretIsCoded;
                        newData.DieDate = secretDieDate || null;//</>new Date(defaultDieDate);
                        props.UpdateSecret(newData);
                    }}>
                        <img className='persent-100-width-height' src={"/images/" + 'save-icon.png'} />
                    </div>
                        <div className='but' title='Отменить изменения' onClick={() => {
                            cancelChanges();

                        }}>
                            <img className='persent-100-width-height' src={"/images/" + 'cancel.png'} />
                        </div></> : <></>}

                    <div className='but' title='Удалить'
                        onClick={() =>
                            props.DeleteSecret(secret.Id, secret.VaultId)}>
                        <img className='persent-100-width-height'
                            src={"/images/" + 'delete-icon.png'} />
                    </div>
                    <div className='but' title='Ссылка на секрет'
                        onClick={() => {
                            navigator.clipboard
                                .writeText(document.location.origin + G_VaultController.RouteUrlVaultApp
                                    + G_VaultController.RouteUrlOneSecret + secret.Id);
                            G_AddAbsoluteAlertToState(
                                new AlertData().GetDefaultNotify("Ссылка Скопирована"));

                        }}>
                        <img className='persent-100-width-height' src={"/images/" + 'share-icon.png'} />
                    </div>

                </div>

            </div> : <></>}
        </div>
    </>
}


export default ConnectToStore(VaultSecret);

