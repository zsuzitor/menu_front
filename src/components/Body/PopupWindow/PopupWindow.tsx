import React, { useState, useEffect, useRef } from 'react';
import connectToStore, { IPopupWindowProps } from './PopupWindowSetup';


require('./PopupWindow.css');





const PopupWindow = (props: IPopupWindowProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);
    const buttonRef = useRef(null);

    // Рассчёт позиции попапа
    const calculatePosition = () => {
        if (!buttonRef.current || !popupRef.current) return;

        // const buttonRect = buttonRef.current.getBoundingClientRect();
        const popupRect = popupRef.current.getBoundingClientRect();
        // console.log(buttonRect);
        // console.log(popupRect);
        // Позиционируем под кнопкой с центрированием
        return {
            // top: buttonRect.bottom + window.scrollY + 5,
            // left: buttonRect.left + window.scrollX + (buttonRect.width - popupRect.width) / 2
            //todo надо расчитывать так что бы не уходило за экран
            top: -popupRect.height,
            left: 0
        };
    };

    // Закрытие при клике вне попапа
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);


    const [coords, setCoords] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (isOpen) {
            // Небольшая задержка для корректного расчёта размеров
            requestAnimationFrame(() => {
                setCoords(calculatePosition());
            });
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            const handleResize = () => setCoords(calculatePosition());
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [isOpen]);

    return (
        <div className="popup-wrapper">
            <div
                ref={buttonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="popup-button"
            >
                {props.ButtonContent}
            </div>

            {isOpen && (
                <div
                    ref={popupRef}
                    className="popup-content"
                    style={{
                        position: "absolute",
                        top: `${coords.top}px`,
                        left: `${coords.left}px`,
                    }}
                >
                    {props.PopupContent}
                </div>
            )}
        </div>
    );
};






// and that function returns the connected, wrapper component:
export default connectToStore(PopupWindow);