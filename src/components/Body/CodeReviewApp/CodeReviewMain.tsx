import React, { useState, useEffect } from 'react';
import { IOneProjectInListDataBack } from '../../_ComponentsLink/BackModel/CodeReviewApp/IOneProjectInListDataBack';
import { MainErrorObjectBack } from '../../_ComponentsLink/BackModel/ErrorBack';

import { IAuthState } from "../../_ComponentsLink/Models/AuthState";
import ProjectDetail from './ProjectDetail';




class CodeReviewMainProps {
    AuthInfo: IAuthState;
}

// class CodeReviewMainState{

// }



const CodeReviewMain = (props: CodeReviewMainProps) => {

    const [currentProjectId, setCurrentProjectId] = useState(-1);
    const [projectsList, setProjectsList] = useState([] as IOneProjectInListDataBack[]);
    const [newProjectName, setNewProjectName] = useState('');


    useEffect(() => {
        let getProjects = (error: MainErrorObjectBack, data: IOneProjectInListDataBack[]) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data) {
                setCurrentProjectId(-1);
                setProjectsList(data);
            }
        };

        window.G_CodeReviewController.GetUserProjects(getProjects);
    }, []);


    const addNewProject = () => {
        let addProject = (error: MainErrorObjectBack, data: IOneProjectInListDataBack) => {
            if (error) {
                //TODO выбить из комнаты?
                alert("todo что то пошло не так лучше обновить страницу");
                return;
            }

            if (data) {
                // setCurrentProjectId(-1);
                setProjectsList((oldState) => {
                    let newState = [...oldState, data];
                    return newState;
                });
            }
        };

        window.G_CodeReviewController.CreateNewProject(newProjectName, addProject);
    };



    return <div>
        <div>
            <div>
                <input type='text' placeholder='название проекта'
                    onChange={(e => setNewProjectName(e.target.value))} value={newProjectName}></input>
                <button onClick={() => addNewProject()}>Создать проект</button>
            </div>
            {projectsList.map(x => {
                return <div key={x.Id.toString()} onClick={() => setCurrentProjectId(x.Id)}>
                    <p>{x.Name}</p>
                </div>
            })}

        </div>
        <div>
            выбранный проект:
            <ProjectDetail Project={projectsList.find(x => x.Id == currentProjectId)}></ProjectDetail>
        </div>
    </div>
}




export default CodeReviewMain;