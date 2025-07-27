import { cloneDeep } from 'lodash';
import React, { useState, useEffect, ReactNode } from 'react';

import connectToStore, { ISprintsProps } from './SprintsSetup';
import { useNavigate } from 'react-router-dom';

require('./Sprints.css');




const Sprints = (props: ISprintsProps) => {

    const [newSprintName, setNewSprintName] = useState("");


    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            //todo очистить
            props.ClearSprints(props.ProjectId);
        };
    }, []);

    useEffect(() => {
        if (props.ProjectId && props.ProjectId > 0)
            props.LoadSprints(props.ProjectId);

    }, [props.ProjectId]);

    useEffect(() => {
        if (props.ProjectId && props.ProjectId > 0)
            props.LoadSprints(props.ProjectId);

    }, [props.Sprints.length]);


    if (!props.Sprints) {
        return <></>
    }

    return <div>
        <div>
            <input type='text' className='filter-input'
                placeholder='Введите название'
                value={newSprintName}
                onChange={e => setNewSprintName(e.target.value)}></input>
            <button onClick={() => {
                props.CreateSprint(props.ProjectId, newSprintName);
            }}>Добавить</button>
        </div>
        <div>
            {props.Sprints.map(x => <div key={x.Id}>
                <div onClick={() => {
                    navigate("/task-management/proj-" + props.ProjectId + '/sprint-' + x.Id);
                }}>
                    <p>{x.Id}</p>
                    <p>{x.Name}</p>

                </div>
                <button onClick={(e) => {
                    e.preventDefault();
                    props.DeleteSprint(x.Id)
                }}>Удалить</button>
            </div>)}
        </div>
    </div>

}








// and that function returns the connected, wrapper component:
export default connectToStore(Sprints);