import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Models/State/AppState';
import ConnectToStore, { ICreateVaultProps } from './CreateVaultSetup'
import { Link } from 'react-router-dom';
import VaultUserUi from '../VaultUser/VaultUser';
import { VaultUser } from '../../../../Models/Models/VaultApp/State/VaultUser';



require('./CreateVault.css');




const CreateVault = (props: ICreateVaultProps) => {

    const [name, setName] = useState(props.Vault?.Name || '');
    const [vaultPublic, setVaultPublic] = useState(props.Vault?.IsPublic || false);
    const [code, setCode] = useState('');
    const [deletedUser, setDeletedUser] = useState([] as number[]);
    const [addedUser, setAddedUser] = useState([] as VaultUser[]);

    useEffect(() => {

    }, []);

    useEffect(() => {
        if (!props.Vault?.Id) {
            return;
        }

        props.LoadVaultPeople(props.Vault.Id);
    }, [props.Vault?.Id]);

    let people = [...props.Vault.People, ...addedUser];
    return <div className='create-vault'>
        <label>Название</label>
        <input type='text' placeholder='Название' value={name}
            className='form-control'
            onChange={(e) => setName(e.target.value)}></input>
        <label>Публичный</label>
        <input type='checkbox' placeholder='Публичный'
            checked={vaultPublic} className='form-control'
            onChange={(e) => setVaultPublic(e.target.checked)}></input>
        <p>Люди хранилища</p>
        {props.Vault?.Id ? <>
            {people.map(u => <VaultUserUi key={u.Id} User={u}
                MarkedAsDeleted={deletedUser.findIndex(x => x == u.Id) >= 0}
                Delete={() => {
                    if (props.Vault.People.findIndex(x => x.Id == u.Id)) {
                        setDeletedUser([...deletedUser, u.Id]);
                    }
                    else {
                        //убрать из добавленных
                        setAddedUser(addedUser.splice(addedUser.findIndex(x => x.Email == u.Email), 1));
                    }
                }}
                RedoDelete={() => {
                    setDeletedUser(deletedUser.splice(deletedUser.findIndex(x => x == u.Id), 1));
                }}
            ></VaultUserUi>)}
            <label>Почта</label>
            <input type='text' className='form-control' placeholder='Почта'></input>
            <button className='btn btn-b-light'>Добавить</button>
        </> : <></>
        }
        <button className='btn btn-b-light'>Сохранить</button>
    </div >
}


export default ConnectToStore(CreateVault);

