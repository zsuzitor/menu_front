

import { cloneDeep } from 'lodash';
import React, { useState, useEffect } from 'react';

import connectToStore, { IEditTaskStatusProps } from './EditTaskStatusSetup';


require('./EditTaskStatus.css');




const EditTaskStatus = (props: IEditTaskStatusProps) => {


    const [statusForEdit, setStatusForEdit] = useState(false);
    const [textStatusForEdit, setTextStatusForEdit] = useState(props.Status.Name);



    useEffect(() => {
        setTextStatusForEdit(props.Status.Name);
        setStatusForEdit(false);
    }, [props.Status.Name]);


    const deleteStatus = (statusId: number) => {
        props.DeleteStatus(statusId);
    };



    {
        return <div className='task-status-elem'>
            {statusForEdit ? <>
                <div>
                    <input type='text'
                        className='form-control-b persent-100-width' value={textStatusForEdit} 
                        onChange={e => setTextStatusForEdit(e.target.value)}></input>

                </div>
                <div className='status-btn' onClick={() => {
                    setStatusForEdit(false);
                    setTextStatusForEdit(props.Status.Name);

                }}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'cancel.png'}
                        alt="Cancel" title='Отменить изменения' />
                </div>
                <div className='status-btn' onClick={() => props.UpdateStatus(props.Status.Id, textStatusForEdit)}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'save-icon.png'}
                        alt="Сохранить" title='Сохранить изменения' />
                </div>
            </> : <span onClick={() => {

                setTextStatusForEdit(props.Status.Name);
                setStatusForEdit(true);
            }}>{props.Status.Name}</span>
            }

            <div className='status-btn' onClick={() => {
                if (confirm('Удалить статус?')) {
                    deleteStatus(props.Status.Id);
                }
            }}>
                <img className='persent-100-width-height' src={G_PathToBaseImages + 'delete-icon.png'} alt="Delete" title='Удалить статус' />
            </div>
        </div>
    }
}








// and that function returns the connected, wrapper component:
export default connectToStore(EditTaskStatus);