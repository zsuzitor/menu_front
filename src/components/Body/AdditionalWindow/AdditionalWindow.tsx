import React, { useState } from "react";

import cloneDeep from 'lodash/cloneDeep';

require('./AdditionalWindow.css');


export interface IAdditionalWindowProps {
    CloseWindow: () => void;
    InnerContent: () => JSX.Element;
    IsHeightWindow: boolean;
    Title: string;
}


const AdditionalWindow = (props: IAdditionalWindowProps) => {

    let additionClassMain = '';
    if (props.IsHeightWindow) {
        additionClassMain += ' additional-window-main-height';
    }

    return <div className={"additional-window-main" + additionClassMain}>
        <label className='title'>{props.Title}</label>
        <div className="additional-window-close" onClick={() => props.CloseWindow()}>+</div>
        {/* <div className="cirle-logo-confirm">
            L
        </div> */}
        <div className="additional-window-inner">
            {props.InnerContent()}
        </div>
    </div>;


}


export default AdditionalWindow;