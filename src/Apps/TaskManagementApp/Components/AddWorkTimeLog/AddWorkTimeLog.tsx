import React, { useState, useEffect } from 'react';
import connectToStore, { IAddWorkTimeLogProps } from './AddWorkTimeLogSetup';
import { AlertData } from '../../../../Models/Entity/AlertData';



require('./AddWorkTimeLog.css');




const AddWorkTimeLog = (props: IAddWorkTimeLogProps) => {

    // const [taskId, setTaskId] = useState(props.TaskId || 0);

    const [timeLogText, setTimeLogText] = useState('');
    const [timeLogMin, setTimeLogMin] = useState('');
    const [timeLogDate, setTimeLogDate] = useState<Date>(new Date());
    // const [timeLogValide, setTimeLogValide] = useState(false);

    // useEffect(() => {
    //     setTaskId(props.TaskId);
    // }, [props.TaskId]);

    function parseTime(input: string): { hours: number, minutes: number } {
        const regex = /^(?:(\d+)h\s*)?(?:(\d+)m\s*)?$/i;
        const match = input.match(regex);

        if (!match)
            return { hours: 0, minutes: 0 };

        const hours = match[1] ? parseInt(match[1], 10) : 0;
        const minutes = match[2] ? parseInt(match[2], 10) : 0;

        return { hours, minutes };
    }

    const parsedDate = parseTime(timeLogMin);
    const valideTime = parsedDate.hours > 0 || parsedDate.minutes > 0;

    return <div className='add-work-time-window'>
        {/* <input className='form-input-v2' type='number'
            onChange={(e) => setTaskId(+e.target.value)}
            placeholder='Задача' value={taskId}></input> */}
        <div>
            <span>Комментарий</span>
            <input className='form-input-v2' type='text' value={timeLogText}
                placeholder="Комментарий" onChange={e => setTimeLogText(e.target.value)}></input>
        </div>
        <div>
            <span>Отработано</span>
            <input className='form-input-v2' type='text' value={timeLogMin}
                placeholder="x:h y:m" onChange={e => setTimeLogMin(e.target.value)}></input>
            {!valideTime && <p className='add-work-time-error'>Не валидный формат даты, верный x:h y:m</p>}

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
            <button
                className='button button-blue'
                onClick={() => {
                    let time = parseTime(timeLogMin);
                    let minutes = (time.hours * 60 + time.minutes);
                    if (minutes == 0) {
                        let alertFactory = new AlertData();
                        let alert = alertFactory.GetDefaultError("Не валидный формат даты, верный x:h y:m");
                        window.G_AddAbsoluteAlertToState(alert);
                        return false;
                    }
                    props.CreateTimeLog(props.TaskId, timeLogText, minutes, timeLogDate);
                }}>Работа</button>
            <button
                className='button button-grey'
                onClick={() => props.Close()}>Отменить</button>
        </div>

    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(AddWorkTimeLog);