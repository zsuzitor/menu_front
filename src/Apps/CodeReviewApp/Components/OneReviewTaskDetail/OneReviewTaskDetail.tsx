

import { cloneDeep } from 'lodash';
import React, { useState, useEffect } from 'react';
import { AlertData } from '../../../../Models/Entity/AlertData';
import OneReviewTaskComment from '../OneReviewTaskComment/OneReviewTaskComment';
import { OneTask } from '../../Models/Entity/State/OneTask';
import connectToStore, { IOneReviewTaskDetailProps } from './OneReviewTaskDetailSetup';

import { useNavigate } from 'react-router-dom';


require('./OneReviewTask.css');





const OneReviewTaskDetail = (props: IOneReviewTaskDetailProps) => {


    const [taskName, setTaskName] = useState(props.Task.Name);
    const [taskLink, setTaskLink] = useState(props.Task.Link || '');

    const [taskStatus, setTaskStatus] = useState(props.Task.StatusId || -1);
    const [taskReviewer, setTaskreviewer] = useState(props.Task.ReviewerId || -1);
    const [taskCreator, setTaskCreator] = useState(props.Task.CreatorId);
    const [newCommentName, setNewCommentName] = useState('');




    const navigate = useNavigate();

    useEffect(() => {

        return function cleanUp() {
            props.ClearCurrentTaskState();
        };
    }, []);

    useEffect(() => {
        setTaskName(props.Task.Name);
    }, [props.Task.Name]);

    useEffect(() => {
        setTaskLink(props.Task.Link || '');
    }, [props.Task.Link]);

    useEffect(() => {
        setTaskStatus(props.Task.StatusId || -1);
    }, [props.Task.StatusId]);

    useEffect(() => {
        setTaskreviewer(props.Task.ReviewerId || -1);
    }, [props.Task.ReviewerId]);

    useEffect(() => {
        setTaskCreator(props.Task.CreatorId);
    }, [props.Task.CreatorId]);





    const cancelTask = () => {
        if (!confirm('Отменить изменения?')) {
            return;
        }
        setTaskName(props.Task.Name);
        setTaskLink(props.Task.Link || '');
        setTaskStatus(props.Task.StatusId);
        setTaskreviewer(props.Task.ReviewerId || -1);
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
        forAdd.Link = taskLink;
        forAdd.StatusId = taskStatus;
        forAdd.ReviewerId = taskReviewer;
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




    const renderComments = () => {

        return <div className='one-review-task-comments-block'>
            <hr />
            <div className='one-review-task-comments-block-inner'>
                Комментарии:
                {props.Task.Comments.map(x => {
                    return <OneReviewTaskComment
                        Comment={x}
                        TaskId={props.Task.Id}
                        key={x.Id}
                    ></OneReviewTaskComment>

                })}

                <div>
                    <textarea className='form-input' value={newCommentName}
                        onChange={e => setNewCommentName(e.target.value)}
                    ></textarea>
                    <button className='button button-grey' onClick={() => addComment()}>Добавить</button>
                </div>
            </div>

        </div>
    }



    let taskHasChanges = taskName !== props.Task.Name ||
        (taskLink !== props.Task.Link && (taskLink || props.Task.Link)) ||
        taskStatus !== props.Task.StatusId ||
        ((props.Task.ReviewerId || taskReviewer != -1) && taskReviewer !== props.Task.ReviewerId) ||
        taskCreator !== props.Task.CreatorId;


    let creator = props.ProjectUsers.find(x => x.Id === taskCreator);
    let creatorsList = props.ProjectUsers.filter(us => !us.Deactivated);
    if (creator && creator.Deactivated) {
        creatorsList.push(creator);
    }

    let reviewer = props.ProjectUsers.find(x => x.Id === taskReviewer);
    let reviewerList = props.ProjectUsers.filter(us => !us.Deactivated);
    if (reviewer && reviewer.Deactivated) {
        reviewerList.push(reviewer);
    }



    return <div className='one-review-task-block'>
        <div className='one-review-task-block-flex'>
            <div className='one-review-task-content'>
                {/* <p>{props.Task.Id}</p> */}
                <textarea className='form-input review-task-name-input'
                    value={taskName} onChange={e => setTaskName(e.target.value)}
                ></textarea>
                <input type='text'
                    className='form-input persent-100-width'
                    onChange={(e) => setTaskLink(e.target.value)}
                    value={taskLink} placeholder='Ссылка'></input>
                {/* <input type='text' value={taskName} onChange={e => setTaskName(e.target.value)}></input> */}
                <br />
                <span>Создатель</span>
                <select className='form-select' value={taskCreator}
                    onChange={(e) => setTaskCreator(+e.target.value)}>
                    {creatorsList.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
                </select>
                <span>Ревьювер</span>
                <select className='form-select' value={taskReviewer}
                    onChange={(e) => setTaskreviewer(+e.target.value)}>
                    <option value={-1}>Не выбрано</option>
                    {reviewerList.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
                </select>
                <span>Статус</span>
                <select className='form-select'
                    onChange={e => setTaskStatus(+e.target.value)} value={taskStatus}>
                    <option value={-1}>Не выбрано</option>
                    {props.Statuses.map(status => <option value={status.Id} key={status.Id}>{status.Name}</option>)}
                </select>
            </div>
            <div className='one-review-task-buttons'>
                {taskHasChanges ?
                    <>
                        <div className='review-task-save-button' onClick={() => updateTask()}>
                            <img className='persent-100-width-height' src={G_PathToBaseImages + 'save-icon.png'}
                                alt="Save" title='Сохранить' />
                        </div>
                        <div className='review-task-cancel-button' onClick={() => cancelTask()}>
                            <img className='persent-100-width-height' src={G_PathToBaseImages + 'cancel.png'}
                                alt="Cancel" title='Отменить изменения' />
                        </div></> : <></>}
                <div className='review-task-delete-button' onClick={() => deleteTask()}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'delete-icon.png'}
                        alt="Delete" title='Удалить задачу' />
                </div>
                <div className='review-task-link-button' onClick={() => taskLink && window.open(taskLink)}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'external-link.png'}
                        alt="Comments" title='Открыть ссылку' />
                </div>
            </div>
        </div>
        {renderComments()}
    </div>
}






// and that function returns the connected, wrapper component:
export default connectToStore(OneReviewTaskDetail);