import React, { useState, useEffect } from 'react';

import connectToStore, { ITasksUserProps } from './TasksUserSetup';
import { ITaskFilter } from '../../Models/Entity/ITaskFilter';
import { OneTask } from '../../Models/Entity/State/OneTask';
import SaveCancelInputMultiSelectWithSearch from '../../../../components/Body/SaveCancelInput/SaveCancelInputMultiSelectWithSearch';
import RouteBuilder from '../../Models/BL/RouteBuilder';
import { useNavigate } from 'react-router-dom';

import './TasksUser.css';





const TasksUser = (props: ITasksUserProps) => {

    const [newSprintId, setNewSprintId] = useState(-1);
    const [newLabels, setNewLabels] = useState<number[]>([]);
    const [newTasks, setTasks] = useState<OneTask[]>([]);


    useEffect(() => {
        let f = {
            CreatorId: -1, ExecutorId: -1,
            LabelIds: newLabels, Name: '', PresetId: -1, ProjectId: props.ProjectId,
            SprintId: newSprintId, StatusId: -1, PageNumber: 0, PageSize: 500
        } as ITaskFilter;
        if (props.ProjectId > 0)
            props.ReloadTasks(f).then(d => setTasks(d));
    }, [newSprintId, newLabels, props.ProjectId]);


    const navigate = useNavigate();

    //лучше не выводить всех пользаков проекта потому что тогда нужно добавлять функционал команд
    const uniqueUsers = [...new Set(newTasks.map(x => x.ExecutorId))];


    const renderTasks = (): any => {
        return <div>
            <div className='one-status-line'>
                <div className='one-status-empty'></div>
                {props.Statuses.map(s => <div className='one-status-column' key={s.Id}>{s.Name}</div>)}
            </div>
            {uniqueUsers.map(u => <div className='one-user-line' key={u}>
                <div className='user-name'>{props.Users.find(x => x.MainAppUserId === u)?.Name}</div>
                {props.Statuses.map(s => <div className='' key={s.Id}>
                    {newTasks.filter(t => t.ExecutorId === u && t.StatusId === s.Id).map(t => {

                        const taskUrl = new RouteBuilder().TaskUrl(props.ProjectId, t.Id);
                        return <div className='one-task' title={t.Name} key={t.Id}>
                            <a href={taskUrl} onClick={(e) => {
                                e.preventDefault();
                                navigate(taskUrl);
                            }}>{t.Id}</a>
                            <br />
                            {t.Name}
                        </div>
                    })}

                </div>)}


            </div>)}
        </div>
    }




    return <div className='tasks-user-main'>
        <span className='filter-name'>Спринт:</span>
        <select className='filter-input'
            onChange={e => setNewSprintId(+e.target.value)}
            value={newSprintId}>
            <option value={-1}>Любой</option>
            {props.Sprints.map(sprint => <option value={sprint.Id} key={sprint.Id}>{sprint.Name}</option>)}
        </select>
        <span className='filter-name'>Лейблы:</span>
        <div className='edit-labels'>
            <SaveCancelInputMultiSelectWithSearch
                CancelEvent={() => {
                    // setTaskLabelEditable(false)
                    setNewLabels([]);
                }}
                SaveEvent={(id) => {
                    // props.UpdateTaskLabels(props.Task.Id, id);
                    setNewLabels(id);
                    return true;
                }}
                CancelOnSaveNoChanges={true}
                Selected={newLabels}
                ValuesWithId={props.Labels.map(x => {
                    return { Id: x.Id, Text: x.Name };
                })}
            />
        </div>

        {!newTasks || newTasks.length == 0 ? <>задачи не найдены</> : renderTasks()}


    </div>
}


// and that function returns the connected, wrapper component:
export default connectToStore(TasksUser);