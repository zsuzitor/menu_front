import React, { useState, useEffect } from 'react';
import OneProjectInList from '../OneProjectInList/OneProjectInList';

import { AlertData } from '../../../../Models/Entity/AlertData';

import connectToStore, { IPresetsProps } from './PresetsSetup';
import { useNavigate } from 'react-router-dom';
import RouteBuilder from '../../Models/BL/RouteBuilder';

require('./Presets.css');





const Presets = (props: IPresetsProps) => {
    const [newPresetName, setNewPresetName] = useState('');



    // const projectUrl = new RouteBuilder().ProjectUrl(props.CurrentProjectId);
    return <div>
        <div>
            <input type='text' className='form-control'
                placeholder='Ключ'
                value={newPresetName} onChange={(e) => setNewPresetName(e.target.value)}></input>
            <button className='btn btn-b-light'
                onClick={() => {

                }}>Добавить</button>
        </div>
        <div>
            {props.Presets.map(x => <div>
                <p>{x.Id} {x.Name}</p>
                <button className='btn btn-b-light'
                    onClick={() => {

                    }}>Удалить</button>
                <button className='btn btn-b-light'
                    onClick={() => {

                    }}>Редактировать</button>
            </div>)}
        </div>


    </div>
}


// and that function returns the connected, wrapper component:
export default connectToStore(Presets);