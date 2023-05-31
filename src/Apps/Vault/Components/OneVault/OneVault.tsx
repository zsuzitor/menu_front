import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Entity/State/AppState';
import ConnectToStore, { IOneVaultProps } from './OneVaultSetup'
import { Link } from 'react-router-dom';
import VaultSecret from '../VaultSecret/VaultSecret';
import CreateVault from '../CreateVault/CreateVault';
import AdditionalWindow from '../../../../components/Body/AdditionalWindow/AdditionalWindow';
import { OneVaultSecret } from '../../Models/Entity/State/OneVaultSecret';
import { AlertData } from '../../../../Models/Entity/AlertData';



require('./OneVault.css');




const OneVault = (props: IOneVaultProps) => {

    // const [code, setCode] = useState('');
    const [filterSecretKey, setFilterSecretKey] = useState('');
    const [showEditForm, setShowEditForm] = useState(false);
    const [vaultPassword, setVaultPassword] = useState('');

    // const [shoNewSecretForm, setShoNewSecretForm] = useState(false);




    // let vault = props.Vaults.find(x => x.Id === props.VaultId);
    const vault = props.Vault;

    useEffect(() => {
        //if (!props.VaultId)
        {
            //todo это полная копия из vaultMain, вынести в 1 место
            let pathNameUrlSplit = document.location.pathname.split('/');
            if (pathNameUrlSplit && pathNameUrlSplit.length > 3 && pathNameUrlSplit[2] === 'vault') {
                if (pathNameUrlSplit[3] != (props.VaultId + '')) {
                    props.SetCurrentVaultId(+pathNameUrlSplit[3]);
                }
            }
        }
    }, []);

    useEffect(() => {
        if (!props.VaultId) {
            return;
        }

        // props.LoadVaultSecrets(props.VaultId);
        props.LoadVault(props.VaultId);
    }, [props.VaultId]);

    useEffect(() => {
        if (!props.VaultIsAuthorized) {
            return;
        }

        // props.LoadVaultSecrets(props.VaultId);
        props.LoadVaultSecrets(props.VaultId);
    }, [props.VaultIsAuthorized]);


    function passwordGenerate(len: number) {
        var password = "";
        var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()_+=";
        for (var i = 0; i < len; i++) {
            password += symbols.charAt(Math.floor(Math.random() * symbols.length));
        }
        return password;
    }




    let backLink = <Link id='list_vault_link_id'
        to={G_VaultController.RouteUrlVaultApp}>
        Список Vaults</Link>


    if (!vault) {
        return <div>{backLink}
            <div>Не найдено</div>
        </div>
    }

    let secretForNewForm = new OneVaultSecret();
    return <div className='one-vault-list'>
        {showEditForm ? <AdditionalWindow CloseWindow={() => setShowEditForm(false)}
            IsHeightWindow={true}
            Title='Редактирование хранилища'
            InnerContent={() => <CreateVault Vault={vault} WasCreated={() => setShowEditForm(false)}
            ></CreateVault>}></AdditionalWindow> : <></>}
        {backLink}
        <div>
            <div className='vault-header'>
                {/* <label>{vault.Id}</label> */}
                <label className='vault-name'>{vault.Name}</label>
                <div className='buttons-block'>
                    <button className='btn btn-b-light'
                        onClick={() => setShowEditForm(true)}>Редактировать</button>
                    <button className='btn btn-b-light'
                        onClick={() => {
                            props.DeleteVault(props.Vault.Id);
                            document.getElementById('list_vault_link_id').click();
                        }
                        }>Удалить</button>
                </div>
            </div>
            <div>
                <button
                    className='btn btn-b-light'
                    onClick={() => {
                        let passLen = Math.floor(Math.random() * 5) + 9;//генерим от 0 до 4, и прибавляем 9, получаем от 9 до 13
                        navigator.clipboard.writeText(passwordGenerate(10));
                        G_AddAbsoluteAlertToState(
                            new AlertData().GetDefaultNotify("Скопировано"));

                    }}>Сгенерировать новый пароль</button>
            </div>

            {props.VaultIsAuthorized ? <></> : <div className='vault-auth'>
                <input type='password' className='form-control'
                    value={vaultPassword} onChange={(e) =>
                        setVaultPassword(e.target.value)}></input>
                <button className='btn btn-b-light'
                    onClick={() =>
                        props.VaultAuth(props.VaultId, vaultPassword)}>Авторизовать Vault</button></div>}
        </div>
        <input type='text'
            className='form-control'
            placeholder='Поиск'
            onChange={(e => setFilterSecretKey(e.target.value))}
            value={filterSecretKey}></input>
        {/* <button className='btn btn-b-light' onClick={() => setShoNewSecretForm(true)}>Добавить Secret</button> */}

        <div className='vault-secrets-list'>
            <VaultSecret key="new_secret" IsNew={true}
                Secret={secretForNewForm} VaultId={vault.Id}></VaultSecret>
            {vault.Secrets.filter(x => !filterSecretKey || (x.Key.indexOf(filterSecretKey) != -1))
                .map(s => <VaultSecret key={s.Id} Secret={s} IsNew={false}></VaultSecret>)}
        </div>
    </div>
}


export default ConnectToStore(OneVault);

