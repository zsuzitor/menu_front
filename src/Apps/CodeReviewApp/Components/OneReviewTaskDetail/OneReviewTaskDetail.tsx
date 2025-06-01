

import { cloneDeep } from 'lodash';
import React, { useState, useEffect } from 'react';
import { AlertData } from '../../../../Models/Entity/AlertData';
import OneReviewTaskComment from '../OneReviewTaskComment/OneReviewTaskComment';
import { OneTask } from '../../Models/Entity/State/OneTask';

import { useNavigate } from 'react-router-dom';
import connectToStore, { IOneReviewTaskDetailProps } from './OneReviewTaskDetailSetup';
import SaveCancelTextarea from '../../../../components/Body/SaveCancelTextarea/SaveCancelTextarea';
import SaveCancelInputText from '../../../../components/Body/SaveCancelInput/SaveCancelInputText';
import SaveCancelInputSelect from '../../../../components/Body/SaveCancelInput/SaveCancelInputSelect';


require('./OneReviewTaskDetail.css');





const OneReviewTaskDetail = (props: IOneReviewTaskDetailProps) => {

    //   console.log(new Error().stack); // Check where this is being called from

    //         return <div>стоп для теста</div>

    // console.log(props);
    // const [taskName, setTaskName] = useState(props.Task?.Name || '');

    const [taskDescriptionEditable, setTaskDescriptionEditable] = useState(false);
    const [taskNewCommentEditable, setTaskNewCommentEditable] = useState(false);
    const [taskNameEditable, setTaskNameEditable] = useState(false);
    const [taskStatusEditable, setTaskStatusEditable] = useState(false);
    const [taskExecutorEditable, setTaskExecutorEditable] = useState(false);

    // const [taskLink, setTaskLink] = useState(props.Task?.Link || '');

    // const [taskStatus, setTaskStatus] = useState(props.Task?.StatusId || -1);
    // const [taskReviewer, setTaskreviewer] = useState(props.Task?.ReviewerId || -1);
    // const [taskCreator, setTaskCreator] = useState(props.Task?.CreatorId || -1);
    // const [newCommentName, setNewCommentName] = useState('');




    const navigate = useNavigate();

    useEffect(() => {

        return function cleanUp() {
            props.ClearCurrentTaskState();
        };
    }, []);

    useEffect(() => {
        // setTaskName(props.Task?.Name || '');
        setTaskNameEditable(false);
    }, [props.Task?.Name]);

    useEffect(() => {
        // setTaskDescription(props.Task?.Description || '');
        setTaskDescriptionEditable(false);
    }, [props.Task?.Description]);


    // useEffect(() => {
    //     setTaskLink(props.Task?.Link || '');
    // }, [props.Task?.Link]);

    useEffect(() => {
        // setTaskStatus(props.Task?.StatusId || -1);
        setTaskStatusEditable(false);
    }, [props.Task?.StatusId]);

    useEffect(() => {
        // setTaskreviewer(props.Task?.ReviewerId || -1);
        setTaskExecutorEditable(false);
        // console.log("setTaskExecutorEditable(false);");
    }, [props.Task?.ReviewerId]);

    // useEffect(() => {
    //     setTaskCreator(props.Task?.CreatorId);
    // }, [props.Task?.CreatorId]);


    useEffect(() => {
        setTaskNewCommentEditable(false);
    }, [props.Task?.Comments?.length]);




    // const cancelTask = () => {
    //     if (!confirm('Отменить изменения?')) {
    //         return;
    //     }
    //     // setTaskName(props.Task.Name || '');
    //     // setTaskDescription(props.Task.Description || '');
    //     // setTaskLink(props.Task.Link || '');
    //     setTaskStatus(props.Task.StatusId || -1);
    //     setTaskreviewer(props.Task.ReviewerId || -1);
    //     setTaskCreator(props.Task.CreatorId);
    // };

    const updateTask = () => {
        // if (!taskName) {
        //     let alertFactory = new AlertData();
        //     let alert = alertFactory.GetDefaultError("Необходимо заполнить название задачи");
        //     window.G_AddAbsoluteAlertToState(alert);
        //     return;
        // }

        // let forAdd = { ...props.Task } as OneTask;
        // forAdd.Name = taskName;
        // // forAdd.Link = taskLink;
        // forAdd.StatusId = taskStatus;
        // forAdd.ReviewerId = taskReviewer;
        // forAdd.CreatorId = taskCreator;

        // props.UpdateTask(forAdd);
    };


    const deleteTask = () => {
        if (!confirm('Удалить задачу?')) {
            return;
        }

        props.DeleteTask(props.Task.Id);
    };

    const addComment = (val: string) => {


        // window.G_CodeReviewCommentController.AddComment(props.Task.Id, newCommentName, addComment);
        props.AddComment(props.Task.Id, val);
    };




    const renderComments = () => {

        return <div className='one-review-task-detail-comments-block'>
            {/* <hr /> */}
            <div className='one-review-task-detail-comments-block-inner'>
                Комментарии:
                {props.Task.Comments.map(x => {
                    return <OneReviewTaskComment
                        Comment={x}
                        TaskId={props.Task.Id}
                        key={x.Id}
                    ></OneReviewTaskComment>

                })}

                {!taskNewCommentEditable ? <div
                    className='task-comments-add'
                    onClick={() => setTaskNewCommentEditable(true)}>
                    Добавить комментарий
                </div>
                    :
                    <SaveCancelTextarea
                        CancelEvent={() => setTaskNewCommentEditable(false)}
                        SaveEvent={(val) => {
                            addComment(val);
                            return true;
                        }}
                        Text=''
                    ></SaveCancelTextarea>
                }

            </div>

        </div>
    }


    if (!props.Task) {
        return <div>Загружаем данные</div>
    }


    // let taskHasChanges =
    //     // taskName !== props.Task.Name ||
    //     // (taskLink !== props.Task.Link && (taskLink || props.Task.Link)) ||
    //     taskStatus !== props.Task.StatusId ||
    //     // (taskDescription !== props.Task.Description && (taskDescription || props.Task.Description)) ||
    //     (taskReviewer !== props.Task.ReviewerId && (props.Task.ReviewerId || taskReviewer != -1)) ||
    //     taskCreator !== props.Task.CreatorId;


    let creator = props.ProjectUsers.find(x => x.Id === props.Task.CreatorId);
    let creatorsList = props.ProjectUsers.filter(us => !us.Deactivated);
    if (creator && creator.Deactivated) {
        creatorsList.push(creator);
    }

    let reviewer = props.ProjectUsers.find(x => x.Id === props.Task.ReviewerId);
    let reviewerList = props.ProjectUsers.filter(us => !us.Deactivated);
    if (reviewer && reviewer.Deactivated) {
        reviewerList.push(reviewer);
    }



    return <div className='one-review-task-detail-block'>
        <div className='one-review-task-detail-header'>

            <div className='one-review-task-detail-name'
                onClick={() => setTaskNameEditable(true)}>
                {!taskNameEditable ? <span className='editable-by-click'

                >{props.Task.Name || ''}</span>
                    :
                    <SaveCancelInputText
                        CancelEvent={() => setTaskNameEditable(false)}
                        SaveEvent={(val) => {
                            if (!val) {
                                let alertFactory = new AlertData();
                                let alert = alertFactory.GetDefaultError("Необходимо заполнить название задачи");
                                window.G_AddAbsoluteAlertToState(alert);
                                return false;
                            }

                            props.UpdateTaskName(props.Task.Id, val);

                        }}
                        Text={props.Task.Name}
                    />
                }

            </div>
            <div className='one-review-task-detail-buttons'>
                {/* {taskHasChanges ?
                    <>
                        <div className='task-button' onClick={() => updateTask()}>
                            <img className='persent-100-width-height' src={G_PathToBaseImages + 'save-icon.png'}
                                alt="Save" title='Сохранить' />
                        </div>
                        <div className='task-button' onClick={() => cancelTask()}>
                            <img className='persent-100-width-height' src={G_PathToBaseImages + 'cancel.png'}
                                alt="Cancel" title='Отменить изменения' />
                        </div></> : <></>} */}
                <div className='task-button' onClick={() => deleteTask()}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'delete-icon.png'}
                        alt="Delete" title='Удалить задачу' />
                </div>
            </div>
        </div>
        <div className='one-review-task-detail-body'>
            <div className='one-review-task-detail-content'>
                {/* <p>{props.Task.Id}</p> */}
                {!taskDescriptionEditable ? <div className='review-task-detail-description'
                    onClick={() => setTaskDescriptionEditable(true)}
                >
                    {props.Task.Description}
                </div>
                    : <SaveCancelTextarea
                        CancelEvent={() => setTaskDescriptionEditable(false)}
                        SaveEvent={(val) => {
                            props.UpdateTaskDescription(props.Task.Id, val);
                            return true;
                        }}
                        Text={props.Task.Description}
                    />
                    // <div className="editable-textarea-container">
                    //     <textarea
                    //         value={taskDescription} onChange={e => setTaskDescription(e.target.value)}
                    //         className="editable-textarea"></textarea>

                    //     <div className="input-editable-controls">
                    //         <button type="button"
                    //             className="editable-button cancel-button"
                    //             onClick={() => setTaskDescriptionEditable(false)}
                    //         >Отмена</button>
                    //         <button type="button"
                    //             className="editable-button save-button"
                    //             onClick={() => alert('todo')}
                    //         >Сохранить</button>
                    //     </div>
                    // </div>
                }




                {/* <input type='text'
                    className='form-input persent-100-width'
                    onChange={(e) => setTaskLink(e.target.value)}
                    value={taskLink} placeholder='Ссылка'></input>
                <br /> */}


            </div>
            <div className='one-review-task-detail-right-content'>

                <div>
                    <span onClick={() => setTaskStatusEditable(true)}
                        className='editable-by-click'>Статус: </span>
                    {!taskStatusEditable ? <span
                        className='editable-by-click'
                        onClick={() => setTaskStatusEditable(true)}
                    >{props.Statuses.find(x => x.Id == props.Task.StatusId)?.Name || ''}</span>
                        :
                        <SaveCancelInputSelect
                            CancelEvent={() => setTaskStatusEditable(false)}
                            SaveEvent={(id) => {
                                props.UpdateTaskStatus(props.Task.Id, id);
                                return true;
                            }}
                            Selected={props.Task.StatusId}
                            ValuesWithId={props.Statuses.map(x => {
                                return { Id: x.Id, Text: x.Name };
                            })}
                        />

                    }
                </div>
                {/* <select className='form-select-v2'
                    onChange={e => setTaskStatus(+e.target.value)} value={taskStatus}>
                    <option value={-1}>Не выбрано</option>
                    {props.Statuses.map(status => <option value={status.Id} key={status.Id}>{status.Name}</option>)}
                </select> */}
                <div>
                    <span onClick={() => setTaskExecutorEditable(true)}
                        className='editable-by-click'>Исполнитель: </span>
                    {!taskExecutorEditable ? <span
                        className='editable-by-click'
                        onClick={() => setTaskExecutorEditable(true)}
                    >{reviewerList.find(x => x.Id == props.Task.ReviewerId)?.Name || ''}</span>
                        :
                        <SaveCancelInputSelect
                            CancelEvent={() => setTaskExecutorEditable(false)}
                            SaveEvent={(id) => {

                                if (!id || id == -1) {
                                    let alertFactory = new AlertData();
                                    let alert = alertFactory.GetDefaultError("Необходимо выбрать исполнителя");
                                    window.G_AddAbsoluteAlertToState(alert);
                                    return false;
                                }
                                props.UpdateTaskExecutor(props.Task.Id, id);
                                return true;
                            }}
                            Selected={props.Task.ReviewerId}
                            ValuesWithId={reviewerList.map(x => ({
                                Id: x.Id,
                                Text: x.Name
                            }))}
                        />}
                    {/* <select className='form-select-v2' value={taskReviewer}
                        onChange={(e) => setTaskreviewer(+e.target.value)}>
                        <option value={-1}>Не выбрано</option>
                        {reviewerList.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
                    </select> */}
                </div>
                <div>
                    <span>Создатель: {creatorsList
                        .find(x => x.Id == props.Task.CreatorId)?.Name || ''}</span>

                </div>

                <div>
                    <p>Дата создания: {props.Task.CreateDate}</p>
                    <p>Дата редактирования: {props.Task.LastUpdateDate}</p>
                </div>
            </div>
        </div>
        {renderComments()}
    </div>
}






// and that function returns the connected, wrapper component:
export default connectToStore(OneReviewTaskDetail);