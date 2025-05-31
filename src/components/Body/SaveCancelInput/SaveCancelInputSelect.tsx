import React, { useEffect, useState } from "react";

import cloneDeep from 'lodash/cloneDeep';

require('./SaveCancelInput.css');


export interface ISaveCancelInputSelectProps {
    CancelEvent: () => void;
    SaveEvent: (id: number) => boolean;
    // Text: string;
    // Values: string[];
    ValuesWithId: { Id: number, Text: string }[];
    Selected: number;
}

//: React.FC<ISaveCancelInputSelectProps> 
const SaveCancelInputSelect = (props: ISaveCancelInputSelectProps) => {

    const [selected, setSelected] = useState(-1);

    useEffect(() => {
        setSelected(props.Selected || -1);
    }, [props.Selected]);



    return <div className="editable-input-container">
        <select className='editable-input' value={selected}

            onChange={e => setSelected(+e.target.value)} >
            <option value={-1}>Не выбрано</option>
            {props.ValuesWithId.map(x => <option key={x.Id} value={x.Id}>{x.Text}</option>)}
        </select>
        <div className="action-buttons">
            <button type="button" className="save-button" title="Сохранить"
                onClick={() => props.SaveEvent(selected)}>
                <span className="save-icon"></span>
            </button>
            <button type="button" className="cancel-button" title="Отменить"
                onClick={() => {
                    setSelected(props.Selected || -1);
                    props.CancelEvent()
                }}>
                <span className="cancel-icon"></span>
            </button>
        </div>
    </div>



}


export default SaveCancelInputSelect;