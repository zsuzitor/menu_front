

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
    // const [taskLink, setTaskLink] = useState(props.Task.Link || '');

    const [taskStatus, setTaskStatus] = useState(props.Task.StatusId || -1);
    const [taskReviewer, setTaskreviewer] = useState(props.Task.ReviewerId || -1);
    const [taskCreator, setTaskCreator] = useState(props.Task.CreatorId);
    const [newCommentName, setNewCommentName] = useState('');

    // const [comments, setComments] = useState([] as IOneTaskReviewCommentDataBack[]);
    const [showComments, setShowComments] = useState(false);
    const [showFullTask, setShowFullTask] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        setTaskName(props.Task.Name);
    }, [props.Task.Name]);

    // useEffect(() => {
    //     setTaskLink(props.Task.Link || '');
    // }, [props.Task.Link]);

    useEffect(() => {
        setTaskStatus(props.Task.StatusId || -1);
    }, [props.Task.StatusId]);

    useEffect(() => {
        setTaskreviewer(props.Task.ReviewerId || -1);
    }, [props.Task.ReviewerId]);

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
        // forAdd.Link = taskLink;
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




    // const renderComments = () => {
    //     if (!showComments) {
    //         return <></>
    //     }

    //     return <div className='one-review-task-comments-block'>
    //         <hr />
    //         <div className='one-review-task-comments-block-inner'>
    //             Комментарии:
    //             {props.Comments.map(x => {
    //                 return <OneReviewTaskComment
    //                     Comment={x}
    //                     TaskId={props.Task.Id}
    //                     key={x.Id}
    //                 ></OneReviewTaskComment>

    //             })}

    //             <div>
    //                 <textarea className='form-input' value={newCommentName}
    //                     onChange={e => setNewCommentName(e.target.value)}
    //                 ></textarea>
    //                 <button className='button button-grey' onClick={() => addComment()}>Добавить</button>
    //             </div>
    //         </div>

    //     </div>
    // }



    let taskHasChanges = taskName !== props.Task.Name ||
        // (taskLink !== props.Task.Link && (taskLink || props.Task.Link)) ||
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


    if (!showFullTask) {
        return <div className='one-review-task-block'>
            <div className='one-review-task-block-flex'>
                <div className='one-review-task-short-content'>
                    {/* <a href="/" target="_blank">{props.Task.Name}</a> */}
                    <a href={'/proj-' + props.CurrentProjectId + '/task-' + props.Task.Id} onClick={(e) => {
                        e.preventDefault();
                        // navigate("/code-review/proj-" + props.CurrentProjectId+'/task-'+props.Task.Id);
                        props.SetCurrentTask(props.Task.Id);
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
                <textarea className='form-input review-task-name-input'
                    value={taskName} onChange={e => setTaskName(e.target.value)}
                ></textarea>
                {/* <input type='text'
                    className='form-input persent-100-width'
                    onChange={(e) => setTaskLink(e.target.value)}
                    value={taskLink} placeholder='Ссылка'></input> */}
                {/* <input type='text' value={taskName} onChange={e => setTaskName(e.target.value)}></input> */}
                <br />
                <span>Создатель: {creatorsList.find(x => x.Id == taskCreator).Name}</span>
                {/* <select className='form-select' value={taskCreator}
                    onChange={(e) => setTaskCreator(+e.target.value)}>
                    {creatorsList.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
                </select> */}
                <span>Ревьювер:</span>
                <select className='form-select' value={taskReviewer}
                    onChange={(e) => setTaskreviewer(+e.target.value)}>
                    <option value={-1}>Не выбрано</option>
                    {reviewerList.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
                </select>
                <span>Статус:</span>
                <select className='form-select'
                    onChange={e => setTaskStatus(+e.target.value)} value={taskStatus}>
                    <option value={-1}>Не выбрано</option>
                    {props.Statuses.map(status => <option value={status.Id} key={status.Id}>{status.Name}</option>)}
                </select>
            </div>
            <div className='one-review-task-buttons'>
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
                {/* <div className='review-task-comments-button' onClick={() => setShowComments(oldState => !oldState)}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'comments.png'}
                        alt="Comments" title='Комментарии' />
                </div> */}
                <div className='task-button' onClick={() =>
                    // <a href={'/proj-' + props.CurrentProjectId + '/task-' + props.Task.Id} onClick={(e) => {
                    //     e.preventDefault();
                    //     // navigate("/code-review/proj-" + props.CurrentProjectId+'/task-'+props.Task.Id);
                    //     props.SetCurrentTask(props.Task.Id);
                    // }}>{props.Task.Name}</a>
                    props.SetCurrentTask(props.Task.Id)

                }>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'external-link.png'}
                        alt="Link" title='Открыть ссылку' />
                </div>
                <div className='task-button' onClick={() => setShowFullTask(false)}>
                    <img className='persent-100-width-height task-rotate' src={G_PathToBaseImages + 'arrow2.png'}
                        alt="Скрыть" title='Скрыть' />
                </div>
            </div>
        </div>
        {/* {renderComments()} */}
    </div >
}






// and that function returns the connected, wrapper component:
export default connectToStore(OneReviewTask);