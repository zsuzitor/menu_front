import { cloneDeep } from 'lodash';
import React, { useState, useEffect, ReactNode } from 'react';

import connectToStore, { ISprintProps } from './SprintSetup';
import { useNavigate } from 'react-router-dom';
import RouteBuilder from '../../Models/BL/RouteBuilder';

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


    const timeLogUrl = new RouteBuilder().SprintsUrl(props.ProjectId);

    return <div className='one-sprint-block'>

        <a href={timeLogUrl} onClick={(e) => {
            e.preventDefault();
            navigate(timeLogUrl);
        }}>Список спринтов</a>

        <div>
            {props.Tasks.length == 0 && <h1>Нет задач в спринте</h1>}
            {props.Tasks.map(x => {
                const taskUrl = new RouteBuilder().TaskUrl(props.ProjectId, x.Id);

                return <div key={x.Id}>
                    <div>
                        <a href={taskUrl} onClick={(e) => {
                            e.preventDefault();
                            navigate(taskUrl);
                        }}>{x.Name}</a>
                    </div>
                </div>
            }
            )}
        </div>
    </div>
}








// and that function returns the connected, wrapper component:
export default connectToStore(Sprint);