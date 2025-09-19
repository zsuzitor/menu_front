import { cloneDeep } from 'lodash';
import React, { useState, useEffect, ReactNode } from 'react';

import connectToStore, { ISprintsProps } from './SprintsSetup';
import { useNavigate } from 'react-router-dom';
import { Helper } from '../../../../Models/BL/Helper';

require('./Sprints.css');




const Sprints = (props: ISprintsProps) => {

    const [newSprintName, setNewSprintName] = useState("");
    const [dateFrom, setDateFrom] = useState<Date>(new Date());
    const [dateTo, setDateTo] = useState<Date>(new Date());


    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            //todo очистить
            props.ClearSprints(props.ProjectId);
        };
    }, []);

    useEffect(() => {
        if (props.ProjectId && props.ProjectId > 0)
            props.LoadSprints(props.ProjectId);

    }, [props.ProjectId]);

    useEffect(() => {
        if (props.ProjectId && props.ProjectId > 0)
            props.LoadSprints(props.ProjectId);

    }, [props.Sprints.length]);

    function formatDateToInput(date: Date): string {
        const help = new Helper();
        return help.FormatDateToInput(date);
    }

    const setClearDate = (dt: Date) => {
        let newDt = new Date(dt);
        newDt.setHours(0, 0, 0, 0);
        return newDt;
    }

    if (!props.Sprints) {
        return <></>
    }

    return <div>
        <div>
            <input type='text' className='filter-input'
                placeholder='Введите название'
                value={newSprintName}
                onChange={e => setNewSprintName(e.target.value)}></input>
            <span>Дата начала:</span>
            <input
                type="date"
                value={formatDateToInput(dateFrom)}
                onChange={(e) => {
                    if (e.target.value) {
                        let dt = new Date(e.target.value);
                        setDateFrom(setClearDate(dt));
                    }
                    else {
                        setDateFrom(setClearDate(new Date()));
                    }

                }}></input>
            <span>Дата окончания:</span>
            <input
                type="date"
                value={formatDateToInput(dateTo)}
                onChange={(e) => {
                    if (e.target.value) {
                        let dt = new Date(e.target.value);
                        setDateTo(setClearDate(dt));
                    }
                    else {
                        setDateTo(setClearDate(new Date()));
                    }

                }}></input>
            <button onClick={() => {
                props.CreateSprint(props.ProjectId, newSprintName, dateFrom, dateTo);
            }}>Добавить</button>
        </div>
        <div>
            {props.Sprints.map(x => <div key={x.Id}>
                <div onClick={() => {
                    navigate("/task-management/proj-" + props.ProjectId + '/sprint-' + x.Id);
                }}>
                    <p>{x.Id}</p>
                    <p>{x.Name}</p>

                </div>
                <button onClick={(e) => {
                    e.preventDefault();
                    props.DeleteSprint(x.Id)
                }}>Удалить</button>
            </div>)}
        </div>
    </div>

}








// and that function returns the connected, wrapper component:
export default connectToStore(Sprints);