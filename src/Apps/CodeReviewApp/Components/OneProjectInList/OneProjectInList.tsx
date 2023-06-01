import React, { useState, useEffect } from 'react';
import connectToStore, { IOneProjectInListProps } from './OneProjectInListSetup';


require('./OneProjectInList.css');



const OneProjectInList = (props: IOneProjectInListProps) => {
    let projectClassName = 'review-project';

    if (props.CurrentProject) {
        projectClassName += ' selected-review-project'
    }


    return <div key={props.Project.Id.toString()}
        className={projectClassName}
        onClick={() => {
            if (!props.CurrentProject) {
                props.SetCurrentProject(props.Project.Id)
            }
        }}>
        {props.Project.Name}

        {/* <div  title={props.Project.Name}>
        </div> */}
    </div>

}






// and that function returns the connected, wrapper component:
export default connectToStore(OneProjectInList);