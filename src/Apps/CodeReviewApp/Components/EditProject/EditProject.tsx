

import { cloneDeep } from 'lodash';
import React, { useState, useEffect } from 'react';

import connectToStore, { IEditProjectProps } from './EditProjectSetup';
import EditTaskStatus from '../EditTaskStatus/EditTaskStatus';


require('./EditProject.css');




const EditProject = (props: IEditProjectProps) => {


    const [newStatusName, setNewStatusName] = useState('');



    return <div className='edit-project'>

        <div className='task-statuses'>
            <span>Статусы проекта</span>
            {props.Statuses.map(status =>
                <EditTaskStatus key={status.Id} Status={status}></EditTaskStatus>)}
            <div className='task-review-status-create'>
                <div className='status-input'>
                    <input className='form-input' value={newStatusName}
                        placeholder='Название нового статуса'
                        onChange={e => setNewStatusName(e.target.value)}></input>
                </div>
                <div className='status-create'>
                    <button className='btn-b btn-border create-new-task-btn'
                        onClick={() => props.CreateStatus(newStatusName, props.ProjectId)}
                    >Создать статус</button>
                </div>

            </div>

        </div>

    </div >
}








// and that function returns the connected, wrapper component:
export default connectToStore(EditProject);