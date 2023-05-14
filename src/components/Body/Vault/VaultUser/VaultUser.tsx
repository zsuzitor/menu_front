import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Models/State/AppState';
import { Link } from 'react-router-dom';
import ConnectToStore, { IVaultUserProps } from './VaultUserSetup';



require('./VaultUser.css');




const VaultUser = (props: IVaultUserProps) => {

    useEffect(() => {


    }, []);



    return <div>
        {props.User.Email}
        {props.MarkedAsDeleted ? <>
            <button className='btn btn-b-light'
                onClick={() => props.RedoDelete(props.User.Id)}>Восстановить</button></> :
            <><button className='btn btn-b-light'
                onClick={() => props.Delete(props.User.Id)}>Удалить</button></>}

    </div>
}


export default ConnectToStore(VaultUser);

