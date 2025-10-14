

import { cloneDeep } from 'lodash';
import React, { useState, useEffect, ReactNode } from 'react';
import OneProjectUser from '../OneProjectUser/OneProjectUser';

import connectToStore, { IPersonTimePageProps } from './PersonTimePageSetup';
import { Helper } from '../../../../Models/BL/Helper';
import { useNavigate } from 'react-router-dom';
import RouteBuilder from '../../Models/BL/RouteBuilder';


require('./PersonTimePage.css');




const PersonTimePage = (props: IPersonTimePageProps) => {


    const navigate = useNavigate();


    useEffect(() => {

        return () => {
            //todo очистить
            props.ClearTimeState();
        };
    }, []);

    useEffect(() => {
        if (props.UserId > 0)
            props.LoadTime(null, props.UserId, props.DateFrom, props.DateTo);

    }, [props.DateFrom.getTime(), props.DateTo.getTime(), props.UserId]);




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


    const renderOneLine = (taskId: number): ReactNode => {

        return <div className='one-line-times'>
            {datesForTable.map(x => {
                let works = props.WorkTimeLog.filter(w => w.WorkTaskId == taskId
                    && setClearDate(w.DayOfLog).getTime() == setClearDate(x).getTime()
                );
                let minuteTotal = 0;
                works.forEach(element => {
                    minuteTotal += element.TimeMinutes;
                });
                const helper = new Helper();
                let val = helper.MinutesToHours(minuteTotal);
                return <div className='project-time-one-cell'
                    key={`${taskId}_${x.getTime()}`}
                >{val}</div>
            })}
        </div>


        return <div></div>
    }

    const renderHeadLine = (): ReactNode => {

        return <div className='user-time-one-line'>
            <div className='user-time-line-header'></div>
            {datesForTable.map(x => {

                const helper = new Helper();
                let val = helper.FormatDateToDM(x);
                return <div className='user-time-one-cell'
                    title={val}
                    key={`${x.getTime()}`}
                >{val}</div>
            })}
        </div>


        return <div></div>
    }




    function formatDateToInput(date: Date): string {
        const help = new Helper();
        return help.FormatDateToInput(date);
    }

    // console.log('to2-' + props.DateFrom);

    const uniqueTaskIds = [...new Set(props.WorkTimeLog.map(x => x.WorkTaskId))];
    return <div className='user-time-page-main'>
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
        <div className='user-time-time-block'>
            {uniqueTaskIds.length == 0 ? <><h1>Выберите другой период</h1></>
                : <>
                    {renderHeadLine()}
                    {uniqueTaskIds.map(x => {
                        const taskUrl = new RouteBuilder().TaskUrl(props.CurrentProjectId, x);
                        return <div className='user-time-one-line'
                            key={x}>
                            <div className='user-time-line-header'>
                                <a href={taskUrl} onClick={(e) => {
                                    e.preventDefault();
                                    navigate(taskUrl);
                                }}>{'Task-' + x}</a>
                            </div>
                            {renderOneLine(x)}

                        </div>
                    })}
                </>}

        </div>


    </div>
}








// and that function returns the connected, wrapper component:
export default connectToStore(PersonTimePage);