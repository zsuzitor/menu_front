import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Entity/State/AppState';
import ConnectToStore, { IVaultListProps } from './VaultListSetup'
import OneVaultInList from '../OneVaultInList/OneVaultInList';
import CreateVault from '../CreateVault/CreateVault';
import AdditionalWindow from '../../../../components/Body/AdditionalWindow/AdditionalWindow';



require('./VaultList.css');




const VaultList = (props: IVaultListProps) => {

    const [code, setCode] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        props.LoadMyVaults();

    }, []);





    return <div className='vault-list'>
        <div>
            {showAddForm ? <AdditionalWindow CloseWindow={() => setShowAddForm(false)}
                IsHeightWindow={false}
                Title='Добавление хранилища'
                InnerContent={() => <CreateVault WasCreated={() => setShowAddForm(false)}
                ></CreateVault>}></AdditionalWindow> : <></>}
        </div>
        <div className='vault-list-container'>
            {props.Vaults.map(v => <OneVaultInList key={v.Id} Vault={v}></OneVaultInList>)}
            <div className='create-vault-in-list' onClick={() => setShowAddForm(true)}>+</div>
        </div>

    </div>
}


export default ConnectToStore(VaultList);

