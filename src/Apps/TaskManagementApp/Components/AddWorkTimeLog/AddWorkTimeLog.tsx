import React, { useState, useEffect } from 'react';
import connectToStore, { IAddWorkTimeLogProps } from './AddWorkTimeLogSetup';
import { AlertData } from '../../../../Models/Entity/AlertData';
import { Helper } from '../../../../Models/BL/Helper';



require('./AddWorkTimeLog.css');




const AddWorkTimeLog = (props: IAddWorkTimeLogProps) => {

    const [taskId, setTaskId] = useState(props.TaskId || 0);

    const [timeLogText, setTimeLogText] = useState('');
    const [range, setRange] = useState(false);
    const [timeLogVal, setTimeLogVal] = useState('');
    const [timeLogDate, setTimeLogDate] = useState<Date>(props.DefaultDate || new Date());
    // const [rangeStart, setRangeStart] = useState<Date>(props.DefaultDate || new Date());
    // const [rangeEnd, setRangeEnd] = useState<Date>(props.DefaultDate || new Date());
    // const [timeLogValide, setTimeLogValide] = useState(false);

    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('18:00');
    const [duration, setDuration] = useState(0);


    useEffect(() => {
        setTaskId(props.TaskId || 0);
    }, [props.TaskId]);

    useEffect(() => {
        setTimeLogDate(props.DefaultDate || new Date());
    }, [props.DefaultDate]);

    function parseTime(input: string): { hours: number, minutes: number } {
        const regex = /^(?:(\d+)h\s*)?(?:(\d+)m\s*)?$/i;
        const match = input.match(regex);

        if (!match)
            return { hours: 0, minutes: 0 };

        const hours = match[1] ? parseInt(match[1], 10) : 0;
        const minutes = match[2] ? parseInt(match[2], 10) : 0;

        return { hours, minutes };
    }

    function formatDateToInput(date: Date): string {
        const help = new Helper();
        return help.FormatDateToInput(date);
    }

    const calculateDuration = (start: string, end: string) => {
        const [startHours, startMinutes] = start.split(':').map(Number);
        const [endHours, endMinutes] = end.split(':').map(Number);

        const startDate = new Date();
        startDate.setHours(startHours, startMinutes, 0, 0);

        const endDate = new Date();
        endDate.setHours(endHours, endMinutes, 0, 0);

        // const diffMs = endDate - startDate;
        const diffMs: number = endDate.getTime() - startDate.getTime();
        const diffMinutes = Math.floor(diffMs / 60000);

        return diffMinutes > 0 ? diffMinutes : 0;
    };

    const handleStartTimeChange = (newStartTime: string) => {
        setStartTime(newStartTime);
        setDuration(calculateDuration(newStartTime, endTime));
    };

    const handleEndTimeChange = (newEndTime: string) => {
        setEndTime(newEndTime);
        setDuration(calculateDuration(startTime, newEndTime));
    };

    const getDateWithoutTime = (date: Date): Date => {
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        return newDate;
    };

    const parsedDate = parseTime(timeLogVal);
    const valideTime = parsedDate.hours > 0 || parsedDate.minutes > 0;

    return <div className='add-work-time-window'>
        {props.TaskId || <div>
            <span>Задача</span>
            <input className='form-input-v2' type='number'
                onChange={(e) => setTaskId(+e.target.value)}
                placeholder='Задача' value={taskId}></input>
        </div>}

        <div>
            <span>Комментарий</span>
            <input className='form-input-v2' type='text' value={timeLogText}
                placeholder="Комментарий" onChange={e => setTimeLogText(e.target.value)}></input>
        </div>
        <span>Интервал:</span>
        <input type="checkbox" defaultChecked={range} onChange={() => setRange(!range)} />
        {range ?
            <div>
                <span>Начало:</span>
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => handleStartTimeChange(e.target.value)}
                />
                {/* <input
                    // type="datetime-local"
                    type="date"
                    // value={timeLogDate.toISOString().slice(0, 16)}
                    value={formatDateToInput(rangeStart)}
                    onChange={(e) => {
                        if (e.target.value) {
                            setRangeStart(new Date(e.target.value));
                        }
                        else {
                            setRangeStart(new Date());
                        }

                    }}></input> */}
                <span>Окончание:</span>
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => handleEndTimeChange(e.target.value)}
                />
                {/* <input
                    // type="datetime-local"
                    type="date"
                    // value={timeLogDate.toISOString().slice(0, 16)}
                    value={formatDateToInput(rangeStart)}
                    onChange={(e) => {
                        if (e.target.value) {
                            setRangeStart(new Date(e.target.value));
                        }
                        else {
                            setRangeStart(new Date());
                        }

                    }}></input> */}
                <p>Продолжительность: {duration} минут ({Math.floor(duration / 60)} ч. {duration % 60} мин.)</p>
            </div>
            :
            <div>
                <span>Отработано</span>
                <input className='form-input-v2' type='text' value={timeLogVal}
                    placeholder="x:h y:m" onChange={e => setTimeLogVal(e.target.value)}></input>
                {!valideTime && <p className='add-work-time-error'>Не валидный формат списания, верный x:h y:m</p>}

            </div>}

        <div>
            <span>Дата</span><input
                // type="datetime-local"
                type="date"
                // value={timeLogDate.toISOString().slice(0, 16)}
                value={formatDateToInput(timeLogDate)}
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

                    let startRange: Date = null;
                    let endRange: Date = null;
                    let minutes: number = 0;
                    if (range) {
                        startRange =
                            new Date(getDateWithoutTime(timeLogDate).setHours(
                                parseInt(startTime.split(':')[0]),
                                parseInt(startTime.split(':')[1])
                            ));
                        endRange =
                            new Date(getDateWithoutTime(timeLogDate).setHours(
                                parseInt(endTime.split(':')[0]),
                                parseInt(endTime.split(':')[1])
                            ));
                    }
                    else {

                        let time = parseTime(timeLogVal);
                        minutes = (time.hours * 60 + time.minutes);
                        if (minutes == 0) {
                            let alertFactory = new AlertData();
                            let alert = alertFactory.GetDefaultError("Не валидный формат даты, верный x:h y:m");
                            window.G_AddAbsoluteAlertToState(alert);
                            return false;
                        }
                    }
                    console.log(startRange);
                    props.CreateTimeLog(taskId, timeLogText, minutes, timeLogDate, endRange, startRange);
                }}>Работа</button>
            <button
                className='button button-grey'
                onClick={() => props.Close()}>Отменить</button>
        </div>

    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(AddWorkTimeLog);