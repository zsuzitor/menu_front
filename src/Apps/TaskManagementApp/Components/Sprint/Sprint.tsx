import { cloneDeep } from 'lodash';
import React, { useState, useEffect, ReactNode } from 'react';

import connectToStore, { ISprintProps } from './SprintSetup';
import { useNavigate } from 'react-router-dom';

require('./Sprint.css');




const Sprint = (props: ISprintProps) => {

    // const [showAddWorkTimeNew, setShowAddWorkTimeNew] = useState(false);

    // console.log(props.Tasks);
    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            //todo очистить
            props.ClearSprintTasks(props.SprintId);
        };
    }, []);

    useEffect(() => {
        if (props.SprintId && props.SprintId > 0)
            props.LoadTasks(props.SprintId);

    }, [props.SprintId]);

    if (!props.SprintId || !props.Tasks)
        return <></>

    return <div className='one-sprint-block'>
        <div>
            {props.Tasks.length == 0 && <h1>Нет задач в спринте</h1>}
            {props.Tasks.map(x => <div key={x.Id}>
                <div>
                    <a href={'/task-management/proj-' + props.ProjectId + '/task-' + x.Id} onClick={(e) => {
                        e.preventDefault();
                        navigate("/task-management/proj-" + props.ProjectId + '/task-' + x.Id);
                    }}>{x.Name}</a>
                </div>
            </div>
            )}
        </div>
    </div>
}








// and that function returns the connected, wrapper component:
export default connectToStore(Sprint);