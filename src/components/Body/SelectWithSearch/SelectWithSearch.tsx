import React, { useEffect, useState, useRef, useCallback } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import './SelectWithSearch.css';

export interface ISelectWithSearchProps {
    CancelEvent: () => void;
    SaveEvent: (id: number) => boolean;
    ValuesWithId: { Id: number, Text: string }[];
    //прокидываем и храним элемент целиком что бы избежать кейса когда ValuesWithId - загрузили новый список, потом закрываем, а вернуть прежнее значение не можем, потому что в списке уже его нет
    Selected: { Id: number, Text: string };
    OnSearchChange?: (searchText: string) => void; // Метод для поиска
}


//////////применение без запроса на бэк

    // const [currency, setCurrency] = useState<Stock[]>([]);
    //     //нужны что бы отрисовать элеммент в пустом списке - такой кейс есть это норм
    //     const [newStockHistoryCurrencyId, setStockHistoryCurrencyId] = useState(0);
    //     const [stockCurrencyName, setStockCurrencyName] = useState('');
    //     //тк запроса на бэк не делаем а просто на фронте фильтруем
    //     const [stockCurrencyNameFilter, setStockCurrencyNameFilter] = useState('');
    
    //     <SelectWithSearch
    //         CancelEvent={() => { }}
    //         SaveEvent={(id) => {
    //             setStockHistoryCurrencyId(id);
    //             setStockCurrencyName(currency.find(x => x.Id === id).Name);
    //             // setStockCurrency(stockCurrency.filter(x => x.Id === id));
    //             return true;
    //         }}
    //         Selected={{ Id: newStockHistoryCurrencyId, Text: newStockHistoryCurrencyId > 0 ? `${newStockHistoryCurrencyId}-${stockCurrencyName}` : '' }}
    //         ValuesWithId={currency.filter(x => !stockCurrencyNameFilter || x.Name.indexOf(stockCurrencyNameFilter) >= 0)
    //             .map(x => ({ Id: x.Id, Text: `${x.Id}-${x.Name}` }))}
    //         OnSearchChange={async (text) => {
    //             // setTaskId(-1);
    //             setStockCurrencyNameFilter(text);
    //         }}
    //     ></SelectWithSearch>
/////////////////////













const SelectWithSearch: React.FC<ISelectWithSearchProps> = (props) => {
    const [selected, setSelected] = useState(props.Selected?.Id || -1);
    const [searchText, setSearchText] = useState(props.Selected?.Text || '');
    const [isOpen, setIsOpen] = useState(false);
    const [filteredValues, setFilteredValues] = useState(props.ValuesWithId);
    const loadTasksTimerId = useRef<NodeJS.Timeout | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // console.log(selected);

    useEffect(() => {
        setSelected(props.Selected?.Id || -1);
    }, [props.Selected?.Id]);

    useEffect(() => {
        setSearchText(props.Selected?.Text || '');
    }, [props.Selected?.Text]);




    // Обновляем отфильтрованные значения при изменении списка
    useEffect(() => {
        setFilteredValues(props.ValuesWithId);
    }, [props.ValuesWithId]);


    useEffect(() => {
        if (!isOpen) {
            setSelected(props.Selected?.Id || -1);
            setFilteredValues(props.ValuesWithId);
            setSearchText(props.Selected?.Text || '');
            // const selectedItem = props.ValuesWithId.find(item => item.Id === props.Selected?.Id);
            // if (selectedItem) {
            //     setSearchText(selectedItem.Text);
            // }
            // else {
            //     setSearchText('');
            // }
        }

    }, [isOpen, props.Selected, props.ValuesWithId]);




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
            if (loadTasksTimerId.current) {
                clearTimeout(loadTasksTimerId.current);
            }
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


    // Отображение выбранного значения в поле ввода
    useEffect(() => {
        // console.log(props.ValuesWithId);
        // console.log(selected);
        if (selected && selected > 0) {
            // console.log('!!');
            //если значение выбрано то меняем текст, иначе нет
            const selectedItem = props.ValuesWithId.find(item => item.Id === selected);
            if (selectedItem) {
                setSearchText(selectedItem.Text);
            }
            else if (props.Selected.Id == selected) {
                setSearchText(props.Selected.Text || '');
            }
            else {
                setSearchText('');
            }
        }

    }, [selected, props.ValuesWithId, props.Selected]);




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
        if (id !== props.Selected?.Id) {
            props.SaveEvent(id);
        } else {
            props.CancelEvent();
        }
    };





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