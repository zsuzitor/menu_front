import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Models/State/AppState';
import ConnectToStore, { IVaultListProps } from './VaultListSetup'
import OneVaultInList from '../OneVaultInList/OneVaultInList';
import AdditionalWindow from '../../AdditionalWindow/AdditionalWindow';
import CreateVault from '../CreateVault/CreateVault';



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
                InnerContent={() => <CreateVault
                ></CreateVault>}></AdditionalWindow> : <></>}
        </div>
        <div className='vault-list-container'>
            {props.Vaults.map(v => <OneVaultInList key={v.Id} Vault={v}></OneVaultInList>)}
            <div className='create-vault-in-list' onClick={() => setShowAddForm(!showAddForm)}>+</div>
        </div>

    </div>
}


export default ConnectToStore(VaultList);

