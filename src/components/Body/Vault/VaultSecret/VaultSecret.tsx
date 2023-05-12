import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Models/State/AppState';
import ConnectToStore, { IVaultSecretProps } from './VaultSecretSetup'
import { Link } from 'react-router-dom';



require('./VaultSecret.css');




const VaultSecret = (props: IVaultSecretProps) => {
    const [secretKey, setKey] = useState(props.Secret?.Key || '');
    const [showValueState, setShowValueState] = useState(false);
    const [showMoreInfo, setShowMoreInfo] = useState(false);



    const secret = props.Secret;

    useEffect(() => {
        setKey(props.Secret?.Key || '');
        if (!secret?.Key) {
            //todo берем из урла, сетаем в стейт id, грузим запись из бд и сохраняем в стейт запись
            setKey(props.Secret?.Key || '');

        }

    }, [secret?.Key]);

    let showValueImage = 'eye5.png';
    let showValueTitle = 'Скрыть значение';
    if (!showValueState) {
        showValueImage = 'eye1.png';
        showValueTitle = 'Показать значение';
    }


    return <div className='vault-secret'>
        <div className='vault-secret-main'>
            <div className='vault-secret-key' title={secret.Key}>{secret.Key}</div>
            <div className='vault-secret-val'>{secret.Value}</div>
            <div className='vault-secret-main-buttons'>
                <div className='but vault-secret-show-val' title={showValueTitle}>
                    <img className='persent-100-width-height' src={"/images/" + showValueImage} />
                </div>
                <div className='but vault-secret-copy'>
                    {/* todo надо что бы при клике и успешном копировании временно менялось на галку vote4.png */}
                    <img className='persent-100-width-height' src={"/images/" + 'copy.png'} />
                </div>
                <div className='but vault-secret-more-but' onClick={() => setShowMoreInfo(!showMoreInfo)}>
                    <img className='persent-100-width-height' src={"/images/" + 'arrow2.png'} />
                </div>
            </div>
        </div>
        {showMoreInfo ? <div className='vault-secret-more'>
            доп инфа
            {secret.IsCoded}
            {secret.DieDate + ""}
            <button>удалить</button>
        </div> : <></>}
    </div>
}


export default ConnectToStore(VaultSecret);

