import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Entity/State/AppState';
import { Link } from 'react-router-dom';
import ConnectToStore, { ICreateSecretProps } from './CreateSecretSetup';



require('./CreateSecret.css');




const CreateSecret = (props: ICreateSecretProps) => {
    const [vaultPassword, setVaultPassword] = useState('');



    useEffect(() => {

    }, []);


    return <></>
}


export default ConnectToStore(CreateSecret);



