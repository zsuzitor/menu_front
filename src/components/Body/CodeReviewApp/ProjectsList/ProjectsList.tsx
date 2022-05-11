import React, { useState, useEffect } from 'react';
import { IOneProjectInListDataBack } from '../../../_ComponentsLink/BackModel/CodeReviewApp/IOneProjectInListDataBack';
import OneProjectInList from '../OneProjectInList/OneProjectInList';



require('./ProjectsList.css');




export interface IProjectsListProps {
    Projects: IOneProjectInListDataBack[];//todo временно так
    AddNewProject: (projectName: string) => void;
    SetCurrentProject: (projectId: number) => void;
    CurrentProjectId: number;
    // ChangeListVisibility: () => void;
}



const ProjectsList = (props: IProjectsListProps) => {
    const [newProjectName, setNewProjectName] = useState('');
    const [filterProjectName, setFilterProjectName] = useState('');
    const [visibleList, setVisibleList] = useState(true);


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

    let mainListClass = ' code-review-projects-menu-hide';
    if (visibleList) {
        mainListClass = ' code-review-projects-menu-visible';
    }


    return <><div onClick={() => setVisibleList(v => !v)}
        className="hide-review-projects-list-button">{visibleList ? '<' : '>'}</div>
        <div className={'code-review-projects-menu' + mainListClass}>
            <div className='review-project-new-block'>
                <input className='form-control-b' type='text' placeholder='название нового проекта'
                    onChange={(e => setNewProjectName(e.target.value))} value={newProjectName}></input>
                <button className='btn-b btn-border' onClick={() => {
                    props.AddNewProject(newProjectName);
                    setNewProjectName('');
                }}>Создать проект</button>
            </div>
            <div>
                <input className='form-control-b' type="text" value={filterProjectName} placeholder='фильтр'
                    onChange={e => setFilterProjectName(e.target.value)} />
            </div>
            {renderList()}
        </div>
    </>
}




export default ProjectsList;