import React, { useEffect, useState } from "react";

import cloneDeep from 'lodash/cloneDeep';

require('./SaveCancelTextarea.css');


export interface ISaveCancelTextareaProps {
    CancelEvent: () => void;
    SaveEvent: (val: string) => boolean;
    Text: string;
}


const SaveCancelTextarea = (props: ISaveCancelTextareaProps) => {



    const [text, setText] = useState(props.Text || '');

    useEffect(() => {
        setText(props.Text || '');
    }, [props.Text]);



    return <div className="editable-textarea-container">
        <textarea
            value={text} onChange={e => setText(e.target.value)}
            className="editable-textarea"></textarea>

        <div className="input-editable-controls">
            <button type="button"
                className="editable-button cancel-button"
                onClick={() => {
                    setText(props.Text || '');
                    props.CancelEvent()
                }}
            >Отмена</button>
            <button type="button"
                className="editable-button save-button"
                onClick={() => {
                    if (text != props.Text) {
                        props.SaveEvent(text);
                    }
                    else {
                        setText(props.Text || '');
                        props.CancelEvent()
                    }
                }}
            >Сохранить</button>
        </div>
    </div>


}


export default SaveCancelTextarea;