import React, { useEffect, useState, useRef, useCallback } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import './SelectWithSearch.css';

export interface ISelectWithSearchProps {
    CancelEvent: () => void;
    SaveEvent: (id: number) => boolean;
    ValuesWithId: { Id: number, Text: string }[];
    Selected: number;
    OnSearchChange?: (searchText: string) => void; // Метод для поиска
}

const SelectWithSearch: React.FC<ISelectWithSearchProps> = (props) => {
    const [selected, setSelected] = useState(-1);
    const [searchText, setSearchText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [filteredValues, setFilteredValues] = useState(props.ValuesWithId);
    const loadTasksTimerId = useRef<NodeJS.Timeout | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // console.log(selected);

    useEffect(() => {
        setSelected(props.Selected || -1);
    }, [props.Selected]);

    // Обновляем отфильтрованные значения при изменении списка
    useEffect(() => {
        setFilteredValues(props.ValuesWithId);
    }, [props.ValuesWithId]);

    // Обработка клика вне компонента для закрытия селекта
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Фильтрация значений по тексту поиска
    // const filterValues = useCallback((searchText: string) => {
    //     if (!searchText.trim()) {
    //         setFilteredValues(props.ValuesWithId);
    //         return;
    //     }

    //     const filtered = props.ValuesWithId.filter(item =>
    //         item.Text.toLowerCase().includes(searchText.toLowerCase())
    //     );
    //     setFilteredValues(filtered);
    // }, [props.ValuesWithId]);

    // Обработка изменения текста поиска с таймером
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setSearchText(text);
        setIsOpen(true);
        setSelected(-1);

        // Очищаем предыдущий таймер
        if (loadTasksTimerId.current) {
            clearTimeout(loadTasksTimerId.current);
        }

        // Устанавливаем новый таймер
        loadTasksTimerId.current = setTimeout(() => {
            if (props.OnSearchChange) {
                props.OnSearchChange(text);
            }
            // filterValues(text);
        }, 1500);

        // Мгновенная фильтрация для отображения
        // filterValues(text);
    };

    // Обработка выбора значения
    const handleSelectValue = (id: number) => {
        setSelected(id);
        setIsOpen(false);

        // Находим выбранный текст для отображения в поле ввода
        const selectedItem = props.ValuesWithId.find(item => item.Id === id);
        if (selectedItem) {
            setSearchText(selectedItem.Text);
        }

        // Вызываем метод сохранения с ID
        if (id !== props.Selected) {
            props.SaveEvent(id);
        } else {
            props.CancelEvent();
        }
    };

    // Очистка таймера при размонтировании
    useEffect(() => {
        return () => {
            if (loadTasksTimerId.current) {
                clearTimeout(loadTasksTimerId.current);
            }
        };
    }, []);

    // Отображение выбранного значения в поле ввода
    useEffect(() => {
        // console.log(props.ValuesWithId);
        // console.log(selected);
        if (selected && selected > 0) {
            //если значение выбрано то меняем текст, иначе нет
            const selectedItem = props.ValuesWithId.find(item => item.Id === selected);
            if (selectedItem) {
                setSearchText(selectedItem.Text);
            }
            else {
                setSearchText('');
            }
        }

    }, [selected, props.ValuesWithId]);

    return (
        <div className="select-with-search" ref={wrapperRef}>
            <div className="editable-input-wrapper">
                <input
                    type="text"
                    className="editable-input"
                    value={searchText}
                    onChange={handleSearchChange}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Поиск..."
                />
                <div className="input-arrow" onClick={() => setIsOpen(!isOpen)}>
                    ▼
                </div>
            </div>

            {isOpen && (
                <div className="dropdown-list">
                    {filteredValues.length > 0 ? (
                        filteredValues.map(item => (
                            <div
                                key={item.Id}
                                className={`dropdown-item ${selected === item.Id ? 'selected' : ''}`}
                                onClick={() => handleSelectValue(item.Id)}
                            >
                                {item.Text}
                            </div>
                        ))
                    ) : (
                        <div className="dropdown-item no-results">
                            Нет результатов
                        </div>
                    )}
                </div>
            )}

            {/* <div className="action-buttons">
                <button
                    type="button"
                    className="save-button"
                    title="Сохранить"
                    onClick={() => {
                        if (selected !== props.Selected) {
                            props.SaveEvent(selected);
                        } else {
                            setSelected(props.Selected || -1);
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
                        setSelected(props.Selected || -1);
                        setIsOpen(false);
                        props.CancelEvent();
                    }}
                >
                    <span className="cancel-icon"></span>
                </button>
            </div> */}
        </div>
    );
};

export default SelectWithSearch;