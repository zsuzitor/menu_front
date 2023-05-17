import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Entity/State/AppState';
import ConnectToStore, { IVaultSecretProps } from './VaultSecretSetup'
import { Link } from 'react-router-dom';
import { IUpdateSecretEntity } from '../../Models/Entity/UpdateSecretEntity';



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

    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [showSecretValue, setShowSecretValue] = useState(false);





    useEffect(() => {

        if (!secret?.Key) {
            //todo берем из урла, сетаем в стейт id, грузим запись из бд и сохраняем в стейт запись
            let pathNameUrlSplit = document.location.pathname.split('/');
            if (pathNameUrlSplit && pathNameUrlSplit.length > 3 && pathNameUrlSplit[2] === 'secret') {
                props.GetSingleSecret(+pathNameUrlSplit[3]);
            }


        }
        else {
            setSecretKey(secret?.Key || '');
        }

        setSecretKey(secret?.Key || '');//todo тут надо сетнуть то что загрузили
        setSecretValue(secret?.Value || '');//todo тут надо сетнуть то что загрузили
        setSecretDieDate(secret?.DieDate || null);
        setSecretIsCoded(secret?.IsCoded == null ? true : secret.IsCoded);
        setShowSecretValue(false);

    }, [secret?.Key]);



    function dateToYMD(date: Date) {
        if (!date) {
            return '3000-01-01';
        }

        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }


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

    return <div className={'vault-secret ' + vaultSecretClass}>
        <div className='vault-secret-main'>
            <div className='vault-secret-key' title={secretKey}>{secretKey}</div>
            <div className='vault-secret-val'>
                <textarea value={showSecretValue ? secretValue : '***'} className='form-control'
                    onChange={(e) => setSecretValue(e.target.value)}></textarea>
            </div>
            <div className='vault-secret-main-buttons'>
                <div className='but vault-secret-show-val' title={showValueTitle}
                    onClick={() => setShowSecretValue(!showSecretValue)}>
                    <img className='persent-100-width-height' src={"/images/" + showValueImage} />
                </div>
                <div className='but vault-secret-copy' title='Скопировать значение'
                    onClick={() => navigator.clipboard.writeText(secretValue)}>
                    {/* todo надо что бы при клике и успешном копировании временно менялось на галку vote4.png */}
                    <img className='persent-100-width-height' src={"/images/" + 'copy.png'} />
                </div>
                <div className={'but vault-secret-more-but' + showMoreButtonClass}
                    title='Показать больше' onClick={() => setShowMoreInfo(!showMoreInfo)}>
                    <img className='persent-100-width-height' src={"/images/" + 'arrow2.png'} />
                </div>
            </div>
        </div>
        {showMoreInfo ? <div className='vault-secret-more'>
            <label>Зашифровано</label>
            <input type='checkbox' checked={secretIsCoded}
                onChange={() => setSecretIsCoded(!secretIsCoded)}></input>
            <input type='date' value={dateToYMD(secretDieDate)}
                className='form-control' style={{ width: '140px' }}
                onChange={(e) => {
                    setSecretDieDate(e.target.valueAsDate);
                    // console.log('d2' + e.target.valueAsDate);
                }}></input>
            {/* <input type='text' className='form-control'
                placeholder='Ключ для кастомной ссылки'></input> */}
            <div className='buttons'>
                <div className='but' title='Удалить'
                    onClick={() => props.DeleteSecret(props.Secret.Id, props.Secret.VaultId)}>
                    <img className='persent-100-width-height' src={"/images/" + 'delete-icon.png'} />
                </div>
                <div className='but' title='Сохранить' onClick={() => {
                    let newData = {} as IUpdateSecretEntity;
                    newData.Id = props.Secret.Id;
                    newData.Key = secretKey;
                    newData.Value = secretValue;
                    newData.VaultId = secret.VaultId;
                    props.UpdateSecret(newData);
                    alert('todo');
                }}>
                    <img className='persent-100-width-height' src={"/images/" + 'save-icon.png'} />
                </div>
                <div className='but' title='Отменить изменения' onClick={() => {
                    setSecretValue(secret.Value);
                    setSecretDieDate(secret?.DieDate || null);
                    setSecretIsCoded(secret?.IsCoded == null ? true : secret.IsCoded);
                    setShowSecretValue(false);
                }}>
                    <img className='persent-100-width-height' src={"/images/" + 'cancel.png'} />
                </div>
                <div className='but' title='Ссылка на секрет'
                    onClick={() => navigator.clipboard.writeText(document.location.origin + '/vault-app/secret/' + secret.Id)}>
                    <img className='persent-100-width-height' src={"/images/" + 'share-icon.png'} />
                </div>
            </div>

        </div> : <></>}
    </div>
}


export default ConnectToStore(VaultSecret);

