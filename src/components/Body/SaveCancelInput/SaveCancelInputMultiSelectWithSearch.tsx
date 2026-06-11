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









// есть такой контрол, это дроплист с мультиселектом и поиском, как мне сделать что бы дроплист открывался при клике по полю для ввода, а в остальное время был скрыт?

// import React, { useEffect, useMemo, useState, useRef } from "react";
// import cloneDeep from 'lodash/cloneDeep';

// require('./SaveCancelInput.css');

// export interface ISaveCancelInputMultiSelectWithSearchProps {
//     CancelEvent: () => void;
//     SaveEvent: (ids: number[]) => boolean;
//     ValuesWithId: { Id: number, Text: string }[];
//     Selected: number[];
// }

// const SaveCancelInputMultiSelectWithSearch = (props: ISaveCancelInputMultiSelectWithSearchProps) => {

//     const [selected, setSelected] = useState<number[]>([]);
//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [isOpen, setIsOpen] = useState<boolean>(false);
    
//     const containerRef = useRef<HTMLDivElement>(null);
//     const inputRef = useRef<HTMLInputElement>(null);

//     useEffect(() => {
//         setSelected(props.Selected || []);
//     }, [props.Selected]);

//     // Закрытие дроплиста при клике вне компонента
//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
//                 setIsOpen(false);
//                 setSearchTerm(''); // Опционально: очищать поиск при закрытии
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     // Фильтрация элементов по поисковому запросу
//     const filteredItems = useMemo(() => {
//         if (!searchTerm.trim()) {
//             return props.ValuesWithId;
//         }

//         const term = searchTerm.toLowerCase();
//         return props.ValuesWithId.filter(item =>
//             item.Text.toLowerCase().includes(term)
//         );
//     }, [props.ValuesWithId, searchTerm]);

//     const handleSelectionChange = (id: number) => {
//         setSelected(prev => {
//             if (prev.includes(id)) {
//                 return prev.filter(item => item !== id);
//             } else {
//                 return [...prev, id];
//             }
//         });
//     };

//     const clearSearch = () => {
//         setSearchTerm('');
//     };

//     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(e.target.value);
//     };

//     const isSelected = (id: number) => selected.includes(id);

//     const handleInputClick = () => {
//         setIsOpen(!isOpen);
//         if (!isOpen) {
//             // Фокусируемся на поле ввода при открытии
//             setTimeout(() => {
//                 inputRef.current?.focus();
//             }, 0);
//         }
//     };

//     const handleSave = () => {
//         const currentSorted = [...selected].sort();
//         const originalSorted = [...props.Selected].sort();
//         const hasChanged = JSON.stringify(currentSorted) !== JSON.stringify(originalSorted);

//         if (hasChanged) {
//             props.SaveEvent(selected);
//         } else {
//             props.CancelEvent();
//         }
//         setIsOpen(false);
//     };

//     const handleCancel = () => {
//         setSelected(props.Selected || []);
//         props.CancelEvent();
//         setIsOpen(false);
//     };

//     // Форматирование отображения выбранных элементов
//     const getSelectedText = () => {
//         if (selected.length === 0) return 'Выберите значения...';
//         if (selected.length === 1) {
//             const selectedItem = props.ValuesWithId.find(item => item.Id === selected[0]);
//             return selectedItem ? selectedItem.Text : 'Выбрано 1 значение';
//         }
//         return `Выбрано ${selected.length} значений`;
//     };

//     return (
//         <div className="save-cancel-input editable-multiselect-container" ref={containerRef}>
//             {/* Поле ввода для открытия дроплиста */}
//             <div className="multiselect-input-field" onClick={handleInputClick}>
//                 <input
//                     type="text"
//                     value={getSelectedText()}
//                     readOnly
//                     className="multiselect-trigger-input"
//                     placeholder="Нажмите для выбора..."
//                 />
//                 <span className={`multiselect-arrow ${isOpen ? 'open' : ''}`}>▼</span>
//             </div>

