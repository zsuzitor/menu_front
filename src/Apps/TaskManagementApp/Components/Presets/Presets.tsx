import React, { useState, useEffect } from 'react';
import OneProjectInList from '../OneProjectInList/OneProjectInList';

import { AlertData } from '../../../../Models/Entity/AlertData';

import connectToStore, { IPresetsProps } from './PresetsSetup';
import { useNavigate } from 'react-router-dom';
import RouteBuilder from '../../Models/BL/RouteBuilder';
import AdditionalWindow from '../../../../components/Body/AdditionalWindow/AdditionalWindow';
import EditPreset from '../EditPreset/EditPreset';

require('./Presets.css');





const Presets = (props: IPresetsProps) => {
    const [newPresetName, setNewPresetName] = useState('');
    const [editPresetId, setEditPresetId] = useState(0);


    let editPreset = props.Presets.find(x => x.Id == editPresetId);
    // const projectUrl = new RouteBuilder().ProjectUrl(props.CurrentProjectId);
    return <div className='presets-page-main'>
        {editPresetId > 0 ? <AdditionalWindow CloseWindow={() => {
            setEditPresetId(0);
        }}
            IsHeightWindow={true}
            Title='Спринт'
            InnerContent={() => <EditPreset
                Preset={editPreset}
                UpdatePreset={props.UpdatePreset}
            />}></AdditionalWindow> : <></>}
        <div>
            <input type='text' className='form-control'
                placeholder='Название'
                value={newPresetName} onChange={(e) => setNewPresetName(e.target.value)}></input>
            <button className='btn btn-b-light'
                onClick={() => {
                    props.CreatePreset(props.ProjectId, newPresetName);
                }}>Добавить</button>
        </div>
        <div>
            {props.Presets.map(x => <div className='one-preset-block' key={x.Id} >
                <div>{x.Id} {x.Name}</div>
                <div className='one-preset-buttons'>
                    <div className='action-btn' onClick={(e) => {
                        if (!confirm('Удалить пресет ' + x.Name + '?')) {
                            return;
                        }
                        e.preventDefault();
                        props.DeletePreset(x.Id)
                    }}
                        title='Удалить пресет'>
                        <img className='persent-100-width-height' src="/images/delete-icon.png" />
                    </div>
                    <div className='action-btn' onClick={() => {
                        setEditPresetId(x.Id);

                    }}
                        title='Редактировать спринт'>
                        <img className='persent-100-width-height' src="/images/pencil-edit.png" />
                    </div>
                </div>
            </div>)}
        </div>


    </div>
}


// and that function returns the connected, wrapper component:
export default connectToStore(Presets);