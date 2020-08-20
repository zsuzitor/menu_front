
import React from 'react'
import {
    Link
} from "react-router-dom";

//export default 
export default class OneMenuCard extends React.Component {

    constructor(props) {
        super(props);
        // this.onTextChanged = this.onTextChanged.bind(this);

        // this.state = props.data;
        this.state = {
            EditNow: false,
            NewState: null,
        };

        this.actionButton = this.actionButton.bind(this);
        this.editOnClick = this.editOnClick.bind(this);
        this.saveOnClick = this.saveOnClick.bind(this);
        this.followCard = this.followCard.bind(this);
        this.cancelEditOnClick = this.cancelEditOnClick.bind(this);

        this.titleRender = this.titleRender.bind(this);
        this.bodyRender = this.bodyRender.bind(this);

        this.imageRender = this.imageRender.bind(this);
        this.titleOnChange = this.titleOnChange.bind(this);
        this.bodyOnChange = this.bodyOnChange.bind(this);
        // this.bodyRender = this.bodyRender.bind(this);
        // this.bodyRender = this.bodyRender.bind(this);



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
        newState.NewState = Object.assign({}, this.props.CardData);
        this.setState(newState);
    }

    cancelEditOnClick() {
        let newState = Object.assign({}, this.state);
        newState.EditNow = false;
        newState.NewState = null;
        // console.log(newState)
        this.setState(newState);
    }


    followCard() {
        //TODO запрос
        this.props.FollowRequstSuccess(this.props.CardData.Id);

        let newState = Object.assign({}, this.state);
        newState.EditNow = false;
        this.setState(newState);
    }

    saveOnClick() {
        //TODO отправляем запрос
        //как то отобразить что он пошел, и что то сделать с кнопками на время запросов


        //запрос успешный
        let newState = Object.assign({}, this.state);
        newState.EditNow = false;
        // newState.OldState = newState.NewState;

        // this.state.
        this.props.UpdateElement(newState);
        // newState.NewState = null;
        let localState = Object.assign({}, newState);
        localState.NewState = null;
        this.setState(localState);//TODO возможно все редактирование придется переносить
    }

    titleRender() {

        if (this.state.EditNow) {
            if (this.state.NewState) {
                return <input type="text" className='persent-100-width form-control' value={this.state.NewState.Title} onChange={this.titleOnChange} />
            }
            else {
                return <input type="text" className='persent-100-width form-control' value={this.props.CardData.Title} onChange={this.titleOnChange} />
            }

        }
        else {
            if (this.state.NewState) {
                return <Link to={"/detail/" + this.state.NewState.Id}><h5 className="card-title" >{this.state.NewState.Title}</h5></Link>
            }
            else {
                return <Link to={"/detail/" + this.props.CardData.Id}><h5 className="card-title" >{this.props.CardData.Title}</h5></Link>
            }

        }
    }

    imageRender() {
        return <img src={this.props.CardData.Image} className="card-img-top" alt="..." />
    }


    bodyRender() {
        if (this.state.EditNow) {
            if (this.state.NewState) {
                return <input type="text" className='persent-100-width form-control' value={this.state.NewState.Body} onChange={this.bodyOnChange} />
            }
            else {
                return <input type="text" className='persent-100-width form-control' value={this.state.NewState.Body} onChange={this.bodyOnChange} />
            }
        }
        else {
            if (this.state.NewState) {
                return <p className="card-text">{this.props.CardData.Body}</p>
            }

            else {
                return <p className="card-text">{this.props.CardData.Body}</p>
            }

        }
    }

    titleOnChange(e) {
        // console.log(this.state);
        let newState = Object.assign({}, this.state);
        newState.NewState.Title = e.target.value;
        // console.log(newState);
        this.setState(newState);
    }

    bodyOnChange(e) {
        let newState = Object.assign({}, this.state);
        newState.NewState.Body = e.target.value;
        this.setState(newState);
    }

    render() {

        return <div className='col-sm-6 col-md-4 col-lg-3' style={{ padding: '20px' }}>
            <div className="card one-menu-card-inner">
                {this.actionButton()}
                {this.imageRender()}
                <div className="card-body">
                    {this.titleRender()}
                    {this.bodyRender()}

                </div>
            </div>
        </div>
    }
}

// module.exports = MainHeader;