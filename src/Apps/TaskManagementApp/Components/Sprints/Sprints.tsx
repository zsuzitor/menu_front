import { cloneDeep } from 'lodash';
import React, { useState, useEffect, ReactNode } from 'react';

import connectToStore, { ISprintsProps } from './SprintsSetup';
import { useNavigate } from 'react-router-dom';
import { Helper } from '../../../../Models/BL/Helper';
import AdditionalWindow from '../../../../components/Body/AdditionalWindow/AdditionalWindow';
import AddEditSprint from '../AddEditSprint/AddEditSprint';
import RouteBuilder from '../../Models/BL/RouteBuilder';

require('./Sprints.css');




const Sprints = (props: ISprintsProps) => {

    const [showForm, setShowForm] = useState(false);
    const [editSprintId, setEditSprintId] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            // props.ClearSprints(props.ProjectId);//тянутся спринты которые на данный момент должны храниться в проекте
            //при уходе с страницы они должны сохраняться
        };
    }, []);

    useEffect(() => {
        if (props.ProjectId && props.ProjectId > 0)
            props.LoadSprints(props.ProjectId);

    }, [props.ProjectId, props.Sprints.length]);


    // if (!props.Sprints) {
    //     return <></>
    // }
    // console.log(props.Sprints);

    let editSprint = props.Sprints.find(x => x.Id == editSprintId);

    return <div className='sprints-page-main'>

        <div >
            <button className='button button-grey' onClick={() => setShowForm(true)}>Добавить</button>
            {showForm ? <AdditionalWindow CloseWindow={() => {
                setShowForm(false);
                setEditSprintId(0);
            }}
                IsHeightWindow={true}
                Title='Спринт'
                InnerContent={() => <AddEditSprint
                    Id={editSprintId}
                    Name={editSprint?.Name || ''}
                    ProjectId={editSprint?.ProjectId || props.ProjectId}
                    StartDate={editSprint?.StartDate || new Date()}
                    EndDate={editSprint?.EndDate || new Date()}
                    CreateSprint={props.CreateSprint}
                    UpdateSprint={props.UpdateSprint}
                />}></AdditionalWindow> : <></>}

        </div>



        <div className='sprints-block'>
            {props.Sprints.map(x => {

                const sprintUrl = new RouteBuilder().SprintUrl(props.ProjectId, x.Id);
                return <div
                    className='one-sprint'
                    key={x.Id}>
                    <div
                        className='one-sprint-info'
                        onClick={() => {
                            navigate(sprintUrl);
                        }}>
                        <div>{x.Id}</div>
                        <div>{x.Name}</div>

                    </div>
                    <div className='sprint-buttons'>
                        <div className='action-btn' onClick={(e) => {
                            e.preventDefault();
                            props.DeleteSprint(x.Id)
                        }}
                            title='Удалить спринт'>
                            <img className='persent-100-width-height' src="/images/delete-icon.png" />
                        </div>
                        <div className='action-btn' onClick={() => {
                            setEditSprintId(x.Id);
                            setShowForm(true);

                        }}
                            title='Редактировать спринт'>
                            <img className='persent-100-width-height' src="/images/pencil-edit.png" />
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>

}








// and that function returns the connected, wrapper component:
export default connectToStore(Sprints);