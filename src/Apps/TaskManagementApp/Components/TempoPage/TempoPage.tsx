

import { cloneDeep } from 'lodash';
import React, { useState, useEffect, ReactNode } from 'react';
import OneProjectUser from '../OneProjectUser/OneProjectUser';

import connectToStore, { ITempoPageProps } from './TempoPageSetup';
import { Helper } from '../../../../Models/BL/Helper';
import { useNavigate } from 'react-router-dom';
import AdditionalWindow from '../../../../components/Body/AdditionalWindow/AdditionalWindow';
import AddWorkTimeLog from '../AddWorkTimeLog/AddWorkTimeLog';


require('./TempoPage.css');




const TempoPage = (props: ITempoPageProps) => {

    const [showAddWorkTimeNew, setShowAddWorkTimeNew] = useState(false);

    const [defaultDate, setDefaultDate] = useState<Date>(new Date());

    const navigate = useNavigate();

    useEffect(() => {

        return () => {
            //todo очистить
            props.ClearTimeState();
        };
    }, []);

    useEffect(() => {
        if (props.ProjectId > 0)
            props.LoadTime(props.ProjectId, props.DateFrom, props.DateTo);

    }, [props.DateFrom.getTime(), props.DateTo.getTime(), props.ProjectId]);



    if (!props.WorkTimeLog) {
        return <div></div>
    }


    const setClearDate = (dt: Date) => {
        let newDt = new Date(dt);
        newDt.setHours(0, 0, 0, 0);
        return newDt;
    }

    const currentDate = setClearDate(props.DateFrom);
    const lastDate = setClearDate(props.DateTo);
    let datesForTable: Date[] = [];
    while (currentDate <= lastDate) {
        datesForTable.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }






    function formatDateToInput(date: Date): string {
        const help = new Helper();
        return help.FormatDateToInput(date);
    }

    // console.log('to2-' + props.DateFrom);

    return <div className='tempo-time-page-main'>
        <div>
            <span>Дата С</span>
            <input
                // type="datetime-local"
                type="date"
                // value={timeLogDate.toISOString().slice(0, 16)}
                value={formatDateToInput(props.DateFrom)}
                onChange={(e) => {
                    if (e.target.value) {
                        let dt = new Date(e.target.value);
                        if (dt > props.DateTo)
                            props.SetDateFrom(setClearDate(props.DateTo));
                        else
                            props.SetDateFrom(setClearDate(dt));
                    }
                    else {
                        if (new Date() > props.DateTo)
                            props.SetDateFrom(setClearDate(props.DateTo));
                        else
                            props.SetDateFrom(setClearDate(new Date()));

                    }

                }}></input>
            <span>Дата до</span>
            <input
                // type="datetime-local"
                type="date"
                // value={timeLogDate.toISOString().slice(0, 16)}
                value={formatDateToInput(props.DateTo)}
                onChange={(e) => {
                    if (e.target.value) {
                        let dt = new Date(e.target.value);
                        if (dt < props.DateFrom)
                            props.SetDateTo(setClearDate(props.DateFrom));
                        else
                            props.SetDateTo(setClearDate(dt));
                    }
                    else {
                        if (new Date() < props.DateFrom)
                            props.SetDateTo(setClearDate(props.DateFrom));
                        else
                            props.SetDateTo(setClearDate(new Date()));

                    }

                }}></input>
        </div>
        <div className='tempo-time-block'>

            {
                showAddWorkTimeNew ? <AdditionalWindow CloseWindow={() => setShowAddWorkTimeNew(false)}
                    IsHeightWindow={false}
                    Title='Работа'
                    InnerContent={() => <AddWorkTimeLog
                        Close={() => setShowAddWorkTimeNew(false)}
                        TaskId={null}
                        DefaultDate={defaultDate}
                        CreateTimeLog={props.CreateTimeLog}
                    />}></AdditionalWindow> : <></>
            }
            {datesForTable.map(x => {

                const helper = new Helper();
                let val = helper.FormatDateToDM(x);
                let works = props.WorkTimeLog.filter(w =>
                    setClearDate(w.DayOfLog).getTime() == setClearDate(x).getTime()
                );
                let minuteTotal = 0;
                works.forEach(element => {
                    minuteTotal += element.TimeMinutes;
                });

                return <div
                    key={`${x.getTime()}`}
                    className='tempo-time-column'
                >
                    <div className='tempo-time-column-header'>{val}</div>

                    <div className='tempo-time-column-tasks'>
                        {works.map(w => <div key={w.Id} className='tempo-time-column-one-content'>
                            <div><a href={'/task-management/proj-' + props.ProjectId + '/task-' + w.WorkTaskId} onClick={(e) => {
                                e.preventDefault();
                                navigate("/task-management/proj-" + props.ProjectId + '/task-' + w.WorkTaskId);
                            }}>{w.WorkTaskId}</a></div>
                            <div>{w.Comment}</div>
                            <div>{new Helper().MinutesToHours(w.TimeMinutes)}</div>
                            <div><button onClick={x => props.DeleteTime(w.Id)}>Удалить</button></div>
                        </div>)}</div>
                    <div className='tempo-time-column-add-btn'>
                        <button onClick={() => {
                            setDefaultDate(x);
                            setShowAddWorkTimeNew(true)
                        }}>Работа</button>
                    </div>
                </div>

            })}

        </div>


    </div>
}








// and that function returns the connected, wrapper component:
export default connectToStore(TempoPage);