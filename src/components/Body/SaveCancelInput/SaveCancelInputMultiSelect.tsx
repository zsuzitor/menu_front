import React, { useEffect, useState } from "react";
import cloneDeep from 'lodash/cloneDeep';

require('./SaveCancelInput.css');

export interface ISaveCancelInputMultiSelectProps {
    CancelEvent: () => void;
    SaveEvent: (ids: number[]) => boolean;
    ValuesWithId: { Id: number, Text: string }[];
    Selected: number[];
}

const SaveCancelInputMultiSelect = (props: ISaveCancelInputMultiSelectProps) => {
    // console.log(props.ValuesWithId);
    // console.log(props.Selected);

    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        setSelected(props.Selected || []);
    }, [props.Selected]);

    const handleSelectionChange = (id: number) => {
        setSelected(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const isSelected = (id: number) => selected.includes(id);

    return (
        <div className="save-cancel-input editable-multiselect-container">
            <div className="multiselect-options">
                {props.ValuesWithId.map(item => (
                    <label key={item.Id} className="multiselect-option">
                        <input
                            type="checkbox"
                            checked={isSelected(item.Id)}
                            onChange={() => handleSelectionChange(item.Id)}
                            className="multiselect-checkbox"
                        />
                        <span className="multiselect-text">{item.Text}</span>
                    </label>
                ))}
            </div>
            <div className="action-buttons">
                <button
                    type="button"
                    className="save-button"
                    title="Сохранить"
                    onClick={() => {
                        // Сравниваем массивы, игнорируя порядок элементов
                        const currentSorted = [...selected].sort();
                        const originalSorted = [...props.Selected].sort();
                        const hasChanged = JSON.stringify(currentSorted) !== JSON.stringify(originalSorted);

                        if (hasChanged) {
                            props.SaveEvent(selected);
                        } else {
                            props.CancelEvent();
                        }
                    }}
                >
                    <span className="save-icon"></span>
                </button>
                <button
                    type="button"
                    className="cancel-button"
                    title="Отменить"
                    onClick={() => {
                        setSelected(props.Selected || []);
                        props.CancelEvent();
                    }}
                >
                    <span className="cancel-icon"></span>
                </button>
            </div>
        </div>
    );
};


export default SaveCancelInputMultiSelect;