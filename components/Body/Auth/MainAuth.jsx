
import React from 'react'
import Login from './Login.jsx'
import Register from './Register.jsx'


export default class MainAuth extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            login:true,
        };
    }

    SwithLogic(){
        if(this.props.login){
            return <Login/>;
        }
        else{
            return <Register/>;
        }
    }

    render() {
    return <div className='container'>{this.SwithLogic()}</div>
    }

}