

import { cloneDeep } from 'lodash';
import React, { useState, useEffect } from 'react';

import connectToStore, { IEditProjectProps } from './EditProjectSetup';


require('./EditProject.css');




const EditProject = (props: IEditProjectProps) => {


    const [newStatusName, setNewStatusName] = useState('');


    // useEffect(() => {
    //     setTaskName(props.Task.Name);
    // }, [props.Task.Name]);


    const deleteStatus = (statusId: number) => {
        props.DeleteStatus(statusId);
    };


    return <div className={'edit-project'}>


        <div className='task-statuses'>
            {props.Statuses.map(status => {
                return <div key={status.Id}>
                    <span>{status.Name}</span>
                    <div className='task-status-delete-button' onClick={() => {
                        if (confirm('Удалить статус?')) {
                            deleteStatus(status.Id);
                        }
                    }}>
                        <img className='persent-100-width-height' src={G_PathToBaseImages + 'delete-icon.png'} alt="Delete" title='Удалить статус' />
                    </div>
                </div>
            })}
            <input className='form-input' value={newStatusName} placeholder='название нового статуса'
                onChange={e => setNewStatusName(e.target.value)}></input>
            <button className='btn-b btn-border create-new-task-btn'
                onClick={() => props.CreateStatus(newStatusName, props.ProjectId)}>Создать статус</button>
        </div>

    </div>
}








// and that function returns the connected, wrapper component:
export default connectToStore(EditProject);