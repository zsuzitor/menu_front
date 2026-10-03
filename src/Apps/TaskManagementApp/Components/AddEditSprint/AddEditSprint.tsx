import React, { useState, useEffect } from 'react';
import { IAddEditSprintProps } from './AddEditSprintSetup';
import connectToStore from './AddEditSprintSetup';
import { Helper } from '../../../../Models/BL/Helper';



require('./AddEditSprint.css');




const AddEditSprint = (props: IAddEditSprintProps) => {

    const [newSprintName, setNewSprintName] = useState("");
    const [dateFrom, setDateFrom] = useState<Date>(new Date());
    const [dateTo, setDateTo] = useState<Date>(new Date());

    useEffect(() => {
        setDateTo(props.EndDate);
    }, [props.EndDate]);

    useEffect(() => {
        setDateFrom(props.StartDate);
    }, [props.StartDate]);

    useEffect(() => {
        setNewSprintName(props.Name);
    }, [props.Name]);


    function formatDateToInput(date: Date): string {
        const help = new Helper();
        return help.FormatDateToInput(date);
    }

    

    return <div className='new-sprint-block'>
        <div className='new-sprint-content'>
            <input type='text' className='new-sprint-input'
                placeholder='Введите название'
                value={newSprintName}
                onChange={e => setNewSprintName(e.target.value)}></input>
            <span>Дата начала:</span>
            <input
                className='new-sprint-input'
                type="date"
                value={formatDateToInput(dateFrom)}
                onChange={(e) => {
                    if (e.target.value) {
                        let dt = new Date(e.target.value);
                        setDateFrom(new Helper().GetDateWithoutTime(dt));
                    }
                    else {
                        setDateFrom(new Helper().GetDateWithoutTime(new Date()));
                    }

                }}></input>
            <span>Дата окончания:</span>
            <input
                className='new-sprint-input'
                type="date"
                value={formatDateToInput(dateTo)}
                onChange={(e) => {
                    if (e.target.value) {
                        let dt = new Date(e.target.value);
                        setDateTo(new Helper().GetDateWithoutTime(dt));
                    }
                    else {
                        setDateTo(new Helper().GetDateWithoutTime(new Date()));
                    }

                }}></input>
            <button className='button button-grey' onClick={() => {
                if (props.Id) {
                    props.UpdateSprint(props.Id, newSprintName, dateFrom, dateTo);
                }
                else {
                    props.CreateSprint(props.ProjectId, newSprintName, dateFrom, dateTo);
                }
            }}>Сохранить</button>
        </div>
    </div>

}



// and that function returns the connected, wrapper component:
export default connectToStore(AddEditSprint);