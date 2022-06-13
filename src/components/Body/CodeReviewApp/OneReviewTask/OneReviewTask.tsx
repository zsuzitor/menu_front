

import { cloneDeep } from 'lodash';
import React, { useState, useEffect } from 'react';
import { BoolResultBack } from '../../../../Models/BackModel/BoolResultBack';
import { IOneTaskReviewCommentDataBack } from '../../../../Models/BackModel/CodeReviewApp/IOneTaskReviewCommentDataBack';
import { IProjectTaskDataBack } from '../../../../Models/BackModel/CodeReviewApp/IProjectTaskDataBack';
import { IProjectUserDataBack } from '../../../../Models/BackModel/CodeReviewApp/IProjectUserDataBack';
import { MainErrorObjectBack } from '../../../../Models/BackModel/ErrorBack';
import { IAuthState } from '../../../../Models/Models/AuthState';
import OneReviewTaskComment from '../OneReviewTaskComment/OneReviewTaskComment';



require('./OneReviewTask.css');


export interface IOneReviewTaskProps {
    AuthInfo: IAuthState;

    Task: IProjectTaskDataBack;
    ProjectUsers: IProjectUserDataBack[];
    UpdateTask: (task: IProjectTaskDataBack) => void;
    DeleteTask: (id: number) => void;
}



const OneReviewTask = (props: IOneReviewTaskProps) => {


    const [taskName, setTaskName] = useState(props.Task.Name);
    const [taskStatus, setTaskStatus] = useState(props.Task.Status);
    const [taskReviwer, setTaskReviwer] = useState(props.Task.ReviewerId || -1);
    const [taskCreator, setTaskCreator] = useState(props.Task.CreatorId);
    const [comments, setComments] = useState([] as IOneTaskReviewCommentDataBack[]);
    const [showComments, setShowComments] = useState(false);
    const [newCommentName, setNewCommentName] = useState('');




    useEffect(() => {
        setTaskName(props.Task.Name);
    }, [props.Task.Name]);

    useEffect(() => {
        setTaskStatus(props.Task.Status);
    }, [props.Task.Status]);

    useEffect(() => {
        setTaskReviwer(props.Task.ReviewerId || -1);
    }, [props.Task.ReviewerId]);

    useEffect(() => {
        setTaskCreator(props.Task.CreatorId);
    }, [props.Task.CreatorId]);

    useEffect(() => {
        if (!showComments) {
            setComments([]);
            return;
        }

        let loadComments = (error: MainErrorObjectBack, data: IOneTaskReviewCommentDataBack[]) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data) {
                setComments(data);
            }
        };

        window.G_CodeReviewCommentController.LoadComments(props.Task.Id, loadComments);

    }, [showComments]);


    // let creator = props.ProjectUsers.find(x => x.Id == props.Task.CreatorId);
    // let reviwer = props.ProjectUsers.find(x => x.Id == props.Task.ReviewerId);


    const cancelTask = () => {
        if (!confirm('Отменить изменения?')) {
            return;
        }
        setTaskName(props.Task.Name);
        setTaskStatus(props.Task.Status);
        setTaskReviwer(props.Task.ReviewerId || -1);
        setTaskCreator(props.Task.CreatorId);
    };

    const updateTask = () => {
        if (!taskName) {
            alert('необходимо заполнить название задачи');
        }

        let forAdd = { ...props.Task };
        forAdd.Name = taskName;
        forAdd.Status = taskStatus;
        forAdd.ReviewerId = taskReviwer;
        forAdd.CreatorId = taskCreator;

        let updateTask = (error: MainErrorObjectBack, data: BoolResultBack) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data?.result) {
                props.UpdateTask(forAdd);
            }
        };

        window.G_CodeReviewTaskController.UpdateTask(forAdd, updateTask);
    };


    const deleteTask = () => {
        if (!confirm('Удалить задачу?')) {
            return;
        }

        let deleteTask = (error: MainErrorObjectBack, data: BoolResultBack) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data?.result) {
                props.DeleteTask(props.Task.Id);
            }
        };

        window.G_CodeReviewTaskController.DeleteTask(props.Task.Id, deleteTask);
    };

    const addComment = () => {

        let addComment = (error: MainErrorObjectBack, data: IOneTaskReviewCommentDataBack) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data) {
                setComments(oldState => {
                    let newState = [...oldState];
                    newState.push(data);
                    return newState;
                });

            }
        };

        window.G_CodeReviewCommentController.AddComment(props.Task.Id, newCommentName, addComment);
    };


    const deleteComment = (id: number) => {
        setComments(oldState => {
            return oldState.filter(x => x.Id != id);
        });
    }

    const updateComment = (id: number, text: string) => {
        setComments(oldState => {
            let newState = cloneDeep(oldState);
            let comment = newState.find(x => x.Id == id);
            if (comment) {
                comment.Text = text;
            }

            return newState;
        });
    }


    const renderComments = () => {
        if (!showComments) {
            return <></>
        }

        return <div className='one-review-task-comments-block'>
            Комментарии:
            {comments.map(x => {
                return <OneReviewTaskComment
                    AuthInfo={props.AuthInfo}
                    Comment={x}
                    DeleteComment={deleteComment}
                    key={x.Id}
                    UpdateComment={updateComment}
                    ProjectUsers={props.ProjectUsers}
                ></OneReviewTaskComment>

            })}

            <div>
                <textarea className='form-control-b persent-100-width' value={newCommentName} onChange={e => setNewCommentName(e.target.value)}
                ></textarea>
                <button className='btn-b btn-border' onClick={() => addComment()}>Добавить</button>
            </div>
        </div>
    }


    return <div className='one-review-task-block'>
        <div className='one-review-task-block-flex'>
            <div className='one-review-task-content'>
                {/* <p>{props.Task.Id}</p> */}
                <textarea className='form-control-b review-task-name-input' value={taskName} onChange={e => setTaskName(e.target.value)}
                ></textarea>
                {/* <input type='text' value={taskName} onChange={e => setTaskName(e.target.value)}></input> */}
                <br />
                <span>Создатеть</span>
                <select className='form-control-b' value={taskCreator} onChange={(e) => setTaskCreator(+e.target.value)}>
                    {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
                </select>
                <span>Ревьювер</span>
                <select className='form-control-b' value={taskReviwer} onChange={(e) => setTaskReviwer(+e.target.value)}>
                    <option value={-1}>Не выбрано</option>
                    {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
                </select>
                <span>Статус</span>
                <select className='form-control-b' onChange={e => setTaskStatus(+e.target.value)} value={taskStatus}>
                    <option value={0}>Необходимо код ревью</option>
                    <option value={1}>Необходимы правки</option>
                    <option value={2}>Готово</option>
                </select>
            </div>
            <div className='one-review-task-buttons'>
                <div className='review-task-save-button' onClick={() => updateTask()}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'save-icon.png'} alt="Save" title='сохранить' />
                </div>
                <div className='review-task-cancel-button' onClick={() => cancelTask()}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'cancel.png'} alt="Cancel" title='отменить изменения' />
                </div>
                <div className='review-task-delete-button' onClick={() => deleteTask()}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'delete-icon.png'} alt="Delete" title='удалить задачу' />
                </div>
                <div className='review-task-comments-button' onClick={() => setShowComments(oldState => !oldState)}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'comments.png'} alt="Comments" title='комментарии' />
                </div>
            </div>
        </div>
        {renderComments()}
    </div>
}




export default OneReviewTask;