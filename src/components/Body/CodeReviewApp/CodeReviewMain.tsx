import React, { useState, useEffect } from 'react';

import { IAuthState } from "../../_ComponentsLink/Models/AuthState";




class CodeReviewMainProps {
    AuthInfo: IAuthState;
}




const CodeReviewMain = (props: CodeReviewMainProps) => {

    const [currentProject, setCurrentProject] = useState(null);


    useEffect(() => {
        
     }, []);


    return <div>
        <div>
            <p>проект 1</p>
            <p>проект 2</p>
            <p>проект 3</p>
            <p>проект 4</p>
            <div>
                <input type='text' placeholder='название проекта'></input>
                <button>Создать проект</button>
            </div>
        </div>
        <div>

        </div>
    </div>
}




export default CodeReviewMain;