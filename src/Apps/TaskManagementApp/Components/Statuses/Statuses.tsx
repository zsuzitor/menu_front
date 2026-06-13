import React, { useState, useEffect } from 'react';

import connectToStore, { IStatusesProps } from './StatusesSetup';
import EditTaskStatus from '../EditTaskStatus/EditTaskStatus';

require('./Statuses.css');





const Statuses = (props: IStatusesProps) => {

    const [newStatusName, setNewStatusName] = useState('');

    return <div className='task-statuses'>
        <div className='work-task-status-create'>
            <div className='status-input'>
                <input className='form-input' value={newStatusName}
                    placeholder='Название нового статуса'
                    onChange={e => setNewStatusName(e.target.value)}></input>
            </div>
        </div>
        <div className='status-create'>
            <button className='btn-b btn-border create-new-task-btn'
                onClick={() => props.CreateStatus(newStatusName, props.ProjectId)}
            >Создать статус</button>
        </div>
        <span>Статусы проекта</span>
        {props.Statuses.map(status =>
            <EditTaskStatus key={status.Id} Status={status}></EditTaskStatus>)}


    </div>
}


// and that function returns the connected, wrapper component:
export default connectToStore(Statuses);