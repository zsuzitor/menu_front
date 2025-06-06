import React, { useState, useEffect } from 'react';
import connectToStore, { IAddWorkTimeLogProps } from './AddWorkTimeLogSetup';



require('./AddWorkTimeLog.css');




const AddWorkTimeLog = (props: IAddWorkTimeLogProps) => {

    // const [taskId, setTaskId] = useState(props.TaskId || 0);

    const [timeLogText, setTimeLogText] = useState('');
    const [timeLogMin, setTimeLogMin] = useState(0);
    const [timeLogDate, setTimeLogDate] = useState<Date>(new Date());

    // useEffect(() => {
    //     setTaskId(props.TaskId);
    // }, [props.TaskId]);


    return <div className='add-work-time-window'>
        {/* <input className='form-control-b' type='number'
            onChange={(e) => setTaskId(+e.target.value)}
            placeholder='Задача' value={taskId}></input> */}
        <div>
            <span>Комментарий</span><input className='form-control-b' type='text' value={timeLogText} placeholder="Комментарий" onChange={e => setTimeLogText(e.target.value)}></input>
        </div>
        <div>
            <span>Отработано минут</span><input className='form-control-b' type='number' value={timeLogMin} placeholder="Минут" onChange={e => setTimeLogMin(+e.target.value)}></input>
        </div>
        <div>
            <span>Дата</span><input
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

                }}></input>
        </div>

        <div className='buttons-block'>
            <button onClick={() => props.CreateTimeLog(props.TaskId, timeLogText, timeLogMin, timeLogDate)}>Работа</button>
            <button onClick={() => props.Close()}>Отменить</button>
        </div>

    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(AddWorkTimeLog);