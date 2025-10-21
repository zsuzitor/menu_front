import React, { useEffect, useMemo, useState } from "react";
import cloneDeep from 'lodash/cloneDeep';

require('./SaveCancelInput.css');

export interface ISaveCancelInputMultiSelectWithSearchProps {
    CancelEvent: () => void;
    SaveEvent: (ids: number[]) => boolean;
    ValuesWithId: { Id: number, Text: string }[];
    Selected: number[];
}

const SaveCancelInputMultiSelectWithSearch = (props: ISaveCancelInputMultiSelectWithSearchProps) => {


    const [selected, setSelected] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        setSelected(props.Selected || []);
    }, [props.Selected]);

    // Фильтрация элементов по поисковому запросу
    const filteredItems = useMemo(() => {
        if (!searchTerm.trim()) {
            return props.ValuesWithId;
        }

        const term = searchTerm.toLowerCase();
        return props.ValuesWithId.filter(item =>
            item.Text.toLowerCase().includes(term)
        );
    }, [props.ValuesWithId, searchTerm]);


    const handleSelectionChange = (id: number) => {
        setSelected(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const isSelected = (id: number) => selected.includes(id);

    return (
        <div className="save-cancel-input editable-multiselect-container">
            <div className="multiselect-search-container">
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="multiselect-search-input"
                />
                {searchTerm && (
                    <button
                        type="button"
                        className="multiselect-search-clear"
                        onClick={clearSearch}
                        title="Очистить поиск"
                    >
                        ×
                    </button>
                )}
            </div>
            <div className="multiselect-options">
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <label key={item.Id} className="multiselect-option">
                            <input
                                type="checkbox"
                                checked={isSelected(item.Id)}
                                onChange={() => handleSelectionChange(item.Id)}
                                className="multiselect-checkbox"
                            />
                            <span className="multiselect-text">{item.Text}</span>
                        </label>
                    ))
                ) : (
                    <div className="multiselect-no-results">
                        Ничего не найдено
                    </div>
                )}
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


export default SaveCancelInputMultiSelectWithSearch;