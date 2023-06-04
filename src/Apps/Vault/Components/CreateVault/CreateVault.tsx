import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Entity/State/AppState';
import ConnectToStore, { ICreateVaultProps } from './CreateVaultSetup'
import { Link } from 'react-router-dom';
import VaultUserUi from '../VaultUser/VaultUser';
import { UpdateVaultEntity } from '../../Models/Entity/UpdateVaultEntity';
import { VaultUser } from '../../Models/Entity/State/VaultUser';
import { AlertData } from '../../../../Models/Entity/AlertData';



require('./CreateVault.css');




const CreateVault = (props: ICreateVaultProps) => {

    const [vaultName, setVaultName] = useState(props.Vault?.Name || '');
    const [vaultPublic, setVaultPublic] = useState(props.Vault?.IsPublic || false);
    const [deletedUser, setDeletedUser] = useState([] as number[]);
    const [addedUser, setAddedUser] = useState([] as VaultUser[]);
    const [userEmailForAdd, setUserEmailForAdd] = useState('');
    const [vaultPassword, setVaultPassword] = useState('');



    useEffect(() => {

    }, []);

    useEffect(() => {
        if (!props.Vault?.Id) {
            return;
        }

        props.LoadVaultPeople(props.Vault.Id);
    }, [props.Vault?.Id]);

    let people: VaultUser[] = [];
    if (props.Vault?.Id) {
        people = [...props.Vault.People, ...addedUser];
    }
    return <div className='create-vault'>
        <label>Название</label>
        <input type='text' placeholder='Название' value={vaultName}
            className='form-control'
            onChange={(e) => setVaultName(e.target.value)}></input>
        <div className='c-flex'>
            <label>Публичный</label>
            <input type='checkbox' placeholder='Публичный'
                checked={vaultPublic} className='form-control m-checkbox'
                onChange={(e) => setVaultPublic(e.target.checked)}></input>
        </div>

        <label>Пароль</label>
        <div className='vault-change-password-block c-flex'>
            <input type='password' value={vaultPassword}
                className='form-control' onChange={(e) =>
                    setVaultPassword(e.target.value)}></input>
            {props.Vault?.Id ? <>
                <button className='btn btn-b-light'
                    onClick={() => {
                        if (!vaultPassword) {
                            G_AddAbsoluteAlertToState(
                                new AlertData().GetDefaultError("Пароль обязателен для заполнения"));
                            return;
                        }

                        props.UpdateVaultPassword(props.Vault.Id, vaultPassword);
                    }}>Изменить пароль</button>
            </> : <></>}
        </div>

        <br></br>
        {props.Vault?.Id ? <>
            <p>Люди хранилища</p>
            {people.map(u => <VaultUserUi key={u.Email} User={u}
                MarkedAsDeleted={deletedUser.findIndex(x => x == u.Id) >= 0}
                Delete={() => {
                    if (props.Vault.People.findIndex(x => x.Id == u.Id) >= 0) {
                        setDeletedUser([...deletedUser, u.Id]);
                    }
                    else {
                        //убрать из добавленных
                        let newArr = [...addedUser];
                        newArr.splice(newArr.findIndex(x => x.Email == u.Email), 1)
                        setAddedUser(newArr);
                    }
                }}
                RedoDelete={() => {
                    let newArr = [...deletedUser];
                    newArr.splice(newArr.findIndex(x => x == u.Id), 1);
                    setDeletedUser(newArr);
                }}
            ></VaultUserUi>)}
            <label>Добавление нового человека</label>
            <div className='vault-new-user-form c-flex'>
                <input type='text' className='form-control'
                    placeholder='Почта' value={userEmailForAdd}
                    onChange={(e) => setUserEmailForAdd(e.target.value)}></input>
                <button className='btn btn-b-light'
                    onClick={() => {
                        if (!userEmailForAdd || people.find(x => x.Email == userEmailForAdd)) {
                            return;
                        }
                        let forAdd = new VaultUser();
                        forAdd.Email = userEmailForAdd;
                        setAddedUser([...addedUser, forAdd]);
                        setUserEmailForAdd('');
                    }}>Добавить</button>
            </div>

        </> : <></>
        }
        <button className='btn btn-b-light' onClick={() => {
            let newVault = new UpdateVaultEntity();
            newVault.IsPublic = vaultPublic;
            newVault.Name = vaultName;
            if (props.Vault?.Id) {
                newVault.Id = props.Vault.Id;
                newVault.UsersForDelete = [...deletedUser];
                newVault.UsersForAdd = addedUser.map(x => x.Email);
                props.UpdateVault(newVault, () => props.WasCreated());
            }
            else {
                newVault.Password = vaultPassword;
                props.CreateVault(newVault, () => props.WasCreated());
            }

        }}>{props.Vault?.Id ? 'Сохранить изменения' : 'Создать Vault'}</button>
    </div >
}


export default ConnectToStore(CreateVault);

