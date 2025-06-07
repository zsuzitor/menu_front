

import { cloneDeep } from 'lodash';
import React, { useState, useEffect } from 'react';
import OneProjectUser from '../OneProjectUser/OneProjectUser';

import connectToStore, { IProjectTimePageProps } from './ProjectTimePageSetup';


require('./ProjectTimePage.css');




const ProjectTimePage = (props: IProjectTimePageProps) => {


    const [newUserName, setNewUserName] = useState('');


    return <div>
        время
    </div>
}








// and that function returns the connected, wrapper component:
export default connectToStore(ProjectTimePage);