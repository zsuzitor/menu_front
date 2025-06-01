

import { cloneDeep } from 'lodash';
import React, { useState, useEffect } from 'react';
import { AlertData } from '../../../../Models/Entity/AlertData';
import OneReviewTaskComment from '../OneReviewTaskComment/OneReviewTaskComment';
import { OneTask } from '../../Models/Entity/State/OneTask';
import connectToStore, { IOneReviewTaskProps } from './OneReviewTaskSetup';

import { useNavigate } from 'react-router-dom';


require('./OneReviewTask.css');





const OneReviewTask = (props: IOneReviewTaskProps) => {


    const [taskName, setTaskName] = useState(props.Task.Name);
    const [taskStatus, setTaskStatus] = useState(props.Task.StatusId || -1);
    const [taskExecutorId, setTaskExecutorId] = useState(props.Task.ExecutorId || -1);
    const [taskCreator, setTaskCreator] = useState(props.Task.CreatorId);
    const [newCommentName, setNewCommentName] = useState('');

    const [showComments, setShowComments] = useState(false);
    const [showFullTask, setShowFullTask] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        setTaskName(props.Task.Name);
    }, [props.Task.Name]);


    useEffect(() => {
        setTaskStatus(props.Task.StatusId || -1);
    }, [props.Task.StatusId]);

    useEffect(() => {
        setTaskExecutorId(props.Task.ExecutorId || -1);
    }, [props.Task.ExecutorId]);

    useEffect(() => {
        setTaskCreator(props.Task.CreatorId);
    }, [props.Task.CreatorId]);

    useEffect(() => {
        if (!showComments) {
            // setComments([]);
            props.SetEmptyTaskComments(props.Task.Id);
            return;
        }

        props.LoadTaskComments(props.Task.Id);
    }, [showComments]);




    const cancelTask = () => {
        if (!confirm('Отменить изменения?')) {
            return;
        }
        setTaskName(props.Task.Name);
        // setTaskLink(props.Task.Link || '');
        setTaskStatus(props.Task.StatusId);
        setTaskExecutorId(props.Task.ExecutorId || -1);
        setTaskCreator(props.Task.CreatorId);
    };

    const updateTask = () => {
        if (!taskName) {
            let alertFactory = new AlertData();
            let alert = alertFactory.GetDefaultError("Необходимо заполнить название задачи");
            window.G_AddAbsoluteAlertToState(alert);
            return;
        }

        let forAdd = { ...props.Task } as OneTask;
        forAdd.Name = taskName;
        // forAdd.Link = taskLink;
        forAdd.StatusId = taskStatus;
        forAdd.ExecutorId = taskExecutorId;
        forAdd.CreatorId = taskCreator;

        props.UpdateTask(forAdd);
    };


    const deleteTask = () => {
        if (!confirm('Удалить задачу?')) {
            return;
        }

        props.DeleteTask(props.Task.Id);
    };

    const addComment = () => {


        // window.G_CodeReviewCommentController.AddComment(props.Task.Id, newCommentName, addComment);
        props.AddComment(props.Task.Id, newCommentName);
    };





    let taskHasChanges = taskName !== props.Task.Name ||
        // (taskLink !== props.Task.Link && (taskLink || props.Task.Link)) ||
        taskStatus !== props.Task.StatusId ||
        ((props.Task.ExecutorId || taskExecutorId != -1) && taskExecutorId !== props.Task.ExecutorId) ||
        taskCreator !== props.Task.CreatorId;


    let creator = props.ProjectUsers.find(x => x.Id === taskCreator);
    let creatorsList = props.ProjectUsers.filter(us => !us.Deactivated);
    if (creator && creator.Deactivated) {
        creatorsList.push(creator);
    }

    let reviewer = props.ProjectUsers.find(x => x.Id === taskExecutorId);
    let reviewerList = props.ProjectUsers.filter(us => !us.Deactivated);
    if (reviewer && reviewer.Deactivated) {
        reviewerList.push(reviewer);
    }


    if (!showFullTask) {
        return <div className='one-review-task-block'>
            <div className='one-review-task-block-flex'>
                <div className='one-review-task-short-content'>
                    {/* <a href="/" target="_blank">{props.Task.Name}</a> */}
                    <a href={'/proj-' + props.CurrentProjectId + '/task-' + props.Task.Id} onClick={(e) => {
                        e.preventDefault();
                        // navigate("/code-review/proj-" + props.CurrentProjectId+'/task-'+props.Task.Id);
                        // props.SetCurrentTask(props.Task.Id);
                        navigate("/task-management/proj-" + props.CurrentProjectId + '/task-' + props.Task.Id);
                    }}>{props.Task.Name}</a>
                </div>
                <div className='one-review-task-buttons'>
                    <div className='task-button' onClick={() => setShowFullTask(true)}>
                        <img className='persent-100-width-height' src={G_PathToBaseImages + 'arrow2.png'}
                            alt="Показать полностью" title='Показать полностью' />
                    </div>
                </div>
            </div>
        </div>
    }

    return <div className='one-review-task-block'>
        <div className='one-review-task-block-flex'>
            <div className='one-review-task-content'>
                {/* <p>{props.Task.Id}</p> */}
                <input type='text' className='form-input-v2'
                    value={taskName} onChange={e => setTaskName(e.target.value)}
                ></input>
                <br />
                <span>Создатель: {creatorsList.find(x => x.Id == taskCreator).Name}</span>
                <div>
                    <span>Исполнитель:</span>
                    <select className='form-select-v2' value={taskExecutorId}
                        onChange={(e) => setTaskExecutorId(+e.target.value)}>
                        <option value={-1}>Не выбрано</option>
                        {reviewerList.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
                    </select>
                </div>
                <div>
                    <span>Статус:</span>
                    <select className='form-select-v2'
                        onChange={e => setTaskStatus(+e.target.value)} value={taskStatus}>
                        <option value={-1}>Не выбрано</option>
                        {props.Statuses.map(status => <option value={status.Id} key={status.Id}>{status.Name}</option>)}
                    </select>
                </div>
            </div>
            <div className='one-review-task-buttons'>

                <div className='task-button' onClick={() => setShowFullTask(false)}>
                    <img className='persent-100-width-height task-rotate' src={G_PathToBaseImages + 'arrow2.png'}
                        alt="Скрыть" title='Скрыть' />
                </div>
                {taskHasChanges ?
                    <>
                        <div className='task-button' onClick={() => updateTask()}>
                            <img className='persent-100-width-height' src={G_PathToBaseImages + 'save-icon.png'}
                                alt="Save" title='Сохранить' />
                        </div>
                        <div className='task-button' onClick={() => cancelTask()}>
                            <img className='persent-100-width-height' src={G_PathToBaseImages + 'cancel.png'}
                                alt="Cancel" title='Отменить изменения' />
                        </div></> : <></>}
                <div className='task-button' onClick={() => deleteTask()}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'delete-icon.png'}
                        alt="Delete" title='Удалить задачу' />
                </div>
                <div className='task-button' onClick={() =>
                    navigate("/task-management/proj-" + props.CurrentProjectId + '/task-' + props.Task.Id)
                }>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'external-link.png'}
                        alt="Link" title='Открыть ссылку' />
                </div>
            </div>
        </div>
    </div >
}






// and that function returns the connected, wrapper component:
export default connectToStore(OneReviewTask);