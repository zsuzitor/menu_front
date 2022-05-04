import React, { useState, useEffect } from 'react';
import { IOneProjectInListDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IOneProjectInListDataBack';
import OneProjectInList from '../OneProjectInList/OneProjectInList';





export interface IProjectsListProps {
    Projects: IOneProjectInListDataBack[];//todo временно так
    AddNewProject: (projectName: string) => void;
    SetCurrentProject: (projectId: number) => void;
    CurrentProjectId: number;
}



const ProjectsList = (props: IProjectsListProps) => {
    const [newProjectName, setNewProjectName] = useState('');


    const renderList = () => {
        if (props.Projects.length === 0) {
            return <div>нет проектов</div>
        }

        return props.Projects.map(x => {
            return <OneProjectInList Project={x}
                SetCurrentProject={props.SetCurrentProject}
                CurrentProject={props.CurrentProjectId === x.Id}
            ></OneProjectInList>
        })
    }


    return <>
        <div>
            <input type='text' placeholder='название проекта'
                onChange={(e => setNewProjectName(e.target.value))} value={newProjectName}></input>
            <button onClick={() => props.AddNewProject(newProjectName)}>Создать проект</button>
        </div>
        {renderList()}
    </>
}




export default ProjectsList;