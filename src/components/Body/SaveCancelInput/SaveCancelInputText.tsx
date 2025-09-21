import React, { useEffect, useState } from "react";

import cloneDeep from 'lodash/cloneDeep';

require('./SaveCancelInput.css');


export interface ISaveCancelInputTextProps {
    CancelEvent: () => void;
    SaveEvent: (val: string) => boolean;
    Text: string;
}

//: React.FC<ISaveCancelInputTextProps>
const SaveCancelInputText = (props: ISaveCancelInputTextProps) => {

    const [text, setText] = useState('');

    useEffect(() => {
        setText(props.Text || '');
    }, [props.Text]);



    return <div className="save-cancel-input editable-input-container">

        <input type="text"
            className="editable-input"
            value={text}
            onChange={(e) => setText(e.target.value)}></input>
        <div className="action-buttons">
            <button type="button" className="save-button" title="Сохранить"
                onClick={() => {
                    if (text != props.Text) {
                        props.SaveEvent(text);
                    }
                    else {
                        setText(props.Text || '');
                        props.CancelEvent()
                    }
                }}>
                <span className="save-icon"></span>
            </button>
            <button type="button" className="cancel-button" title="Отменить"
                onClick={() => {
                    setText(props.Text || '');
                    props.CancelEvent()
                }}>
                <span className="cancel-icon"></span>
            </button>
        </div>
    </div>



}


export default SaveCancelInputText;