//             {/* Дроплист, который показывается только при isOpen === true */}
//             {isOpen && (
//                 <div className="multiselect-dropdown">
//                     <div className="multiselect-search-container">
//                         <input
//                             ref={inputRef}
//                             type="text"
//                             placeholder="Поиск..."
//                             value={searchTerm}
//                             onChange={handleSearchChange}
//                             className="multiselect-search-input"
//                         />
//                         {searchTerm && (
//                             <button
//                                 type="button"
//                                 className="multiselect-search-clear"
//                                 onClick={clearSearch}
//                                 title="Очистить поиск"
//                             >
//                                 ×
//                             </button>
//                         )}
//                     </div>
//                     <div className="multiselect-options">
//                         {filteredItems.length > 0 ? (
//                             filteredItems.map(item => (
//                                 <label key={item.Id} className="multiselect-option">
//                                     <input
//                                         type="checkbox"
//                                         checked={isSelected(item.Id)}
//                                         onChange={() => handleSelectionChange(item.Id)}
//                                         className="multiselect-checkbox"
//                                     />
//                                     <span className="multiselect-text">{item.Text}</span>
//                                 </label>
//                             ))
//                         ) : (
//                             <div className="multiselect-no-results">
//                                 Ничего не найдено
//                             </div>
//                         )}
//                     </div>
//                     <div className="action-buttons">
//                         <button
//                             type="button"
//                             className="save-button"
//                             title="Сохранить"
//                             onClick={handleSave}
//                         >
//                             <span className="save-icon"></span>
//                         </button>
//                         <button
//                             type="button"
//                             className="cancel-button"
//                             title="Отменить"
//                             onClick={handleCancel}
//                         >
//                             <span className="cancel-icon"></span>
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SaveCancelInputMultiSelectWithSearch;






// .editable-multiselect-container {
//     position: relative;
//     width: 100%;
// }

// .multiselect-input-field {
//     display: flex;
//     align-items: center;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//     cursor: pointer;
//     background-color: white;
// }

// .multiselect-trigger-input {
//     flex: 1;
//     padding: 8px 12px;
//     border: none;
//     outline: none;
//     cursor: pointer;
//     background: transparent;
// }

// .multiselect-arrow {
//     padding: 0 8px;
//     font-size: 12px;
//     transition: transform 0.2s;
//     color: #666;
// }

// .multiselect-arrow.open {
//     transform: rotate(180deg);
// }

// .multiselect-dropdown {
//     position: absolute;
//     top: 100%;
//     left: 0;
//     right: 0;
//     margin-top: 4px;
//     background-color: white;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
//     z-index: 1000;
//     max-height: 300px;
//     overflow-y: auto;
// }

// .multiselect-search-container {
//     position: sticky;
//     top: 0;
//     padding: 8px;
//     background-color: white;
//     border-bottom: 1px solid #eee;
// }

// .multiselect-search-input {
//     width: 100%;
//     padding: 6px 30px 6px 10px;
//     border: 1px solid #ddd;
//     border-radius: 4px;
//     outline: none;
//     box-sizing: border-box;
// }

// .multiselect-search-input:focus {
//     border-color: #007bff;
// }

// .multiselect-search-clear {
//     position: absolute;
//     right: 12px;
//     top: 50%;
//     transform: translateY(-50%);
//     background: none;
//     border: none;
//     cursor: pointer;
//     font-size: 18px;
//     color: #999;
//     padding: 0 4px;
// }

// .multiselect-search-clear:hover {
//     color: #333;
// }

// .multiselect-options {
//     max-height: 200px;
//     overflow-y: auto;
// }

// .multiselect-option {
//     display: flex;
//     align-items: center;
//     padding: 8px 12px;
//     cursor: pointer;
//     transition: background-color 0.2s;
// }

// .multiselect-option:hover {
//     background-color: #f5f5f5;
// }

// .multiselect-checkbox {
//     margin-right: 8px;
//     cursor: pointer;
// }

// .multiselect-text {
//     flex: 1;
//     cursor: pointer;
//     user-select: none;
// }

// .multiselect-no-results {
//     padding: 16px;
//     text-align: center;
//     color: #999;
// }

// .action-buttons {
//     display: flex;
//     gap: 8px;
//     padding: 8px;
//     border-top: 1px solid #eee;
//     background-color: white;
//     position: sticky;
//     bottom: 0;
// }

// .save-button,
// .cancel-button {
//     flex: 1;
//     padding: 6px 12px;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//     transition: background-color 0.2s;
// }

// .save-button {
//     background-color: #28a745;
//     color: white;
// }

// .save-button:hover {
//     background-color: #218838;
// }

// .cancel-button {
//     background-color: #dc3545;
//     color: white;
// }

// .cancel-button:hover {
//     background-color: #c82333;
// }

// /* Если у вас иконки, оставьте их */
// .save-icon, .cancel-icon {
//     display: inline-block;
//     width: 16px;
//     height: 16px;
//     background-size: contain;
//     background-repeat: no-repeat;
//     background-position: center;
// }

// .save-icon {
//     background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>');
// }

// .cancel-icon {
//     background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>');
// }