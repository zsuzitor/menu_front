import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Models/State/AppState';
import ConnectToStore, { IVaultListProps } from './VaultListSetup'
import OneVaultInList from '../OneVaultInList/OneVaultInList';



require('./VaultList.css');




const VaultList = (props: IVaultListProps) => {

    const [code, setCode] = useState('');

    useEffect(() => {

    }, []);





    return <div className='vault-list-container'>
        {props.Vaults.map(v => <OneVaultInList key={v.Id} Vault={v}></OneVaultInList>)}

    </div>
}


export default ConnectToStore(VaultList);

