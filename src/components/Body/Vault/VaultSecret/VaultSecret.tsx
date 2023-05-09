import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Models/State/AppState';
import ConnectToStore, { IVaultSecretProps } from './VaultSecretSetup'
import { Link } from 'react-router-dom';



require('./VaultSecret.css');




const VaultSecret = (props: IVaultSecretProps) => {
    const [secretKey, setKey] = useState(props.Secret?.Key || '');

    const secret = props.Secret;

    useEffect(() => {
        setKey(props.Secret?.Key || '');
        if (!secret?.Key) {
            //todo берем из урла, сетаем в стейт id, грузим запись из бд и сохраняем в стейт запись
            setKey(props.Secret?.Key || '');

        }

    }, [secret?.Key]);




    return <div className='vault-secret'>
        {secret.Key}__{secret.Value}__{secret.IsCoded}
    </div>
}


export default ConnectToStore(VaultSecret);

