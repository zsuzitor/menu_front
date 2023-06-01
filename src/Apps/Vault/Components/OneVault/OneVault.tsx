import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Entity/State/AppState';
import ConnectToStore, { IOneVaultProps } from './OneVaultSetup'
import { Link } from 'react-router-dom';
import VaultSecret from '../VaultSecret/VaultSecret';
import CreateVault from '../CreateVault/CreateVault';
import AdditionalWindow from '../../../../components/Body/AdditionalWindow/AdditionalWindow';
import { OneVaultSecret } from '../../Models/Entity/State/OneVaultSecret';
import { AlertData } from '../../../../Models/Entity/AlertData';
import CreateSecret from '../CreateSecret/CreateSecret';



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
        return () => { props.CloseCurrentVault(); };
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

    let secretsForView = vault.Secrets.filter(x => !filterSecretKey
        || (x.Key.indexOf(filterSecretKey) != -1));

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
                    <div className='but' title='Редактировать'
                        onClick={() => setShowEditForm(true)}>
                        <img className='persent-100-width-height' src={"/images/" + 'pencil-edit.png'} />
                    </div>
                    <div className='but' title='Удалить'
                        onClick={() => {
                            if (confirm('Удалить?')) {
                                props.DeleteVault(props.Vault.Id);
                                document.getElementById('list_vault_link_id').click();
                            }

                        }}>
                        <img className='persent-100-width-height' src={"/images/" + 'delete-icon.png'} />
                    </div>
                    <div className='but' title='Сгенерировать новый пароль'
                        onClick={() => {
                            let passLen = Math.floor(Math.random() * 5) + 13;//генерим от 0 до y-1, и прибавляем x, получаем от 0+x до y-1+x
                            navigator.clipboard.writeText(passwordGenerate(10));
                            G_AddAbsoluteAlertToState(
                                new AlertData().GetDefaultNotify("Скопировано"));
                        }}>
                        <img className='persent-100-width-height' src={"/images/" + 'key.png'} />
                    </div>
                </div>
            </div>

            {props.VaultIsAuthorized ? <></> : <div className='vault-auth'>
                <input type='password' className='form-control'
                    value={vaultPassword} onChange={(e) =>
                        setVaultPassword(e.target.value)}></input>
                <button className='btn btn-b-light'
                    onClick={() =>
                        props.VaultAuth(props.VaultId, vaultPassword)}>Авторизовать Vault</button></div>}
        </div>


        <div className='vault-secrets-list'>
            <CreateSecret VaultId={vault.Id}></CreateSecret>
            <div>
                <input type='text'
                    className='form-control'
                    placeholder='Поиск'
                    onChange={(e => setFilterSecretKey(e.target.value))}
                    value={filterSecretKey}></input>
            </div>
            <br></br>
            {secretsForView.length > 0 ? <>
                {secretsForView.map(s => <VaultSecret key={s.Id} Secret={s} ></VaultSecret>)}</> : <>
                Здесь пока ничего нет</>}
        </div>
    </div>
}


export default ConnectToStore(OneVault);

