import React, { useState, useEffect } from 'react';
import { IEditPresetProps } from './EditPresetSetup';
import connectToStore from './EditPresetSetup';
import { Helper } from '../../../../Models/BL/Helper';
import { Preset } from '../../Models/Entity/State/Preset';
import SaveCancelInputMultiSelectWithSearch from '../../../../components/Body/SaveCancelInput/SaveCancelInputMultiSelectWithSearch';



require('./EditPreset.css');




const EditPreset = (props: IEditPresetProps) => {

    const [newName, setNewName] = useState("");
    const [newCreatorId, setNewCreatorId] = useState(-1);
    const [newExecutorId, setNewExecutorId] = useState(-1);
    const [newStatusId, setNewStatusId] = useState(-1);
    const [newSprintId, setNewSprintId] = useState(-1);
    const [newLabels, setNewLabels] = useState([]);

    useEffect(() => {
        setNewName(props.Preset.Name ?? '');
        setNewCreatorId(props.Preset.CreatorId ?? -1);
        setNewExecutorId(props.Preset.ExecutorId ?? -1);
        setNewStatusId(props.Preset.StatusId ?? -1);
        setNewSprintId(props.Preset.SprintId ?? -1);
        setNewLabels(props.Preset.LabelId);
    }, [props.Preset]);


    if (!props.Preset) {
        return <div></div>
    }


    return <div className='new-preset-block'>
        <div className='new-preset-content'>
            <input type='text' className='new-preset-input'
                placeholder='Введите название'
                value={newName}
                onChange={e => setNewName(e.target.value)}></input>

            <span className='filter-name'>Создатель:</span>
            <select className='filter-input' value={newCreatorId}
                onChange={(e) => setNewCreatorId(+e.target.value)}>
                <option value={-1}>Не выбрано</option>
                {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
            </select>

            <span className='filter-name'>Исполнитель:</span>
            <select className='filter-input' value={newExecutorId}
                onChange={(e) => setNewExecutorId(+e.target.value)}>
                <option value={-1}>Не выбрано</option>
                {props.ProjectUsers.map(x => <option key={x.Id} value={x.Id}>{x.Name}</option>)}
            </select>

            <span className='filter-name'>Статус:</span>
            <select className='filter-input'
                onChange={e => setNewStatusId(+e.target.value)}
                value={newStatusId}>
                <option value={-1}>Любой</option>
                {props.Statuses.map(status => <option value={status.Id} key={status.Id}>{status.Name}</option>)}
            </select>

            <span className='filter-name'>Спринт:</span>
            <select className='filter-input'
                onChange={e => setNewSprintId(+e.target.value)}
                value={newSprintId}>
                <option value={-1}>Любой</option>
                {props.Sprints.map(sprint => <option value={sprint.Id} key={sprint.Id}>{sprint.Name}</option>)}
            </select>

            <div className='edit-labels'>
                <SaveCancelInputMultiSelectWithSearch
                    CancelEvent={() => {
                        // setTaskLabelEditable(false)
                        setNewLabels([]);
                    }}
                    SaveEvent={(id) => {
                        // props.UpdateTaskLabels(props.Task.Id, id);
                        setNewLabels(id);
                        return true;
                    }}
                    Selected={newLabels}
                    ValuesWithId={props.Labels.map(x => {
                        return { Id: x.Id, Text: x.Name };
                    })}
                />
            </div>

            <button className='button button-grey' onClick={() => {
                props.UpdatePreset({
                    CreatorId: newCreatorId, Id: props.Preset.Id, LabelId: newLabels,
                    Name: newName, ProjectId: props.Preset.ProjectId,
                    SprintId: newSprintId, StatusId: newStatusId, ExecutorId: newExecutorId

                } as Preset);
            }}>Сохранить</button>
        </div>
    </div>

}



// and that function returns the connected, wrapper component:
export default connectToStore(EditPreset);