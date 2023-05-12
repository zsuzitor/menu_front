import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Models/State/AppState';
import ConnectToStore, { IOneVaultInListProps } from './OneVaultInListSetup'
import { Link } from 'react-router-dom';



require('./OneVaultInList.css');




const OneVaultInList = (props: IOneVaultInListProps) => {

    const [code, setCode] = useState('');

    useEffect(() => {

    }, []);





    return <div className='one-vault-in-list'>
        <div>
            <p>{props.Vault.Id}</p>
            <p>{props.Vault.Name}</p>
            <Link
                to={'/vault-app/vault/' + props.Vault.Id}>
                {/* <img className="persent-100-width-height" src={imgLogo} /> */}
                Открыть</Link>

        </div>
        {/* <button>Список Vaults</button>
        <div>Список Vaults</div> */}

    </div>
}


export default ConnectToStore(OneVaultInList);

