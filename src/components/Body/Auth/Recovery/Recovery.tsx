import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { MainErrorObjectBack } from '../../../../Models/BackModel/ErrorBack';
import { AppState } from '../../../../Models/Models/State/AppState';




require('./Recovery.css');


interface IRecoveryOwnProps {
}

interface IRecoveryStateToProps {
}

interface IRecoveryDispatchToProps {
}

interface IRecoveryProps extends IRecoveryStateToProps, IRecoveryOwnProps, IRecoveryDispatchToProps {
}


const RecoveryProps = (props: IRecoveryProps) => {

    const [code, setCode] = useState('');
    const [tokenChecked, setTokenChecked] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    useEffect(() => {
        let url = new URL(location.href);
        // let urlParams = new URLSearchParams(location.href);
        let args = new URLSearchParams(url.search);
        let code = args.get('code');
        if (code) {
            setCode(code);
        }
    }, []);


    let CheckCode = () => {
        let onSuccess = (error: MainErrorObjectBack) => {
            if (!error) {
                setTokenChecked(true);
            }
        }

        window.G_AuthenticateController.CheckRecoverPasswordCode(code, onSuccess);
    }

    let ChangePassword = () => {
        if (newPassword !== newPasswordConfirm) {
            alert("Пароли не совпадают");
            return;
        }

        let onSuccess = (error: MainErrorObjectBack) => {
            if (!error) {
                document.location.href = "/menu/auth/login/";
            }
        }

        window.G_AuthenticateController.RecoverPassword(code, newPassword, onSuccess);
    }



    return <div className='main-recovery-container'>
        <div className='recovery-container-inner col-sm-6 col-md-5 col-lg-4 offset-sm-3 offset-lg-4'>
            <div className='persent-100-width padding-10-top'>
                {tokenChecked ? <>
                    <input className='form-control persent-100-width' type='password'
                        placeholder='new password' onChange={e => setNewPassword(e.target.value)}
                        value={newPassword}></input>
                    <input className='form-control persent-100-width' type='password'
                        placeholder='confirm new password' onChange={e => setNewPasswordConfirm(e.target.value)}
                        value={newPasswordConfirm}></input>
                    <button className='btn persent-100-width' onClick={ChangePassword}>Изменить</button>
                </> : <>
                    <input className='form-control persent-100-width' type='text'
                        placeholder='token' onChange={e => setCode(e.target.value)}
                        value={code}></input>
                    <button className='btn persent-100-width' onClick={CheckCode}>Проверить</button>
                </>}
            </div>



        </div>


    </div>
}





const mapStateToProps = (state: AppState, ownProps: IRecoveryOwnProps) => {
    let res = {} as IRecoveryStateToProps;

    return res;
}

const mapDispatchToProps = (dispatch: any, ownProps: IRecoveryOwnProps) => {
    let res = {} as IRecoveryDispatchToProps;


    return res;
};


const connectToStore = connect(mapStateToProps, mapDispatchToProps);
// and that function returns the connected, wrapper component:
export default connectToStore(RecoveryProps);