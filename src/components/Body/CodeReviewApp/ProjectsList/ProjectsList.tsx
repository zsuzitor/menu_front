import React, { useState, useEffect } from 'react';
import { IOneProjectInListDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IOneProjectInListDataBack';
import OneProjectInList from '../OneProjectInList/OneProjectInList';



require('./ProjectsList.css');




export interface IProjectsListProps {
    Projects: IOneProjectInListDataBack[];//todo временно так
    AddNewProject: (projectName: string) => void;
    SetCurrentProject: (projectId: number) => void;
    CurrentProjectId: number;
}



const ProjectsList = (props: IProjectsListProps) => {
    const [newProjectName, setNewProjectName] = useState('');
    const [filterProjectName, setFilterProjectName] = useState('');


    const renderList = () => {
        if (props.Projects.length === 0) {
            return <div>нет проектов</div>
        }

        return props.Projects
            .filter(x => filterProjectName ? x.Name.indexOf(filterProjectName) >= 0 : true)
            .map(x => {
                return <OneProjectInList Project={x} key={x.Id}
                    SetCurrentProject={props.SetCurrentProject}
                    CurrentProject={props.CurrentProjectId === x.Id}
                ></OneProjectInList>
            });
    }


    return <>
        <div className='review-project-new-block'>
            <input type='text' placeholder='название нового проекта'
                onChange={(e => setNewProjectName(e.target.value))} value={newProjectName}></input>
            <button onClick={() => {
                props.AddNewProject(newProjectName);
                setNewProjectName('');
            }}>Создать проект</button>
        </div>
        <div>
            <input type="text" value={filterProjectName} placeholder='фильтр'
                onChange={e => setFilterProjectName(e.target.value)} />
        </div>
        {renderList()}
    </>
}




export default ProjectsList;