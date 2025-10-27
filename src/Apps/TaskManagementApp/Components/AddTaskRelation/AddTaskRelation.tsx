import React, { useState, useEffect } from 'react';
import connectToStore, { IAddTaskRelationProps } from './AddTaskRelationSetup';
import { TaskRelationType } from '../../Models/Entity/State/TaskRelation';



require('./AddTaskRelation.css');




const AddTaskRelation = (props: IAddTaskRelationProps) => {

    const [mainTaskId, setMainTaskId] = useState(props.TaskId || 0);
    const [subTaskId, setSubTaskId] = useState(0);
    const [type, setType] = useState(0);

    useEffect(() => {
        setMainTaskId(props.TaskId || 0);
    }, [props.TaskId]);


    return <div className='add-task-relation'>
        <span>Задача</span>
        <input className='form-input-v2' type='number'
            onChange={(e) => setMainTaskId(+e.target.value)}
            placeholder='Задача' value={mainTaskId}></input>

        <select className="form-control" value={type} onChange={(e) => {
            setType(prevState => {
                return +e.target.value;
            });
        }}>
            <option value="-">Не выбрано</option>
            <option value={TaskRelationType.SubTask}>Главная для</option>
            <option value={TaskRelationType.Link}>Связана с</option>
        </select>

        <span>Задача</span>
        <input className='form-input-v2' type='number'
            onChange={(e) => setSubTaskId(+e.target.value)}
            placeholder='Задача' value={subTaskId}></input>


    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(AddTaskRelation);