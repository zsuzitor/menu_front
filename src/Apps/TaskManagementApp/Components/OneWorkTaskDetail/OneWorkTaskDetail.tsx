

import { cloneDeep } from 'lodash';
import React, { useState, useEffect } from 'react';
import { AlertData } from '../../../../Models/Entity/AlertData';
import OneWorkTaskComment from '../OneWorkTaskComment/OneWorkTaskComment';
import { OneTask } from '../../Models/Entity/State/OneTask';

import { useNavigate } from 'react-router-dom';
import connectToStore, { IOneWorkTaskDetailProps } from './OneWorkTaskDetailSetup';
import SaveCancelTextarea from '../../../../components/Body/SaveCancelTextarea/SaveCancelTextarea';
import { Helper } from '../../../../Models/BL/Helper';
import AdditionalWindow from '../../../../components/Body/AdditionalWindow/AdditionalWindow';
import AddWorkTimeLog from '../AddWorkTimeLog/AddWorkTimeLog';
import SaveCancelInputMultiSelect from '../../../../components/Body/SaveCancelInput/SaveCancelInputMultiSelect';
import SaveCancelInputText from '../../../../components/Body/SaveCancelInput/SaveCancelInputText';
import SaveCancelInputSelect from '../../../../components/Body/SaveCancelInput/SaveCancelInputSelect';
import SaveCancelInputMultiSelectWithSearch from '../../../../components/Body/SaveCancelInput/SaveCancelInputMultiSelectWithSearch';


require('./OneWorkTaskDetail.css');





