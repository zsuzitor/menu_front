import React, { useState, useEffect } from 'react';
import connectToStore, { IAddTaskRelationProps } from './AddTaskRelationSetup';
import { TaskRelationType } from '../../Models/Entity/State/TaskRelation';
import SelectWithSearch from '../../../../components/Body/SelectWithSearch/SelectWithSearch';
import { IProjectTaskNameDataBack } from '../../Models/BackModels/IProjectTaskNameDataBack';



require('./AddTaskRelation.css');




const AddTaskRelation = (props: IAddTaskRelationProps) => {

    const [subTaskId, setSubTaskId] = useState(0);
    const [taskName, setTaskName] = useState('');
    const [type, setType] = useState(0);
    const [searchTasks, setSearchTasks] = useState<IProjectTaskNameDataBack[]>([]);



    useEffect(() => {
        if (subTaskId && subTaskId > 0) {
            let task = searchTasks.find(x => x.Id === subTaskId);
            setTaskName(task?.Name || '');
        }

    }, [subTaskId]);



    return <div className='add-task-relation'>

        <select className="form-control" value={type} onChange={(e) => {
            setType(prevState => {
                return +e.target.value;
            });
        }}>
            {/* тут специально перепутаны лейблы */}
            <option value="-">Не выбрано</option>
            <option value={TaskRelationType.SubTask}>Главная для</option>
            <option value={TaskRelationType.MainTask}>Зависимая для</option>
            <option value={TaskRelationType.Link}>Связана с</option>
        </select>

        <span>Задача</span>
        <SelectWithSearch
            CancelEvent={() => { }}
            SaveEvent={(id) => {
                setSubTaskId(id);
                setSearchTasks(searchTasks.filter(x => x.Id === id));
                return true;
            }}
            Selected={{ Id: subTaskId, Text: subTaskId > 0 ? `${subTaskId}-${taskName}` : '' }}
            ValuesWithId={searchTasks.map(x => ({ Id: x.Id, Text: `${x.Id}-${x.Name}` }))}
            OnSearchChange={async (text) => {
                // setTaskId(-1);
                let searchTasksBack = await props.FindTask(props.ProjectId, text);
                setSearchTasks(searchTasksBack);
            }}
        ></SelectWithSearch>


        <button className='btn-b btn-border create-new-task-btn' onClick={() => props.Create(props.TaskId!, subTaskId, type)}>Связать</button>
    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(AddTaskRelation);