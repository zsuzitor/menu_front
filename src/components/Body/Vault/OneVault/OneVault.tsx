import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Models/State/AppState';
import ConnectToStore, { IOneVaultProps } from './OneVaultSetup'
import { Link } from 'react-router-dom';
import VaultSecret from '../VaultSecret/VaultSecret';



require('./OneVault.css');




const OneVault = (props: IOneVaultProps) => {

    const [code, setCode] = useState('');

    if (!props.VaultId) {
        //todo это полная копия из vaultMain, вынести в 1 место
        let pathNameUrlSplit = document.location.pathname.split('/');
        if (pathNameUrlSplit && pathNameUrlSplit.length > 3 && pathNameUrlSplit[2] === 'vault') {
            if (pathNameUrlSplit[3] != (props.VaultId + '')) {
                props.SetCurrentVaultId(+pathNameUrlSplit[3]);
            }
        }
    }

    let vault = props.Vaults.find(x => x.Id === props.VaultId);

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        if (!props.VaultId) {
            return;
        }

        props.LoadVaultSecrets(props.VaultId);
    }, [props.VaultId]);

    let backLink = <Link
        to={'/vault-app/'}>
        Список Vaults</Link>

    if (!vault) {
        return <div>{backLink}
            <div>Не найдено</div>
        </div>
    }


    return <div className='one-vault-list'>
        {backLink}
        <div>
            <p>{vault.Id}</p>
            <p>{vault.Name}</p>
        </div>
        {vault.Secrets.map(s => <VaultSecret Secret={s}></VaultSecret>)}
    </div>
}


export default ConnectToStore(OneVault);

