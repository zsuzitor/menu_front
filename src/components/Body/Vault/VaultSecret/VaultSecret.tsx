import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Models/State/AppState';
import ConnectToStore, { IVaultSecretProps } from './VaultSecretSetup'
import { Link } from 'react-router-dom';



require('./VaultSecret.css');




const VaultSecret = (props: IVaultSecretProps) => {
    const [secretKey, setKey] = useState(props.Secret?.Key || '');
    const [secretValue, setValue] = useState(props.Secret?.Value || '');
    const [showValueState, setShowValueState] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);



    const secret = props.Secret;

    useEffect(() => {
        setKey(props.Secret?.Key || '');
        if (!secret?.Key) {
            //todo берем из урла, сетаем в стейт id, грузим запись из бд и сохраняем в стейт запись
            setKey(props.Secret?.Key || '');//todo тут надо сетнуть то что загрузили
            setValue(props.Secret?.Value || '');//todo тут надо сетнуть то что загрузили
        }

    }, [secret?.Key]);

    let showValueImage = 'eye5.png';
    let showValueTitle = 'Скрыть значение';
    if (!showValueState) {
        showValueImage = 'eye1.png';
        showValueTitle = 'Показать значение';
    }

    let vaultSecretClass = 'vault-secret-hide';
    let showMoreButtonClass = '';
    if (showMoreInfo) {
        vaultSecretClass = 'vault-secret-show';
        showMoreButtonClass = ' but-opend';
    }


    return <div className={'vault-secret ' + vaultSecretClass}>
        <div className='vault-secret-main'>
            <div className='vault-secret-key' title={secret.Key}>{secret.Key}</div>
            <div className='vault-secret-val'>
                <textarea value={secretValue} onChange={(e) => setValue(e.target.value)}></textarea>
            </div>
            <div className='vault-secret-main-buttons'>
                <div className='but vault-secret-show-val' title={showValueTitle}>
                    <img className='persent-100-width-height' src={"/images/" + showValueImage} />
                </div>
                <div className='but vault-secret-copy' title='Скопировать значение'>
                    {/* todo надо что бы при клике и успешном копировании временно менялось на галку vote4.png */}
                    <img className='persent-100-width-height' src={"/images/" + 'copy.png'} />
                </div>
                <div className={'but vault-secret-more-but' + showMoreButtonClass} title='Показать больше' onClick={() => setShowMoreInfo(!showMoreInfo)}>
                    <img className='persent-100-width-height' src={"/images/" + 'arrow2.png'} />
                </div>
            </div>
        </div>
        {showMoreInfo ? <div className='vault-secret-more'>
            доп инфа
            {secret.IsCoded ? 'coded' : 'noncoded'}
            {'diedate' + secret.DieDate + ""}
            <div className='buttons'>
                <div className='but' title='Удалить' onClick={() => alert('todo')}>
                    <img className='persent-100-width-height' src={"/images/" + 'delete-icon.png'} />
                </div>
                <div className='but' title='Сохранить' onClick={() => alert('todo')}>
                    <img className='persent-100-width-height' src={"/images/" + 'save-icon.png'} />
                </div>
                <div className='but' title='Отменить изменения' onClick={() => alert('todo')}>
                    <img className='persent-100-width-height' src={"/images/" + 'cancel.png'} />
                </div>
                <div className='but' title='Ссылка на секрет' onClick={() => alert('todo')}>
                    <img className='persent-100-width-height' src={"/images/" + 'share-icon.png'} />
                </div>
            </div>

        </div> : <></>}
    </div>
}


export default ConnectToStore(VaultSecret);

