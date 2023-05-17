import React, { useState, useEffect } from 'react';
import { AppState } from '../../../../Models/Entity/State/AppState';
import ConnectToStore, { IVaultMainProps } from './VaultMainSetup'
import VaultList from '../VaultList/VaultList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import OneVault from '../OneVault/OneVault';
import VaultSecret from '../VaultSecret/VaultSecret';



require('./VaultMain.css');




const VaultMain = (props: IVaultMainProps) => {

    // const [code, setCode] = useState('');

    useEffect(() => {
        // let pathNameUrlSplit = document.location.pathname.split('/');
        // if (pathNameUrlSplit && pathNameUrlSplit.length > 3 && pathNameUrlSplit[2] === 'vault') {
        //     if (pathNameUrlSplit[3] != (props.VaultId + '')) {
        //         props.SetCurrentVaultId(+pathNameUrlSplit[3]);
        //     }
        // }
    }, []);





    return <div className='main-vault-container'>
        <Routes>
            {/* /vault-app */}
            <Route path="/" element={<VaultList />} />
            <Route path="/vault/*" element={<OneVault VaultId={props.VaultId} />} />
            <Route path="/secret/*" element={<VaultSecret />} />


            {/* <Route component={NotFound} /> */}
        </Routes>

    </div>
}


export default ConnectToStore(VaultMain);
