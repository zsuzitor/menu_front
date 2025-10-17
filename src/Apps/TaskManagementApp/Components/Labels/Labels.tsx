import { cloneDeep } from 'lodash';
import React, { useState, useEffect, ReactNode } from 'react';

import connectToStore, { ILabelsProps } from './LabelsSetup';
import { useNavigate } from 'react-router-dom';
import { Helper } from '../../../../Models/BL/Helper';
import AdditionalWindow from '../../../../components/Body/AdditionalWindow/AdditionalWindow';
import AddEditSprint from '../AddEditSprint/AddEditSprint';
import RouteBuilder from '../../Models/BL/RouteBuilder';

require('./Labels.css');




const Labels = (props: ILabelsProps) => {

    const [editLabelId, setEditLabelId] = useState(0);
    const [editLabelText, setEditLabelText] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            // props.ClearLabels(props.ProjectId);//тянутся лейблы которые на данный момент должны храниться в проекте
            //при уходе с страницы они должны сохраняться
        };
    }, []);

    useEffect(() => {
        if (props.ProjectId && props.ProjectId > 0)
            props.LoadLabels(props.ProjectId);

    }, [props.ProjectId, props.Labels.length]);


    if (!props.Labels) {
        return <></>
    }

    // let editSprint = props.Labels.find(x => x.Id == editLabelId);

    return <div className='labels-page-main'>
        <div className='label-block'>
            {props.Labels.map(x => {

                return <div
                    className='one-label'
                    key={x.Id}>
                    <div
                        className='one-label-info'
                        onClick={() => {
                            setEditLabelId(x.Id);
                            setEditLabelText(x.Name);
                        }}>
                        <div>{x.Id}</div>
                        {editLabelId == x.Id ? <input type='text'
                            onChange={(e) => setEditLabelText(e.target.value)}>
                        </input> : <div>{x.Name}</div>}


                    </div>
                    <div className='label-buttons'>
                        <div className='action-btn' onClick={(e) => {
                            if (!confirm('Удалить лейбл' + x.Name + '?')) {
                                return;
                            }
                            e.preventDefault();
                            props.DeleteLabel(x.Id)
                        }}
                            title='Удалить лейбл'>
                            <img className='persent-100-width-height' src="/images/delete-icon.png" />
                        </div>
                        {editLabelId ? <>
                            <div className='action-btn' onClick={() => {
                                setEditLabelId(0);

                            }}
                                title='Отменить редактирование'>
                                <img className='persent-100-width-height' src="/images/cancel.png" />
                            </div>
                            <div className='action-btn' onClick={() => {
                                setEditLabelId(0);
                                props.UpdateLabel(x.Id, editLabelText);

                            }}
                                title='Сохранить изменения'>
                                <img className='persent-100-width-height' src="/images/save-icon.png" />
                            </div>
                        </> : <></>}

                    </div>
                </div>
            })}
        </div>
    </div>

}








// and that function returns the connected, wrapper component:
export default connectToStore(Labels);