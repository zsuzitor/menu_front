import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Models/State/AppState';
import ConnectToStore, { IOneVaultProps } from './OneVaultSetup'
import { Link } from 'react-router-dom';
import VaultSecret from '../VaultSecret/VaultSecret';
import AdditionalWindow from '../../AdditionalWindow/AdditionalWindow';
import CreateVault from '../CreateVault/CreateVault';



require('./OneVault.css');




const OneVault = (props: IOneVaultProps) => {

    // const [code, setCode] = useState('');
    const [filterSecretKey, setFilterSecretKey] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);


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
        {showEditForm ? <AdditionalWindow CloseWindow={() => setShowEditForm(false)}
            IsHeightWindow={false}
            Title='Редактирование хранилища'
            InnerContent={() => <CreateVault Vault={vault}
            ></CreateVault>}></AdditionalWindow> : <></>}
        {backLink}
        <div>
            <p>{vault.Id}</p>
            <p>{vault.Name}</p>
            <button className='btn btn-primary'
                onClick={() => setShowEditForm(true)}>Редактировать</button>
            <button className='btn btn-primary'
                onClick={() => alert('todo props.delete; linkredirect.click?')}>Удалить</button>
        </div>
        <input type='text'
            placeholder='поиск'
            onChange={(e => setFilterSecretKey(e.target.value))}
            value={filterSecretKey}></input>
        <div className='vault-secrets-list'>
            {vault.Secrets.filter(x => !filterSecretKey || (x.Key.indexOf(filterSecretKey) != -1))
                .map(s => <VaultSecret key={s.Id} Secret={s}></VaultSecret>)}
        </div>
        <button className='btn btn-primary'>добавить</button>
    </div>
}


export default ConnectToStore(OneVault);

