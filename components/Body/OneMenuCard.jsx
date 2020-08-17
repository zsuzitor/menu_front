
import React from 'react'

//export default 
export default class OneMenuCard extends React.Component {

    constructor(props) {
        super(props);
        // this.onTextChanged = this.onTextChanged.bind(this);

        this.state = props.data;
        // this.state

        this.actionButton = this.actionButton.bind(this);
        this.editOnClick = this.editOnClick.bind(this);
        this.saveOnClick = this.saveOnClick.bind(this);
        this.followCard = this.followCard.bind(this);
        this.cancelEditOnClick = this.cancelEditOnClick.bind(this);

        this.titleRender = this.titleRender.bind(this);
        this.bodyRender = this.bodyRender.bind(this);


    }

    actionButton() {
        if (this.state.EditNow) {
            return <div><div className='cancel-edit-one-card-button one-card-button' onClick={this.cancelEditOnClick}></div>
                <div className='save-one-card-button one-card-button' onClick={this.saveOnClick}></div></div>
        }
        else {

            return <div><div className='edit-one-card-button one-card-button' onClick={this.editOnClick}></div>
                <div className='follow-one-card-button one-card-button' onClick={this.followCard}></div></div>
        }
    }

    editOnClick() {
        let newState = Object.assign({}, this.state);
        newState.EditNow = true;
        this.setState(newState);
    }

    cancelEditOnClick() {
        let newState = Object.assign({}, this.state);
        newState.EditNow = false;
        this.setState(newState);
    }


    followCard() {
        let newState = Object.assign({}, this.state);
        newState.EditNow = false;
        this.setState(newState);
    }

    saveOnClick() {
        // this.state.set
        // console.log(this.state);


        // console.log({...this.state, [name]: value});
    }

    titleRender() {
        if (this.state.EditNow) {
            return <input type="text" value={this.state.Title} />
        }
        else {
            return <h5 className="card-title">{this.state.Title}</h5>
        }
    }

    bodyRender() {
        if (this.state.EditNow) {
            return <input type="text" value={this.state.Body} />
        }
        else {
            return <p className="card-text">{this.state.Body}</p>
        }
    }

    render() {

        return <div className='col-sm-6 col-md-4 col-lg-3' style={{ padding: '20px' }}>
            <div className="card one-menu-card-inner">
                {this.actionButton()}
                <img src={this.state.Image} className="card-img-top" alt="..." />
                <div className="card-body">
                    {this.titleRender()}
                    {this.bodyRender()}

                </div>
            </div>
        </div>
    }
}

// module.exports = MainHeader;