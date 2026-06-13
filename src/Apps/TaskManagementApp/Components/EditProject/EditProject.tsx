

import { cloneDeep } from 'lodash';
import React, { useState, useEffect } from 'react';

import connectToStore, { IEditProjectProps } from './EditProjectSetup';
import EditTaskStatus from '../EditTaskStatus/EditTaskStatus';


require('./EditProject.css');




const EditProject = (props: IEditProjectProps) => {





    return <div className='edit-project'>


    </div >
}








// and that function returns the connected, wrapper component:
export default connectToStore(EditProject);