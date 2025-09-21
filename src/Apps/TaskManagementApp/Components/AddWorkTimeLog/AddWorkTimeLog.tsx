import React, { useState, useEffect } from 'react';
import connectToStore, { IAddWorkTimeLogProps } from './AddWorkTimeLogSetup';
import { AlertData } from '../../../../Models/Entity/AlertData';
import { Helper } from '../../../../Models/BL/Helper';



require('./AddWorkTimeLog.css');




const AddWorkTimeLog = (props: IAddWorkTimeLogProps) => {

    let helper = new Helper();
    const [taskId, setTaskId] = useState(props.TaskId || props.TimeLog?.WorkTaskId || 0);

    const [timeLogText, setTimeLogText] = useState(props.TimeLog?.Comment || '');
    const [range, setRange] = useState(props.TimeLog?.RangeStartOfLog ? true : false);
    const [timeLogVal, setTimeLogVal] = useState(props.TimeLog?.TimeMinutes ? helper.MinutesToHours2(props.TimeLog.TimeMinutes) : '');
    const [timeLogDate, setTimeLogDate] = useState<Date>(props.TimeLog?.DayOfLog || props.DefaultDate || new Date());
    // const [rangeStart, setRangeStart] = useState<Date>(props.DefaultDate || new Date());
    // const [rangeEnd, setRangeEnd] = useState<Date>(props.DefaultDate || new Date());
    // const [timeLogValide, setTimeLogValide] = useState(false);

    const [startTime, setStartTime] = useState(helper.DateToGetHMInput(props.TimeLog?.RangeStartOfLog) || '09:00');
    const [endTime, setEndTime] = useState(helper.DateToGetHMInput(props.TimeLog?.RangeEndOfLog) || '18:00');

    useEffect(() => {
        setTimeLogText(props.TimeLog?.Comment || '');
    }, [props.TimeLog?.Comment]);

    useEffect(() => {
        setRange(props.TimeLog?.RangeStartOfLog ? true : false);
    }, [props.TimeLog?.RangeStartOfLog]);
    useEffect(() => {
        setTimeLogVal(props.TimeLog?.TimeMinutes ? helper.MinutesToHours2(props.TimeLog.TimeMinutes) : '');
    }, [props.TimeLog?.TimeMinutes]);
    useEffect(() => {
        setStartTime(helper.DateToGetHMInput(props.TimeLog?.RangeStartOfLog) || '09:00');
    }, [props.TimeLog?.RangeStartOfLog]);
    useEffect(() => {
        setEndTime(helper.DateToGetHMInput(props.TimeLog?.RangeEndOfLog) || '18:00');
    }, [props.TimeLog?.RangeEndOfLog]);




    useEffect(() => {
        setTaskId(props.TaskId || props.TimeLog?.WorkTaskId || 0);
    }, [props.TaskId, props.TimeLog?.WorkTaskId]);

    useEffect(() => {
        setTimeLogDate(props.TimeLog?.DayOfLog || props.DefaultDate || new Date());
    }, [props.DefaultDate, props.TimeLog?.DayOfLog]);

    function parseTime(input: string): { hours: number, minutes: number } {
        const regex = /^(?:(\d+)h\s*)?(?:(\d+)m\s*)?$/i;
        const match = input.match(regex);

        if (!match)
            return { hours: 0, minutes: 0 };

        const hours = match[1] ? parseInt(match[1], 10) : 0;
        const minutes = match[2] ? parseInt(match[2], 10) : 0;

        return { hours, minutes };
    }

    function parseTimeWithMin(input: string): number {
        var time = parseTime(input);
        return (time.hours * 60 + time.minutes)
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

        var hStart = parseInt(newStartTime.split(':')[0]);
        var mStart = parseInt(newStartTime.split(':')[1]);
        let minutesStart = hStart * 60 + mStart;
        var hEnd = parseInt(endTime.split(':')[0]);
        var mEnd = parseInt(endTime.split(':')[1]);
        let minutesEnd = hEnd * 60 + mEnd;
        let m = minutesEnd - minutesStart;
        var t = helper.MinutesToHours1(m);
        setTimeLogVal(`${t.h}h ${t.m}m`);
    };

    const handleEndTimeChange = (newEndTime: string) => {
        setEndTime(newEndTime);
        var hStart = parseInt(startTime.split(':')[0]);
        var mStart = parseInt(startTime.split(':')[1]);
        let minutesStart = hStart * 60 + mStart;
        var hEnd = parseInt(newEndTime.split(':')[0]);
        var mEnd = parseInt(newEndTime.split(':')[1]);
        let minutesEnd = hEnd * 60 + mEnd;
        let m = minutesEnd - minutesStart;
        var t = helper.MinutesToHours1(m);
        setTimeLogVal(`${t.h}h ${t.m}m`);
    };

    const getDateWithoutTime = (date: Date): Date => {
        return (new Helper).GetDateWithoutTime(date);
    };

    const parsedDate = parseTime(timeLogVal);
    const valideTime = parsedDate.hours > 0 || parsedDate.minutes > 0;

    // console.log(timeLogDate);
    // console.log(formatDateToInput(timeLogDate));
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
                <span>Окончание:</span>
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => handleEndTimeChange(e.target.value)}
                />
            </div>
            :
            <></>}
        <div>
            <span>Отработано</span>
            <input readOnly={range}
                className='form-input-v2' type='text' value={timeLogVal}
                placeholder="x:h y:m" onChange={e => setTimeLogVal(e.target.value)}></input>
            {!valideTime && <p className='add-work-time-error'>Не валидный формат списания, верный x:h y:m</p>}

        </div>
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

                        minutes = parseTimeWithMin(timeLogVal);
                        if (minutes == 0) {
                            let alertFactory = new AlertData();
                            let alert = alertFactory.GetDefaultError("Не валидный формат даты, верный x:h y:m");
                            window.G_AddAbsoluteAlertToState(alert);
                            return false;
                        }
                    }

                    if (props.TimeLog?.Id) {
                        props.UpdateTimeLog(props.TimeLog.Id, taskId, timeLogText, minutes, timeLogDate, endRange, startRange);
                    }
                    else {
                        props.CreateTimeLog(taskId, timeLogText, minutes, timeLogDate, endRange, startRange);
                    }
                }}>Работа</button>
            <button
                className='button button-grey'
                onClick={() => props.Close()}>Отменить</button>
        </div>

    </div>
}



// and that function returns the connected, wrapper component:
export default connectToStore(AddWorkTimeLog);