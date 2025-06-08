

import { cloneDeep } from 'lodash';
import React, { useState, useEffect, ReactNode } from 'react';
import OneProjectUser from '../OneProjectUser/OneProjectUser';

import connectToStore, { IProjectTimePageProps } from './ProjectTimePageSetup';
import { Helper } from '../../../../Models/BL/Helper';


require('./ProjectTimePage.css');




const ProjectTimePage = (props: IProjectTimePageProps) => {


    const [newUserName, setNewUserName] = useState('');

    // const [dateFrom, setDateFrom] = useState<Date>(new Date());
    // const [dateTo, setDateTo] = useState<Date>(new Date());


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




    if (!props.ProjectUsers) {
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


    const renderOneLine = (userId: number): ReactNode => {

        return <div className='one-line-times'>
            {datesForTable.map(x => {
                let work = props.WorkTimeLog.find(w => w.ProjectUserId == userId
                    && setClearDate(w.DayOfLog).getTime() == setClearDate(x).getTime()
                );
                const helper = new Helper();
                let val = helper.MinutesToHours(work?.TimeMinutes || 0);
                return <div className='project-time-one-cell' title={val}
                    key={`${userId}_${work?.Id || ''}_${x.getTime()}`}
                >{val}</div>
            })}
        </div>


        return <div></div>
    }

    const renderHeadLine = (): ReactNode => {

        return <div className='project-time-one-line'>
            <div className='one-line-person'></div>
            {datesForTable.map(x => {

                const helper = new Helper();
                let val = helper.FormatDateToDM(x);
                return <div className='project-time-one-cell'
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

    return <div className='project-time-page-main'>
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
        <div className='project-time-time-block'>
            {renderHeadLine()}
            {props.ProjectUsers.map(x => {

                return <div className='project-time-one-line'
                    key={x.Id}>
                    <div className='one-line-person'>
                        {x.Email}
                    </div>
                    {renderOneLine(x.Id)}

                </div>
            })}
        </div>


    </div>
}








// and that function returns the connected, wrapper component:
export default connectToStore(ProjectTimePage);