import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Models/State/AppState';
import ConnectToStore, { ICreateVaultProps } from './CreateVaultSetup'
import { Link } from 'react-router-dom';



require('./CreateVault.css');




const CreateVault = (props: ICreateVaultProps) => {

    const [code, setCode] = useState('');

    useEffect(() => {
        
    }, []);


    return <div className='create-vault'>
       форма создания
    </div>
}


export default ConnectToStore(CreateVault);