const OneWorkTaskDetail = (props: IOneWorkTaskDetailProps) => {

    const [taskDescriptionEditable, setTaskDescriptionEditable] = useState(false);
    const [taskNewCommentEditable, setTaskNewCommentEditable] = useState(false);
    const [taskNameEditable, setTaskNameEditable] = useState(false);
    const [taskStatusEditable, setTaskStatusEditable] = useState(false);
    const [taskSprintEditable, setTaskSprintEditable] = useState(false);
    const [taskLabelEditable, setTaskLabelEditable] = useState(false);
    const [taskExecutorEditable, setTaskExecutorEditable] = useState(false);

    const [showAddWorkTimeNew, setShowAddWorkTimeNew] = useState(false);
    const [showAddWorkTimeBlock, setShowAddWorkTimeBlock] = useState(false);




    const navigate = useNavigate();

    useEffect(() => {
        if (props.Task?.Id && showAddWorkTimeBlock) {
            props.LoadTaskTimeLogs(props.Task.Id);
        }

    }, [props.Task?.Id, showAddWorkTimeBlock]);

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
        // setTaskName(props.Task?.Name || '');
        setTaskSprintEditable(false);
    }, [props.Task?.SprintId]);

    useEffect(() => {
        // setTaskName(props.Task?.Name || '');
        setTaskLabelEditable(false);
    }, [props.Task?.LabelId]);

    useEffect(() => {
        // setTaskDescription(props.Task?.Description || '');
        setTaskDescriptionEditable(false);
    }, [props.Task?.Description]);



    useEffect(() => {
        // setTaskStatus(props.Task?.StatusId || -1);
        setTaskStatusEditable(false);
    }, [props.Task?.StatusId]);

    useEffect(() => {
        setTaskExecutorEditable(false);
    }, [props.Task?.ExecutorId]);



    useEffect(() => {
        setTaskNewCommentEditable(false);
    }, [props.Task?.Comments?.length]);




    const deleteTask = () => {
        if (!confirm('Удалить задачу?')) {
            return;
        }

        props.DeleteTask(props.Task.Id);
    };

    const addComment = (val: string) => {
        props.AddComment(props.Task.Id, val);
    };

    const renderWorkNum = (m: number): string => {
        return new Helper().MinutesToHours(m);
    }

    const formatDate = (date: Date) => {
        //x.DayOfLog.toDateString()
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }





    const renderTime = () => {
        return <div className='work-time-block'>
            {/* <input className='form-control-b' type='text' value={timeLogText} placeholder="Имя" onChange={e => setTimeLogText(e.target.value)}></input>
            <input className='form-control-b' type='number' value={timeLogMin} placeholder="Имя" onChange={e => setTimeLogMin(+e.target.value)}></input>
            <input
                // type="datetime-local"
                type="date"
                // value={timeLogDate.toISOString().slice(0, 16)}
                value={timeLogDate.toISOString().split('T')[0]}
                onChange={(e) => {
                    if (e.target.value) {
                        setTimeLogDate(new Date(e.target.value));
                    }
                    else {
                        setTimeLogDate(new Date());
                    }

                }}></input> */}
            {/* <button onClick={() => props.CreateTimeLog(props.Task.Id, timeLogText, timeLogMin, timeLogDate)}>добавить</button> */}
            {showAddWorkTimeNew ? <AdditionalWindow CloseWindow={() => setShowAddWorkTimeNew(false)}
                IsHeightWindow={false}
                Title='Работа'
                InnerContent={() => <AddWorkTimeLog
                    Close={() => setShowAddWorkTimeNew(false)}
                    TaskId={props.Task.Id}
                    DefaultDate={null}
                    CreateTimeLog={props.CreateTimeLog}
                />}></AdditionalWindow> : <></>}
            <div className='add-time-log-header'>
                <div className='add-time-log-show-btn'
                    onClick={() => setShowAddWorkTimeBlock(!showAddWorkTimeBlock)}>Списания:</div>
                <div><button className='add-time-log-btn'
                    onClick={() => setShowAddWorkTimeNew(true)}>
                    <span className='add-time-log-plus-icon'>+</span>
                    <span>Добавить списание</span>
                </button></div>
            </div>
            {showAddWorkTimeBlock && <div className='work-time-block-list'>
                {props.Task.TimeLogs.map(x => {
                    return <div key={x.Id} className='one-work-time-block'>
                        <div className='time-block-left'>{props.ProjectUsers.find(u => u.Id === x.ProjectUserId)?.Email || ''}</div>
                        <div className='time-block-center'>{formatDate(x.DayOfLog)}</div>
                        <div className='time-block-right'>{renderWorkNum(x.TimeMinutes)}</div>
                    </div>
                })}</div>}



        </div>
    }


    const renderComments = () => {

        return <div className='one-work-task-detail-comments-block'>
            {/* <hr /> */}
            <div className='one-work-task-detail-comments-block-inner'>
                Комментарии:
                {props.Task.Comments.map(x => {
                    return <OneWorkTaskComment
                        Comment={x}
                        TaskId={props.Task.Id}
                        key={x.Id}
                    />

                })}
                <div className='task-comments-add'>
                    {!taskNewCommentEditable ? <div
                        className='task-comments-add-btn'
                        onClick={() => setTaskNewCommentEditable(true)}>
                        <div className='task-comments-add-btn-img'>
                            <img className='persent-100-width-height' src={G_PathToBaseImages + 'comments.png'}
                                alt="Комментарии" title='Комментарии' />
                        </div>
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

        </div>
    }


    if (!props.Task) {
        return <div>Загружаем данные</div>
    }



    let creator = props.ProjectUsers.find(x => x.Id === props.Task.CreatorId);
    let creatorsList = props.ProjectUsers.filter(us => !us.Deactivated);
    if (creator && creator.Deactivated) {
        creatorsList.push(creator);
    }

    let executor = props.ProjectUsers.find(x => x.Id === props.Task.ExecutorId);
    let executorList = props.ProjectUsers.filter(us => !us.Deactivated);
    if (executor && executor.Deactivated) {
        executorList.push(executor);
    }



    return <div className='one-work-task-detail-block'>
        <div className='one-work-task-detail-header'>

            <div className='one-work-task-detail-name-full'>
                {!taskNameEditable ? <div className='one-work-task-detail-name'
                    onClick={() => setTaskNameEditable(true)}
                ><span className='editable-by-click'
                >{props.Task.Name || ''}</span></div>
                    :
                    <SaveCancelInputText
                        CancelEvent={() => {
                            setTaskNameEditable(false);
                        }}
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
            <div className='one-work-task-detail-buttons'>
                <div className='task-button' onClick={() => deleteTask()}>
                    <img className='persent-100-width-height' src={G_PathToBaseImages + 'delete-icon.png'}
                        alt="Delete" title='Удалить задачу' />
                </div>
            </div>
        </div>
        <div className='one-work-task-detail-body'>
            <div className='one-work-task-detail-content'>
                {!taskDescriptionEditable ? <div className='work-task-detail-description'
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
                }

            </div>
            <div className='one-work-task-detail-right-content'>

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
                <div>
                    <span onClick={() => setTaskExecutorEditable(true)}
                        className='editable-by-click'>Исполнитель: </span>
                    {!taskExecutorEditable ? <span
                        className='editable-by-click'
                        onClick={() => setTaskExecutorEditable(true)}
                    >{executorList.find(x => x.Id == props.Task.ExecutorId)?.Name || ''}</span>
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
                            Selected={props.Task.ExecutorId}
                            ValuesWithId={executorList.map(x => ({
                                Id: x.Id,
                                Text: x.Name
                            }))}
                        />}
                </div>
                <div>
                    <span>Создатель: {creatorsList
                        .find(x => x.Id == props.Task.CreatorId)?.Name || ''}</span>

                </div>

                <div>
                    <p>Дата создания: {props.Task.CreateDate}</p>
                    <p>Дата редактирования: {props.Task.LastUpdateDate}</p>
                </div>
                <div>
                    <span onClick={() => setTaskSprintEditable(true)}
                        className='editable-by-click'>Спринт: </span>
                    {!taskSprintEditable ? <span
                        className='editable-by-click'
                        onClick={() => setTaskSprintEditable(true)}
                    >{props.Sprints.filter(x => props.Task.SprintId.find(y => y == x.Id)).map(x => x.Name)
                        .join(',') || 'Не привязана к спринту'}</span>
                        :
                        <SaveCancelInputMultiSelectWithSearch
                            CancelEvent={() => setTaskSprintEditable(false)}
                            SaveEvent={(id) => {
                                props.UpdateTaskSprints(props.Task.Id, id);
                                return true;
                            }}
                            Selected={props.Task.SprintId}
                            ValuesWithId={props.Sprints.map(x => {
                                return { Id: x.Id, Text: x.Name };
                            })}
                        />

                    }
                </div>
                <div>
                    <span onClick={() => setTaskLabelEditable(true)}
                        className='editable-by-click'>Лейблы: </span>
                    {!taskLabelEditable ? <span
                        className='editable-by-click'
                        onClick={() => setTaskLabelEditable(true)}
                    >{props.Labels.filter(x => props.Task.LabelId.find(y => y == x.Id)).map(x => x.Name)
                        .join(',') || '-'}</span>
                        :
                        <SaveCancelInputMultiSelectWithSearch
                            CancelEvent={() => setTaskLabelEditable(false)}
                            SaveEvent={(id) => {
                                props.UpdateTaskLabels(props.Task.Id, id);
                                return true;
                            }}
                            Selected={props.Task.LabelId}
                            ValuesWithId={props.Labels.map(x => {
                                return { Id: x.Id, Text: x.Name };
                            })}
                        />

                    }
                </div>
            </div>
        </div>
        <div>
            {renderTime()}
        </div>
        {renderComments()}
    </div>
}






// and that function returns the connected, wrapper component:
export default connectToStore(OneWorkTaskDetail);