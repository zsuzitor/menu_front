import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Entity/State/AppState';
import ConnectToStore, { IOneVaultInListProps } from './OneVaultInListSetup'
import { Link } from 'react-router-dom';



require('./OneVaultInList.css');




const OneVaultInList = (props: IOneVaultInListProps) => {

    const [code, setCode] = useState('');

    useEffect(() => {

    }, []);





    return <div className='one-vault-in-list'>
        <Link
            to={G_VaultController.RouteUrlVaultApp
                + G_VaultController.RouteUrlOneVault + props.Vault.Id}>
            {/* <img className="persent-100-width-height" src={imgLogo} /> */}
            <div className='one-vault-in-list-inner'>
                {props.Vault.Name}
            </div>
        </Link>
    </div>
}


export default ConnectToStore(OneVaultInList);

